import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { Storeprovider } from '@/utils/Store'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
    <Storeprovider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Storeprovider>
    </SessionProvider>
  )
}