import Layout from '@/components/Layout'
import Cards from '@/components/cards'
import items from '@/utils/data'
import { useRouter } from 'next/router'
export default function Home() {
  const router = useRouter()

  return (
    <>
    <h1 className="flex justify-center">This is the Skeleton of an ecommerce website</h1><br/>
    <div className='flex grid grid-cols-4  gap-4 md:grid-cols-4 lg:grid-cols-4 items-center' style={{ fontSize: 20, color: "blue", whiteSpace: "nowrap" , border:"1px solid white",padding:"10px", borderRadius: "4px"}}>
      {
        items.names.map((x)=>(
          <Cards props={x} />
        ))
      }
      <button onClick={()=>{router.push('/api/posttodatabase')}}>Post To Database</button>
      </div>
      </>
  )
}
