import { useRouter } from "next/router"
import Product from "@/models/productsmodel"
import db from "../utils/db"
import Cards from "@/components/cards"


// keep all price options in an array of objects

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

/*---------
The Search here is going to be main function.
basically the getserverprops below fetches the props
from the backend and these props are passed onto this 
function that does operation on this page   ---------*/


const Search = (props) => {
  const router = useRouter()

  const {
    price = 'all',
    category = 'all',
  } = router.query;
  
  const {
    products,
    countProducts,
    page,
    categories,  // getting the category props back
  } = props

  const { query } = router
  const selectedPrice = query.price || 'all'

  // check category
  const selectedCategory = query.categories || 'all'


  // search options with price filter
  const filterserach = ({ price , category}) => {
    const { query } = router;
    if (category) query.category = category;
    if (price) query.price = price;
    router.push({
      pathname: router.pathname,
      query: { ...query, price },  // the previous search and new
    })
  }
  const categoryHandler = (e) => {
    filterserach({ category: e.target.value });
  };
  // price handler at dirct input
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
      <div className="my-3">
            <h2>Categories</h2>
            <select
              className="w-full"
              value={category}
              onChange={categoryHandler}
            >
              <option value="all">All</option>
              {categories &&
                categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
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
  const category = query.category || 'all';

  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};

  const categoryFilter = category && category !== 'all' ? { category } : {};

  await db.connect();
  const categories = await Product.find().distinct('category');

  const productDocs = await Product.find({
    ...priceFilter,
    ...categoryFilter,
  })
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...priceFilter,
    ...categoryFilter,
  });

  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      categories,
    },
  };
}

export default Search
