import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { Storeprovider } from '@/utils/Store'
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
    <Storeprovider>
      <Layout>
       {
        Component.authenticationvariable === true
        ? <Authcheck><Component {...pageProps}/></Authcheck>
        :<Component {...pageProps}/>
       }
      </Layout>
    </Storeprovider>
    </SessionProvider>
  )
}

function Authcheck({children}){
  const router = useRouter()
  const status = useSession({
    required : true,
    onUnauthenticated(){
      router.push('unauthoeized?/login')
    }
  })
  if(status === 'loading'){
    return <div>loading....</div>
  }
  return children
}