import Link from "next/link";

export default function Dropdownlink(props){
    let {href, children, ...rest} = props
    return(
        <Link href={href} style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"1px solid white",padding:"10px", borderRadius: "4px"}}>
            <a {...rest} style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"1px solid white",padding:"10px", borderRadius: "4px"}}>{children}</a>
        </Link>
    )
}