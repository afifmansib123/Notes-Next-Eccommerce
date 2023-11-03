import { createContext, useReducer } from "react";


//initial cart with an empty string array
//initial state is an empty object
const initialstate = {
    cart : {
        cartitems : []
    }
}

//reducer function to update cart items
export const reducer = (state,action) => {
    switch(action.type){
        case "ADD":
            const newitem = action.payload;
            const existitem = state.cart.cartitems.find((x)=>x.slug===newitem.slug)

            const cartitems = existitem 
            ? state.cart.cartitems.map((x)=>x.slug === existitem.slug ? newitem : x) //if the item is added to cart already just increase the count
            : [...state.cart.cartitems, newitem] //else add the item to the cart with the previous state existing

            //have to return it now :
            return {...state, cart: {...state.cart, cartitems}}
        case "DELETE":
            const reqslug = action.payload
            console.log(reqslug)
            console.log(state.cart.cartitems)
            const newcart = state.cart.cartitems.filter((x)=>x.slug!==reqslug)
            console.log(newcart)
            return {...state, cart : {cartitems : newcart} }
            
            //console.log(newcart)
            //return {...state, cart : {...state.cart, }}
        default:
            return state
    }
}

//create Store to Provide
export const Store = createContext()


//define what to provide for the context
export function Storeprovider ({children}){
    const [state,dispatch] = useReducer(reducer, initialstate) //function and the cart
    return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>
}

//now we will put this in _app.js to cover the whole app with this.