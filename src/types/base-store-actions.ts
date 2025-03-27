import type { ActionResult } from './action-result';

/** Represents a valid key type to be used as an action or identifier **/
export type StoreActionKey = string | number | symbol;

export type BaseStoreActions<A extends StoreActionKey> = {
    /**
     * Check if an action is loading, optionally with specific identifier
     * @param action - The action to check for the loading state
     * @param id - Identifier of a specific action
     * @example
     * isLoading('fetchClient');
     * isLoading('fetchClient', 'id-client-1');
     * */
    isLoading: (action: A, id?: string) => boolean;
    /**
     * Retrieve the first error of an action. If provided with a specific identifier it will
     * retrieve that error instead.
     * @param action - The action to check for the loading state
     * @param id - Identifier of a specific action
     * @example
     * getError('fetchClient');
     * getError('fetchClient', 'id-client-1');
     * */
    getError: (action: A, id?: string) => unknown | undefined;
    /**
     * Check if the action ended with an error. If provided with a specific identifier it will
     * check if that specific action has ended with an error.
     * @param action - The action to check for the loading state
     * @param id - Identifier of a specific action
     * @example
     * getError('fetchClient');
     * getError('fetchClient', 'id-client-1');
     * */
    hasError: (action: A, id?: string) => boolean;
};

export type StoreActions<A extends StoreActionKey> = {
    base: BaseStoreActions<A>;
    /**
     * Executes a function as an action, keeping track of it's loading and error state.
     * If provided with an identifier it will keep the loading and error state with that id.
     * @param action The action to check for the loading state
     * @param id Identifier of a specific action
     * @param fn The action function to handle
     * @example
     * // Handles the action for fetching all clients - no specific identifier
     * async function fetchAllClients(id: string) {
     *     await handleAction('fetchAllClients', undefined, async () => {
     *         clients.value = await ClientsApi.getClients();
     *     });
     * }
     * // Handles the action for fetching a client - identifier for the specific client
     * async function fetch(id: string) {
     *     await handleAction('fetchClient', id, async () => {
     *         client.value = await ClientsApi.getClient(id);
     *     });
     * }
     * */
    handleAction: <R>(
        action: A,
        id: string | undefined,
        fn: () => Promise<R> | R,
    ) => Promise<ActionResult<R, unknown>>;
};
