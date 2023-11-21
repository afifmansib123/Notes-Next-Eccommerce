import Checkoutwizard from "@/components/checkoutwizard"
import { Store } from "@/utils/Store"
import Cookies from "js-cookie"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
const { useContext, useState } = require("react")

const createorder = () => {
    const {state,dispatch} = useContext(Store)   
    const {cart} = state
    const {cartitems, shippingadress} = cart 

    const {data : session} = useSession()
    const user = session?.user?.name

    const [payment, changepayment] = useState('')

    const router = useRouter()

    //create new order object
    const order = {
        user,
        cartitems,
        shippingadress,
    }

    const handleSubmit = () => {
        dispatch({
            type : "ADDPAY",
            payload : payment,
        })
        router.push('/sendorder')
    }

    return(
        <div className="flex justify-center">
            <Checkoutwizard activestep={2}/>
            {['Alipay','Promptpay','Cash'].map((x) => (
            <div key={x} className="mb-4">
            <input
              id = {x}
              className="p-2 outline-none focus:ring-0"
              type="radio"
              onChange={()=>{changepayment(x)}}
              checked={x === payment}
            />

            <label className="p-2" htmlFor={x}>
              {x}
            </label>
          </div>
        ))}
        <button onClick={handleSubmit}>Make Order</button>
        </div>
    )

}

export default createorder