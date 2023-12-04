import Product from "@/models/productsmodel"
import db from "@/utils/db"
import axios from "axios"
import { useRouter } from "next/router"
import Image from "next/image"
import { Store } from "@/utils/Store"
import { useContext, useEffect, useState } from "react"

export default function Singles(props) {

  let editproduct = {

  }

  const { query } = useRouter()
  const { slug } = query

  const { state, dispatch } = useContext(Store)

  const { singleproduct } = props

  const [editnanme, changeditname] = useState()
  const [editprice, changeeditprice] = useState()

  const Addtocart = async () => {
    //find the same of this id from the cart and see
    //if it exists already or not
    const existitem = state.cart.cartitems.find((x) => x.slug === singleproduct.slug)
    //if it exists alreday just increase the quantity
    const quantity = existitem ? existitem.quantity + 1 : 1 //either increase to q+1 or just 1 if it didnt exist before.

    //now update the cart accordingly.
    dispatch({ type: "ADD", payload: { ...singleproduct, quantity } }) //only update the quantity property since it is cart 

  }

  useEffect(() => {
    editproduct = {
      name : editnanme,
      price : editprice,
      slug : singleproduct.slug,
    }
  }, [editproduct])

  const editmyProduct = async () => {
    try {
      const response = await axios.put(`/api/products/${singleproduct.slug}`, {
        name: editnanme,
        price: editprice,
      });
  
      // Handle success response - maybe show a success message or update state
      console.log(response.data);
    } catch (error) {
      // Handle error - show error message or handle accordingly
      console.error(error);
    }
  };

  const deletemyproduct = async () => {
    try{
      const response = await axios.delete(`/api/products/${singleproduct.slug}`)
      console.log(response.data)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col items-center" style={{ fontSize: 20, color: "black", border: "1px solid white" }}>
      <h1 style={{ backgroundColor: "#203F9F", fontSize: 25, color: "white" }}>{singleproduct.name}</h1>
      <Image src={singleproduct.image} alt="hello" height={500} width={500}></Image>
      <h1 style={{ backgroundColor: "#203F9F", fontSize: 25, color: "white" }}>Price : {singleproduct.price}</h1>
      <button onClick={Addtocart} style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap", border: "2px solid black", padding: "1px", borderRadius: "1px" }}>add to cart</button>
      <label>New Name</label>
      <input onChange={(e) => { changeditname(e.target.value) }}></input>
      <label>New Price</label>
      <input onChange={(e) => { changeeditprice(e.target.value) }}></input>
      <button onClick={editmyProduct} style={{ fontSize: 20, color: "red", whiteSpace: "nowrap", border: "2px solid black", padding: "1px", borderRadius: "1px" }}>Edit Product</button>
      <button onClick={deletemyproduct} style={{ fontSize: 20, color: "red", whiteSpace: "nowrap", border: "2px solid black", padding: "1px", borderRadius: "1px" }}>Delete Product</button>
    </div>
  )


}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      singleproduct: product ? db.convertDocToObj(product) : null,
    },
  };
}