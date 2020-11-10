// funzione per il conteggio degli item nel carrello
// 1. creo funzione a cui passo
// - cartItems: tutti gli item attualmenti esistenti nell'array del carrello 
// - cartItemToAdd: l'item che vogliamo aggiungere
export const addItemToCart = (cartItems, cartItemToAdd) => {
    // Verifico se dentro il cartItems esistente per vedere se il cartItemToAdd è già presente
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );
    // se presente, existingCartItem sarà true, altrimenti undefined
    // Quindi, se existingCartItem esiste...
    if (existingCartItem) {
        // un nuovo array in cui...
        return cartItems.map(cartItem =>
            // ...se item già esistente, creo un nuovo oggetto con cartItem
            // e la proprietà quantity + 1 (Nota: in questo momento la prop quantity non ce l'ho ancora creata, ma rimedio dopo)
            // altrimenti passo cartItem così com'è
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    // se existingCartItem non presente nell'array
    // ritorno un nuovo array con tutti i cartItems esistenti,
    // ma voglio aggiungere anche un oggetto con cartItemToAdd a cui aggiungo una quantity di 1 
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}