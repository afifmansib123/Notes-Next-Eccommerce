import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const admindashboard = () => {
    const { status, data: session } = useSession();
    const router = useRouter()
    console.log("Session status:", status);
    console.log("Session data:", session);

    const[loading,setloading] = useState()

    useEffect(() => {
        console.log("Inside useEffect");
        if (status === "authenticated") {
            if (!session?.user?.isadmin) {
                router.push('/unauthorized?message=admin login required');
            }else{
                setloading(false)
            }
            console.log("Is Admin:", session?.user?.isadmin);
        }else if(status === "loading"){
            setloading(true)
        }else{
            router.push('/login')
        }
    }, [status, session, router]);
 
    if(loading){
        return <p>loading....</p>
    }

    return (      
        <h1>hi admin</h1>
    );
}
export default admindashboard