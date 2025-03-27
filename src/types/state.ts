import type { StoreActionKey } from './base-store-actions';

export type StoreErrorState<T extends StoreActionKey> = {
    [key in T]: Map<StoreActionKey, unknown>;
};
export type StoreLoadingState<T extends StoreActionKey> = { [key in T]: StoreActionKey[] };
