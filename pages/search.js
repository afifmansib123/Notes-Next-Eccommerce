import { useRouter } from "next/router"
import Product from "@/models/productsmodel"
import db from "../utils/db"
import Cards from "@/components/cards"

const PriceFilterOptions = [
  {
    name: '1 to 20',
    value: '1-20'
  },
  {
    name: '21 to 50',
    value: '21-50'
  },
  {
    name: '51 to 70',
    value: '51-70'
  },
]

const Search = (props) => {
  const router = useRouter()
  
  const {
    products,
    countProducts,
    page,
    // ...other destructured props
  } = props

  const { query } = router
  const selectedPrice = query.price || 'all'

  const filterserach = ({ price }) => {
    router.push({
      pathname: router.pathname,
      query: { ...query, price },
    })
  }

  const priceHandler = (e) => {
    filterserach({ price: e.target.value })
  }

  return (
    <>
      <div className="mb-3">
        <h2>Prices</h2>
        <select className="w-full" value={selectedPrice} onChange={priceHandler}>
          <option value="all">All</option>
          {PriceFilterOptions.map((priceOption) => (
            <option key={priceOption.value} value={priceOption.value}>
              {priceOption.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3  ">
              {products.map((product) => (
                <Cards props={product}
                />
              ))}
            </div>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const pageSize = 2;
  const page = query.page || 1;
  const price = query.price || 'all';

  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};

  await db.connect();

  const productDocs = await Product.find({
    ...priceFilter,
  })
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...priceFilter,
  });

  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      // ...other props you want to pass
    },
  };
}

export default Search
