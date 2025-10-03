declare type BaseStoreActions<A extends StoreActionKey> = {
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

/** Represents a valid key type to be used as an action or identifier **/
declare type StoreActionKey = string | number | symbol;

export declare function watchActionErrors<A extends string>(store: BaseStoreActions<A>, actions: A[], hasErrorCallBack: (action: A) => void): void;

export { }
