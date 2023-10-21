import Link from "next/link"
import Image from "next/image"

const Cards = ({ props }) => {
    return (
        <div className="flex justify-center" style={{ border: "5px solid" }}>
            <Link href={`/products/${props.slug}`}>
                <div style={{ color: "green" }}>{props.name}</div>
                <div>{props.price}</div>
                <Image src = {props.image} alt="myimage" width = "100" height = "100"></Image>
                <br />
            </Link>
        </div>
    )
}

export default Cards