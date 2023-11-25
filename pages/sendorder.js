import Checkoutwizard from "@/components/checkoutwizard"
import { Store } from "@/utils/Store"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useContext } from "react"

const test = () => {
    const { state, dispatch } = useContext(Store)
    const { cart } = state

    const router = useRouter()

    const { data: session } = useSession()
    const user = session?.user?.name

    const shippingadress = cart.shippingadress
    const cartitems = cart.cartitems

    const ordersummary = {
        user,
        cartitems,
        shippingadress,

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
            <h1>Here's a summary of your order</h1>
            <p>{JSON.stringify(ordersummary.user)}</p>
            <span>{JSON.stringify(ordersummary)}</span>
            <button style={{color: "green"}} onClick={createorder}>Make Order</button>
        </div>
    )
}
export default test