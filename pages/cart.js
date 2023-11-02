import { Store } from "@/utils/Store"
import { useContext } from "react"

const cartpage = () => {
    const {state} = useContext(Store)

    return(
        <>
        <div>{JSON.stringify(state.cart)}</div>
        </>
    )
}
export default cartpage