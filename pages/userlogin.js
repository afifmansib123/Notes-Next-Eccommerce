import { useForm } from "react-hook-form"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GoogleButton } from "@/components/googlebutton";

function Loginscreen() {

    const router = useRouter()
    const {redirect} = router.query
    const {data : session} = useSession()

    useEffect(()=>{
        if(session?.user){
            router.push(redirect || '/')
        }
    },[router,session,redirect])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async ({email,password}) => {
    try{
        const result = await signIn('credentials', 
            {email, password}
        )
        if(result.error){
            alert('error signing in')
        }else{
            alert('signed in')
        }
    }catch(err){
        
    }
  }


  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col items-center" style={{ fontSize: 20, color: "black", border: "3px solid white" }}>
      <div style={{ fontSize: 20, color: "black", border: "3px solid black" }}>
      <label>Email :</label>
      <input defaultValue=""  {...register("email", { required: true })} />
      </div>
      <div style={{ fontSize: 20, color: "black", border: "3px solid black" }}>
      <label>Password :</label>
      <input defaultValue="" {...register("password", { required: true })} />
      </div>
      {errors.password && <span>This field is required</span>}
      <input style={{ fontSize: 20, color: "red", border: "3px solid green" }} type="submit"  />
    </form>
    <GoogleButton />
    </>
  )
}

export default Loginscreen