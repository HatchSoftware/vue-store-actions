# Integrating store actions into Pinia

Integrating store actions is easily done by calling `useStoreActions` with a list of the actions
that can be taken.  

This function creates a default loading and error state for all the actions as well as a 
`handleAction` function to wrap your functions with.

This works best paired together with Pinia.

Simply call the function from within your Pinia store and use the `handleAction` function you 
retrieve to handle any of the actions you might have within your store.

## Example store

```typescript
import { useStoreActions } from 'vue-store-actions';

export const useClientStore = defineStore('client', () => {
    const { base, handleAction } = useStoreActions({
        actions: ['fetchClient'], // Full list of actions
    });

    const client = ref<ClientContract>();

    function fetchClient(id: string) {
        // Wrap action with handleAction to automatically
        // handle the loading and error state of this action
        return handleAction('fetchClient', id, async () => {
            return client.value = await ClientsApi.getClient(id);
        });
    }

    return {
        ...base, // Expose utility functions for checking state to the store
        client,
        fetchClient,
    };
});
```

After calling `useStoreActions` with our list of actions, we get our `base` and `handleAction`
by decontructing the result.
- `base` includes utility functions for checking the state of actions.
For example `isLoading` and `hasError` functions are contained in there.
    - Make these functions accessible by returning base in the store state (`return { ...base }`).
- `handleAction` wraps a function and keeps track of loading state as well as capturing error
and putting this in the state
    - See [creating actions](/guide/creating-actions) for more detailed examples


### Using action enums

Actions are strongly typed and enums can be used as well if preferred:

```typescript
// Define your actions as an enum
enum ClientStoreActions {
    FetchClient = 'FetchClient',
}

export const useClientStore = defineStore('client', () => {
   const { base, handleAction } = useStoreActions({
        actions: Object.values(ClientStoreActions),
   });

   function fetchClient(id: string) {
       return handleAction(ClientStoreActions.FetchClient, id, async () => {
            // ...
       });
   }

   return {
       ...base,
       fetchClient,
   };
});
```

