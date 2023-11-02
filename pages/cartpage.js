import { Store } from "@/utils/Store"
import items from "@/utils/data"
import { useContext } from "react"
function cartpage() {
    const { state, dispatch } = useContext(Store)
    return (

        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {state.cart.cartitems.map((items) => (
                    <tr key={items.slug}>
                       <td>{items.name}</td> 
                       <td>{items.price}</td> 
                       <td>{items.quantity}</td> 
                    </tr>))}
        </tbody>
        </table>

    )
}
export default cartpage