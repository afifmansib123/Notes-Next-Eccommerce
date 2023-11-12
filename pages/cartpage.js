import { Store } from "@/utils/Store"
import { useContext } from "react"
import dynamic from "next/dynamic"
function cartpage() {
    const { state, dispatch } = useContext(Store)
    let pricecount = 0
    return (
        <>
            <div className="flex justify-center">
                <table className="flex flex-col items-center">
                    <thead className="flex justify-center mb-5">
                        <tr>
                            <th style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"2px solid black",padding:"1px", borderRadius: "1px"}}>Product</th>
                            <th style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"2px solid black",padding:"1px", borderRadius: "1px"}}>Price</th>
                            <th style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"2px solid black",padding:"1px", borderRadius: "1px"}}>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.cart.cartitems.map((items) => (
                            <tr key={items.slug}>
                                <td style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"2px solid black",padding:"1px", borderRadius: "1px"}}>{items.name}</td>
                                <td style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"2px solid black",padding:"1px", borderRadius: "1px"}}>{items.price}</td>
                                <td style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"2px solid black",padding:"1px", borderRadius: "1px"}}>{items.quantity}</td>
                                <td style={{ fontSize: 20, color: "red", whiteSpace: "nowrap" , border:"2px solid black",padding:"1px", borderRadius: "1px"}}><select onChange={(e) => {
                                    let x = e.target.value
                                    dispatch({ type: "ADD", payload: { ...items, quantity: parseInt(x) } })
                                }}>
                                    {
                                        //THIS IS THE TURN NUMBER TO ARRAYS FUNCTION
                                        [...Array(items.instock).keys()].map((count) => (<option value={count + 1}>
                                            {count + 1}
                                        </option>))}
                                </select></td>
                                <td style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"2px solid black",padding:"1px", borderRadius: "1px"}}><button onClick={() => {
                                    dispatch({ type: "DELETE", payload: items.slug })
                                }}>(X)</button></td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                <button onClick={() => { alert(JSON.stringify(state.cart)) }} style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"2px solid black",padding:"1px", borderRadius: "1px"}}>
                    CART OBJECT
                </button><br />
                <div className="flex justify-center" style={{ fontSize: 20, color: "green", whiteSpace: "nowrap" , border:"2px solid black",padding:"1px", borderRadius: "1px"}}>Total = 
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