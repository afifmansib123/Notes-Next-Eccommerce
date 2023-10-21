import { useRouter } from "next/router"
import items from "@/utils/data"
import Image from "next/image"
import { useReducer } from "react"
import { reducerfunction, initialstate } from "@/utils/Store"

const singlepage = () => {
    const {query} = useRouter()
    const {slug} = query

    const found = items.names.find((x)=>x.slug === slug)


    const [state,dispatch] = useReducer(reducerfunction, initialstate)

    const addtocart = () => {
       dispatch({type : "ADDTOCART", payload : found})
    }

    const checkcart = () => {
        alert(`Your cart has ${JSON.stringify(state)}`)
    }

    return(
        <div>
        <div  className="flex justify-center">
        {found.name} is going at {found.price}
        </div><br/>
        <div className="flex justify-center">
        <Image src = {found.image} alt="myimage" height="400" width = "400"></Image>
        </div>
        <div className="flex justify-center">
        <button className="flex justify-center" style = {{color : "black", border : "3px solid"}} onClick={addtocart}>Add to Cart</button>
        </div>
        <div className="flex justify-center">
        <button className="flex justify-center" style = {{color : "black", border : "3px solid"}} onClick={checkcart}>CHECK CART</button>
        </div>
        </div>
    )    
}

export default singlepage