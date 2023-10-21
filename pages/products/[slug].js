import { useRouter } from "next/router"
import items from "@/utils/data"
import Image from "next/image"

const singlepage = () => {
    const {query} = useRouter()
    const {slug} = query

    const found = items.names.find((x)=>x.slug === slug)

    return(
        <div>
        <div  className="flex justify-center">
        {found.name} is going at {found.price}
        </div><br/>
        <div className="flex justify-center">
        <Image src = {found.image} alt="myimage" height="400" width = "400"></Image>
        </div>
        </div>
    )    
}

export default singlepage