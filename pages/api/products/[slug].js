// pages/api/products/[slug].js

import db from "@/utils/db";
import Product from "@/models/productsmodel";

export default async function handler(req, res) {

    const { slug } = req.query;


    if (req.method === "PUT") {
        const { name, price } = req.body;
        try {
            await db.connect();

            const updatedProduct = await Product.findOneAndUpdate(
                { slug },
                { $set: { name, price } },
                { new: true }
            );

            await db.disconnect();

            if (!updatedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }

            return res.status(200).json({ message: "Product updated successfully", updatedProduct });
        } catch (error) {
            return res.status(500).json({ message: "Server Error", error: error.message });
        }
    } else if (req.method === "DELETE") {
        try {
            await db.connect()

            const deletedProduct = await Product.findOneAndDelete({ slug })
            await db.disconnect();

            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }

            return res.status(200).json({ message: "Product deleted successfully" });
        } catch (err) {
            return res.status(500).json({ message: "Server Error", error: error.message });
        }
    } else if (req.method === "POST"){
        try{
            await db.connect()
            const {name, price, slug, image, categoty, quantity, instock} = req.body

            const newproduct = new Product({
                name, price, slug, image, categoty, quantity, instock,
            })
            const saveproduct = await newproduct.save()
            res.status(201).json(saveproduct);
        }catch(error){
            alert(error)
        }
    }
    
    else {
        // Handle other HTTP methods
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
