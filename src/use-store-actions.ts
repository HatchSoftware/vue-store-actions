import { reactive } from 'vue';
import type { StoreErrorState, StoreLoadingState } from './types/state';
import type { StoreActionKey, StoreActions } from './types/base-store-actions';
import type { ActionResult } from './types/action-result';

/**
 * This function creates a default loading and error as well as a utility function
 * to wrap functions with
 *
 * @example
 * // Usage with a Pinia store
 * export const useClientStore = defineStore('client', () => {
 *    const { base, handleAction } = useStoreActions({
 *        actions: ['fetchClient'],
 *    });
 *    const client = ref<ClientContract>();
 *    async function fetchClient(id: string) {
 *        await handleAction('fetchClient', id, async () => {
 *            client.value = await ClientsApi.getClient(id);
 *        });
 *    }
 *    return {
 *        ...base, // Expose utility functions for checking state to the store
 *        client,
 *        fetchClient,
 *    };
 * });
 * */
export function useStoreActions<A extends StoreActionKey>(opts: {
    /**
     * Defines the actions with a loading and error state
     * */
    actions: A[];
}): StoreActions<A> {
    const errors = createStoreErrorState(opts.actions);
    const loading = createStoreLoadingState(opts.actions);

    function isLoading(action: A, id?: string): boolean {
        if (id) {
            return loading[action].includes(id);
        } else {
            return loading[action].length > 0;
        }
    }

    function getError(action: A, id?: string): unknown | undefined {
        if (id) {
            return errors[action].get(id);
        } else {
            return errors[action].values().next().value;
        }
    }

    function hasError(action: A, id?: string): boolean {
        if (id) {
            return errors[action].get(id) ? true : false;
        } else {
            return errors[action].size > 0;
        }
    }

    async function handleAction<R>(
        action: A,
        id: string | undefined,
        fn: () => Promise<R> | R,
    ): Promise<ActionResult<R, unknown>> {
        const key = id ? id : action;
        try {
            errors[action].delete(key);
            loading[action].push(key);
            return { success: true, result: await fn() };
        } catch (error) {
            errors[action].set(key, error);
            return { success: false, error };
        } finally {
            if (id) {
                const index = loading[action].findIndex((v) => v === id);
                if (index !== -1) {
                    loading[action].splice(index, 1);
                }
            } else {
                loading[action].pop();
            }
        }
    }

    return {
        base: {
            isLoading,
            getError,
            hasError,
        },
        handleAction,
    };
}

function createStoreLoadingState<T extends StoreActionKey>(options: T[]): StoreLoadingState<T> {
    const state: Record<StoreActionKey, StoreActionKey[]> = {};
    options.forEach((opt) => {
        state[opt] = [];
    });
    return reactive(state) as StoreLoadingState<T>;
}

function createStoreErrorState<T extends StoreActionKey>(options: T[]): StoreErrorState<T> {
    const state: Record<StoreActionKey, Map<StoreActionKey, unknown>> = {};
    options.forEach((opt) => {
        state[opt] = new Map();
    });
    return reactive(state) as StoreErrorState<T>;
}
