import { Store } from "@/utils/Store"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useContext } from "react"

const test = () => {
    const {state, dispatch} = useContext(Store)
    const {cart} = state

    const {data : session} = useSession()
    const user = session?.user?.name

    const shippingadress = cart.shippingadress
    const cartitems = cart.cartitems

    const ordersummary = {
        user,
        cartitems,
        shippingadress,
  
    }

    const createorder = async () => {
        try{
            const response = await axios.post("/api/orders/order", ordersummary)
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div>
        <h1>Here's a summary of your order</h1>
        
        <button onClick={createorder}>Make Order</button>
        </div>
    )
}
export default test