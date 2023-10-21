import Layout from '@/components/Layout'
import Cards from '@/components/cards'
import items from '@/utils/data'
export default function Home() {

  return (
    <>
    <h1 className="flex justify-center">This is the Skeleton of an ecommerce website</h1><br/>
    <div className='flex grid grid-cols-4  gap-4 md:grid-cols-4 lg:grid-cols-4 items-center'>
      {
        items.names.map((x)=>(
          <Cards props={x} />
        ))
      }
      </div>
      </>
  )
}
