import db from "@/utils/db";
import User from "@/models/usermodel";

export default async function handler(req, res) {
    await db.connect()
    if (req.method === "POST") {
        try {
            const { name, email, password } = req.body

            const newuser = new User({
                name,
                email,
                password,
            })

            const saveuser = await newuser.save()
            res.status(201).json(savedOrder);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Server Error' });
        }
    }else{
        alert('method not allowed')
    }
}