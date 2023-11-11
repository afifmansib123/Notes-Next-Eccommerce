import { useForm } from "react-hook-form"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="e@gmail.com" {...register("email", { required: true })} />
      <input defaultValue="***********" {...register("password", { required: true })} />
      {errors.password && <span>This field is required</span>}
      <input type="submit" />
    </form>
  )
}

export default Loginscreen