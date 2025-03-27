import { watch } from 'vue';
import type { BaseStoreActions } from '../types/base-store-actions';

export function watchActionErrors<A extends string>(
    store: BaseStoreActions<A>,
    actions: A[],
    hasErrorCallBack: (action: A) => void,
): void {
    actions.forEach((action) => {
        watch(
            () => store.hasError(action),
            (curr, prev) => {
                if (curr === true && prev === false) {
                    hasErrorCallBack(action);
                }
            },
        );
    });
}
