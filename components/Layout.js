import Head from "next/head"
import { Store } from "@/utils/Store"
import { useContext } from "react"
import Link from "next/link"

const Layout = ({title,children}) => {

    //call the state of the store
    const {state} = useContext(Store)
    const {cart} = state

    return(
        <div>
            <Head>
            <title>{title? title : "Afif's revision"}</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous"/>

            </Head>
            <header>
                CART 
                <a className="p-2">
                  Cart
                  {cart.cartitems.length > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cart.cartitems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                </a>
                <Link href="/cartpage">Check cart</Link>
            </header>
            <main>
            {children}
            </main>
            <footer className="flex ml-20 items-center justify-center">
                created by @afif
            </footer>
        </div>
    )
}
export default Layout