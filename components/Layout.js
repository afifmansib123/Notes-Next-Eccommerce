import Head from "next/head"
import { Store } from "@/utils/Store"
import { useContext } from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { Menu } from "@headlessui/react"

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
      signOut({ callbackUrl: '/login' })
      Cookies.remove('cart')
      dispatch({type : 'CART_RESET'})
  
    }

    return(
        <div>
            <Head>
            <title>{title? title : "Afif's revision"}</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous"/>
            </Head>
            <header className="flex justify-center">
                CART 
                <a className="p-2">
                  {cartitemscount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartitemscount}
                    </span>
                  )}
                </a>
                <Link href="/cartpage">Check cart</Link>
                {status === 'loading'
          ? (<div>Loading</div>)
          : session?.user
            ? <Menu>
              <Menu.Button>{session.user.name}</Menu.Button>
              <Menu.Items>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${active && 'bg-blue-500'}`}
                      href="/profile"
                    >
                      Profile
                    </a>
                  )}
                </Menu.Item><br />
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${active && 'bg-blue-500'}`}
                      href="/dashboard"
                    >
                      Dashbooard
                    </a>
                  )}
                </Menu.Item><br />
                <Menu.Item>
                  <a

                    href="#"
                    onClick={handlelogout} //MAIN SIGN OUT FUNCTIONALITY 
                  >
                    Sign out
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
            : (<Link href={'/userlogin'}>LOGIN</Link>)
        }
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