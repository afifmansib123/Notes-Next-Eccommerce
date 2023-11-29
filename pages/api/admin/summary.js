import { getSession } from "next-auth/react";
import db from "@/utils/db";
import Order from "@/models/ordermodel";
import Product from "@/models/productsmodel";
import User from "@/models/usermodel";

const handler = async (req,res) => {
    const session = await getSession({req})

    console.log(session)

    if(!session || (session && !session.user.isadmin)){
        return res.status(401).send('signin required')
    }

    await db.connect()

    const totalorder = await Order.countDocuments()
    const totalproducts = await Product.countDocuments()
    const totslusers = await User.countDocuments()


    const ordersPriceGroup = await Order.aggregate([
        {
          $group: {
            _id: null,
            sales: { $sum: '$totalprice' },
          },
        },
      ]);
      const ordersPrice =
        ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;
    
      const salesData = await Order.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
            totalSales: { $sum: '$totalprice' },
          },
        },
      ]);
    
      await db.disconnect();
      res.send({ totalorder, totalproducts, totslusers, ordersPrice, salesData });
    };
    
export default handler;
