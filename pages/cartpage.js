import { Store } from "@/utils/Store"
import { useContext } from "react"
import dynamic from "next/dynamic"
function cartpage() {
    const { state, dispatch } = useContext(Store)
    let pricecount = 0
    return (
        <>
            <div className="flex justify-center">
                <table className="flex justify-center">
                    <thead className="flex justify-center">
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
                                <td><select onChange={(e) => {
                                    let x = e.target.value
                                    dispatch({ type: "ADD", payload: { ...items, quantity: parseInt(x) } })
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
                </button><br />
                <div className="flex justify-center">TOTAL PRICE
                    TOTAL PRICE
                    {state.cart.cartitems.map((x) => {
                        const price = parseInt(x.price)
                        const quantity = parseInt(x.quantity)

                        pricecount = pricecount + (price * quantity)
                    })}
                    <span>({pricecount})</span>
                </div>
            </div>
        </>
    )
}
export default dynamic(() => Promise.resolve(cartpage), { ssr: false });