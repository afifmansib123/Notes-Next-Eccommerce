export const initialstate = {
    cart : {
        cartitems : []
    }
}

export const reducerfunction = (state, action) => {
    switch(action.type){ 
        case "ADDTOCART" :
            const reqitem = action.payload

            let existitem = false
            const test = () => {
                state.cart.cartitems.map((x)=>{
                    if(x.slug === reqitem.slug){
                        existitem = true
                    }else{
                        existitem = false
                    }
                })
            }
            test()
            if(existitem === false){
                return{
                    ...state,
                    cart : {
                        cartitems : [...state.cart.cartitems, reqitem]
                    }
                }
            }else{
                return{
                    ...state,
                    cart : {
                        cartitems : state.cart.cartitems.map((x)=>{if(x.slug === reqitem.slug){
                            return{
                                ...x,
                                quantity : x.quantity + 1
                            }
                        }})
                    }
                }
            }
            
        default:
            return {state}
    }
}