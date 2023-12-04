// pages/api/products/[slug].js

import db from "@/utils/db";
import Product from "@/models/productsmodel";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { slug } = req.query;
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
}
