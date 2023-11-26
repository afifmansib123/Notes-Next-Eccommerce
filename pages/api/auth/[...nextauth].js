import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/usermodel"
import db from "@/utils/db"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    session: {
        strategy : "jwt",
    },
    callbacks: {
        async jwt({token, user}){
            if (user?._id) token.id_ = user._id
            if(user?.isadmin) token.isadmin = user.isadmin

            return token
        },
       async session({session , token}){
        if(token?._id) session.user._id = token._id
        if(token?.isadmin) session.user.isadmin = token.isadmin

        return session 
       }
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials){
                await db.connect()
                const user = await User.findOne({
                    email : credentials.email
                })
                await db.disconnect()
                if(user && (credentials.password === user.password)){
                    return {
                        _id : user._id,
                        name : user.name,
                        email : user.email,
                        image : 'x',
                        isadmin : user.isadmin,
                    }
                }
                console.log('user not found')
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
    ]

})