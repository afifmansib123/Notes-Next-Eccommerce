import Head from "next/head"
import { Store } from "@/utils/Store"
import { useContext } from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { Menu } from "@headlessui/react"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

const Layout = ({title,children}) => {

    //call the state of the store
    const {state} = useContext(Store)
    const {cart} = state
    const [cartitemscount, setcartitemscount] = useState(0)

    useEffect(()=>{
      setcartitemscount((cart.cartitems.reduce((a, c) => a + c.quantity, 0)))
    },[cart.cartitems])

    const {status, data : session} =  useSession()

    const handlelogout = () => {
      signOut({ callbackUrl: '/userlogin' }) 
      Cookies.remove('cart')
      dispatch({type : "CART_RESET"})
  
    }

    const [query, setquery] = useState('')
    const router = useRouter()

    const handlesearch = (event) => {
      event.preventDefault()
      router.push(`/search?query=${query}`)
    }
    return(
        <div>
            <Head>
            <title>{title? title : "Afif's revision"}</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous"/>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
            </Head>
            <header className="flex justify-center" style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"5px solid white",padding:"10px", borderRadius: "4px"}}>
                <p  style={{ fontSize: 20, color: "black", whiteSpace: "nowrap" , border:"2px solid blue",padding:"10px", borderRadius: "4px"}}>CART</p>
                <Link href="/registeruser" style={{ fontSize: 20, color: "black", whiteSpace: "nowrap" , border:"2px solid blue",padding:"10px", borderRadius: "4px"}}>REGISTER USER</Link>
                <a className="p-2">
                  {cartitemscount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartitemscount}
                    </span>
                  )}
                </a>
                <Link href="/cartpage" style={{ fontSize: 20, color: "black", whiteSpace: "nowrap" , border:"2px solid blue",padding:"10px", borderRadius: "4px"}}>Check cart</Link>
         {status === 'loading' ?
          (<div>Loading</div>)

          //// already loaded section
          : session?.user
            ?
            session?.user?.isadmin === true ?
            <Menu>
              <Menu.Button style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"2px solid black",padding:"10px", borderRadius: "4px"}}>{session.user.name}</Menu.Button>
              <Menu.Items>
                <Menu.Item style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"2px solid black",padding:"1px", borderRadius: "1px"}}>
                  {({ active }) => (
                    <a
                      className={`${active && 'bg-blue-500'}`}
                      href="/admin/admindashboard"
                    >
                      Admin Dahboard
                    </a>
                  )}
                </Menu.Item><br />
                <Menu.Item style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"2px solid black",padding:"1px", borderRadius: "1px"}}>
                  {({ active }) => (
                    <a
                      className={`${active && 'bg-blue-500'}`}
                      onClick={handlelogout}
                    >
                      Signout
                    </a>
                  )}
                </Menu.Item><br />
                </Menu.Items>
            </Menu> :
            <Menu>
            <Menu.Button style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"2px solid black",padding:"10px", borderRadius: "4px"}}>{session.user.name}</Menu.Button>
            <Menu.Items>
              <Menu.Item style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"2px solid black",padding:"1px", borderRadius: "1px"}}>
                {({ active }) => (
                  <a
                    className={`${active && 'bg-blue-500'}`}
                    href="/profile"
                  >
                    User Profile
                  </a>
                )}
              </Menu.Item><br />
              <Menu.Item style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"2px solid black",padding:"1px", borderRadius: "1px"}}>
                  {({ active }) => (
                    <a
                      className={`${active && 'bg-blue-500'}`}
                      onClick={handlelogout}
                    >
                      Signout
                    </a>
                  )}
                </Menu.Item><br />
              </Menu.Items>
          </Menu>
            : (<Link href={'/userlogin'} style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"2px solid black",padding:"2px", borderRadius: "1px"}}>LOGIN</Link>)
        }
        <form>
             <input onChange={(e)=>{setquery(e.target.value)}}></input>
             <button type = "submit" onClick={handlesearch}>Search</button>
            </form>
            </header>
            <main>
            {children}
            </main>
            <footer className="flex justify-center">
                created by @afif
            </footer>
        </div>
    )
}
export default Layout