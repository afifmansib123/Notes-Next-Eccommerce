

export const initialstate = {
    cart : {
        cartitems : []
    }
}
export const cartfunctionality = (state, action) => {
    switch(action.type){
        case "ADDTOCART":
            const requestitem = action.payload
            const existincartalready = state.cart.cartitems.find((x)=>x.slug === requestitem.slug)

            const checkcartitems = existincartalready
            ? state.cart.cartitems.map((item)=>item.slug === existincartalready.slug ? requestitem : item)
            : [...state.cart.cartitems, requestitem]

            return {
                ...state,
                cart : {
                    ...state.cart,
                    cartitems : checkcartitems,
                }
            }
        default : 
            return state
    }
}