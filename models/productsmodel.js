import mongoose, { Mongoose } from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {type : String, required : false},
    price: {type : String, required : false},
    slug: {type : String, required : false},
    image: {type : String, required : false},
    quantity : {type : Number, required : false},
    instock : {type : Number, required : false},
  })

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

export default Product