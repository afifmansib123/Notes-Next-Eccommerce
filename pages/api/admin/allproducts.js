import { getSession, useSession } from "next-auth/react";
import Product from "@/models/productsmodel";
import db from "@/utils/db";

const handler = async (req,res) => {
    const session = await getSession({req})

    if(!session || (session && !session.user.isadmin)){
        return res.status(401).send('admin signin required')
    }

    await db.connect()

    try{
        const products = await Product.find({}, '_id name slug')
        await db.disconnect()
        res.status(200).json(products)
    }catch(err){
        await db.disconnect()
        res.status(500).json({message : 'error fetching'})
    }
}
export default handler