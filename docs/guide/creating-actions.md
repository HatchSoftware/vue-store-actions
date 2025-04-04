# Creating actions

Store actions can be defined in two ways:
- With no action IDs
- With action IDs

Action IDs allow you to be specific on what resource your actions are executing. This allows you to
later not only know the overall state of the action but also the action for a specific resource.

## With no action IDs

Some actions don't require distinquishment, such as fetching all the clients.
In this case, knowing if the action itself is loading or not is enough, there is no further
distinquishment necessary.

To define an action like this, simply supply undefined for the action ID.

```typescript
const { base, handleAction } = useStoreActions({
    actions: ['fetchClients', 'editClient'],
});

function fetchClients() {
    return handleAction('fetchClients', undefined, async () => {
        return (clients.value = await ClientsApi.getClients());
    });
}
```

## With action IDs

Some actions do require distinquishment, such as editing a specific client.
In most cases knowing if the actions is loading is good enough but you might in an overview 
indicate which of the clients is loading. In that case you can supply an action ID.

To define an action like this, simply supply undefined for the action ID.

```typescript
const { base, handleAction } = useStoreActions({
    actions: ['fetchClients', 'editClient'],
});

function editClient(id: string, contract: EditClientContract) {
    return handleAction('editClient', id, async () => {
        return (client.value = await ClientsApi.editClient(id, contract));
    });
}
```
