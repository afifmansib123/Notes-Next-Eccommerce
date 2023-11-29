import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function singleitem() {


    const { query } = useRouter()
    const orderId = query.id

    const [data, setdata] = useState({
        _id: "",
        user: "",
        cartitems: [],
        shippingadress: {},
        totalprice : 0,
    })

    useEffect(() => {
        const fetchorder = async () => {
            try {

                const { data } = await axios.get(`/api/orders/${orderId}`)
                setdata(data)

            } catch (err) {
                alert('could not fetch data')
            }
        }
        if (orderId) {
            fetchorder()
        }
    }, [orderId])

    return (
        <div className="flex justify-center">
            <h2 className="flex justify-center">ORDER NUMBER : {orderId}</h2>
            <h1 className="flex justify-center">order made by {data.user}</h1>
            <div className="flex justify-center"> Order Summary : 
                {data.cartitems.map((x) => (
                    <div>
                        <p>Name: {x.name}</p>
                        <p>Price: {x.price}</p>
                        <p>Quantity: {x.quantity}</p>
                        
                    </div>
                ))}
            </div><br/>
            <p>Totalprice : {data.totalprice}</p>
        </div>
    )
}