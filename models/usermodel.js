import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {type : String, required : false},
    isadmin : {type : Boolean, required : true, default: false},
    email : {type : String, required : true},
    password : {type : String , required : true},
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)
export default User