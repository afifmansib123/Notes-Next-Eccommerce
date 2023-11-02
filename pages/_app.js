import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { Storeprovider } from '@/utils/Store'

export default function App({ Component, pageProps }) {
  return (
    <Storeprovider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Storeprovider>
  )
}