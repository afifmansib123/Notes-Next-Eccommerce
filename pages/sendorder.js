import Checkoutwizard from "@/components/checkoutwizard"
import { Store } from "@/utils/Store"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"

const test = () => {
    const { state, dispatch } = useContext(Store)
    const { cart } = state

    const router = useRouter()

    const { data: session } = useSession()
    const user = session?.user?.name

    const shippingadress = cart.shippingadress
    const cartitems = cart.cartitems


    let [totalprice, changeprice] = useState()

    useEffect(()=>{
        let sendprice = 0
        cart.cartitems.map((x)=>{
            sendprice = sendprice + (x.price * x.quantity)
            changeprice(sendprice)
        })
        
    },[cartitems])

    console.log(totalprice)
    const ordersummary = {
        user,
        cartitems,
        shippingadress,
        totalprice,
    }

    const createorder = async () => {
        try {
            const response = await axios.post("/api/orders/order", ordersummary)
            router.push(`/orders/${response.data._id}`)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <Checkoutwizard activestep={3} />
            <div className="flex justify-center">
            <h1>Here's a summary of your order</h1>
            <p>Name : {user}</p>
            <p className="flex justify-center ml-20">totalprice : {totalprice}</p>
            <button style={{color: "green"}} onClick={createorder}>Make Order</button>
            </div>
        </div>
    )
}
export default test