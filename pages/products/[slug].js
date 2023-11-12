import items from "@/utils/data"


import { useRouter } from "next/router"

import Image from "next/image"
import { Store } from "@/utils/Store"
import { useContext } from "react"

export default function Singles() {

    const {query} = useRouter()
    const {slug} = query

    const { state, dispatch } = useContext(Store)

    const singleproduct = items.names.find((x)=>x.slug === slug)

    const Addtocart = () => {
        //find the same of this id from the cart and see
        //if it exists already or not
        const existitem = state.cart.cartitems.find((x) => x.slug === singleproduct.slug)
        //if it exists alreday just increase the quantity
        const quantity = existitem ? existitem.quantity + 1 : 1 //either increase to q+1 or just 1 if it didnt exist before.

        //now update the cart accordingly.
        dispatch({ type: "ADD", payload: { ...singleproduct, quantity } }) //only update the quantity property since it is cart 

    }



    return (
        <div className="flex flex-col items-center" style={{ fontSize: 20, color: "white", border: "1px solid white" }}>
            <h1  style={{ backgroundColor: "#203F9F", fontSize: 25, color: "white" }}>{singleproduct.name}</h1>
            <Image src={singleproduct.image} alt="hello" height={500} width={500}></Image>
            <button onClick={Addtocart} style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"2px solid black",padding:"1px", borderRadius: "1px"}}>add to cart</button>
        </div>
    )


}