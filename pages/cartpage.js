import { Store } from "@/utils/Store"
import { useContext } from "react"
function cartpage() {
    const { state, dispatch } = useContext(Store)
    return (
        <>
        <div className="flex justify-center">
            <table className="flex justify-center">
                <thead className="flex justify-center">
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr><br/>
                </thead>
                <tbody>
                    {state.cart.cartitems.map((items) => (
                        <tr key={items.slug}>
                            <td>{items.name}</td>
                            <td>{items.price}</td>
                            <td>{items.quantity}</td>
                            <td><select onChange={(e)=>{
                                let x = e.target.value
                                dispatch({type: "ADD", payload : {...items, quantity: parseInt(x)}})
                            }}>
                                {
                                    //THIS IS THE TURN NUMBER TO ARRAYS FUNCTION
                                    [...Array(items.instock).keys()].map((count) => (<option value={count + 1}>                                    
                                        {count + 1}
                                    </option>))}
                            </select></td>
                            <td><button onClick={() => {
                                dispatch({ type: "DELETE", payload: items.slug })
                            }}>(X)</button></td>
                        </tr>))}
                </tbody>
            </table>
            </div>
            <div className="flex justify-center">
            <button onClick={() => { alert(JSON.stringify(state.cart)) }}>
                Check Cart State
            </button>
            </div>
        </>
    )
}
export default cartpage