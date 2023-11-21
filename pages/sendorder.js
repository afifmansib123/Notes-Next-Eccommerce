import { Store } from "@/utils/Store"
import { useContext } from "react"

const test = () => {
    const {state, dispatch} = useContext(Store)
    const {cart} = state

    return(
        <>
        <h1>Here's a summary of your order</h1>
        <h1>{JSON.stringify(cart)}</h1>
        </>
    )
}
export default test