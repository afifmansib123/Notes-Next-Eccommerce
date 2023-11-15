import Layout from '@/components/Layout'
import Cards from '@/components/cards'
import Product from '@/models/productsmodel'
import db from '@/utils/db'
import { useRouter } from 'next/router'


export default function Home({products}) {
  const router = useRouter()
  return (
    <>
    <h1 className="flex justify-center">This is the Skeleton of an ecommerce website</h1><br/>
    <div className='flex grid grid-cols-4  gap-4 md:grid-cols-4 lg:grid-cols-4 items-center' style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"1px solid white",padding:"10px", borderRadius: "4px"}}>
      {
        products.map((x)=>(
          <Cards props={x} />
        ))
      }
      <button onClick={()=>{router.push('/api/posttodatabase')}}>Post To Database</button>
      </div>
      </>
  )
}
export async function getServerSideProps(){
  await db.connect() //first connect to the database
  const products = await Product.find().lean()  //lean is default finding for mongodb
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
