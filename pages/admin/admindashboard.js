import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const admindashboard = () => {
    const { status, data: session } = useSession();
    const router = useRouter()
    console.log("Session status:", status);
    console.log("Session data:", session);

    const [loading, setloading] = useState()

    const [summarydata, changedata] = useState()

    const [allproduct, chageallproducts] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            console.log("Inside useEffect");
            if (status === "authenticated") {
                if (!session?.user?.isadmin) {
                    router.push('/unauthorized?message=admin login required');
                } else {
                    setloading(false)
                    const fetcheddata = await axios.get("/api/admin/summary")
                    changedata(fetcheddata.data)
                    const fetchproducts = await axios.get("/api/admin/allproducts")
                    chageallproducts(fetchproducts.data)
                }
                console.log("Is Admin:", session?.user?.isadmin);
            } else if (status === "loading") {
                setloading(true)
            } else {
                router.push('/login')
            }
        }
        fetchdata()
    }, [status, session, router]);


    if (loading) {
        return <p>loading....</p>
    }

    console.log('fetch data', summarydata)
    console.log('fetch all products', allproduct)

    return (
        <div className="flex justify-center">
            <h1 className="flex justify-center" style={{color: "yellow"}}>hi admin</h1>
            {summarydata && summarydata.salesData ?
                summarydata.salesData.map((order) => (
                    <div>
                        <p>Total Sales: {order.totalSales}</p>
                    </div>))
                : (<h1>NO ORDERS</h1>)}
                
                    {summarydata && summarydata.totalproducts ?
                    (<p>Total Products: {summarydata.totalproducts}</p>)
                     :<p>No products</p>   
                }

        <p>Below is the List of All Products</p>
        <ul>
                {allproduct.map((product, index) => (
                    <li key={index}>
                        ID: {product._id}, Name: {product.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default admindashboard