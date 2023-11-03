import { Store } from "@/utils/Store"
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
                       <td><button onClick={()=>{
                        dispatch({type: "DELETE", payload : items.slug})
                       }}>(X)</button></td>
                    </tr>))}
        </tbody>
        </table>

    )
}
export default cartpage