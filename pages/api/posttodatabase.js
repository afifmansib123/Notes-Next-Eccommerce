import User from "@/models/usermodel";
import Product from "@/models/productsmodel";
import items from "@/utils/data";
import db from "@/utils/db";

const handler = async (req,res) => {
    await db.connect()
    await User.insertMany(items.users)
    await Product.insertMany(items.names)
    await db.disconnect()
    res.send({message : 'seeded successfully'})
}

export default handler