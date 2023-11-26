import { useForm } from "react-hook-form"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

function registrationscreen() {

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



  const onSubmit = async ({email,name,password,cf_password}) => {
        if (password !== cf_password){
            alert('passwords dont match')
        }else{
            try{
                const myuser = {
                    name,
                    email,
                    password,
                  }
                const response = await axios.post("/api/users/user", myuser)
            }catch(err){
                
            }

        }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col items-center" style={{ fontSize: 20, color: "black", border: "3px solid white" }}>
      <div style={{ fontSize: 20, color: "black", border: "3px solid black" }}>
      <label>Email :</label>
      <input defaultValue=""  {...register("email", { required: true })} />
      </div>
      <div style={{ fontSize: 20, color: "black", border: "3px solid black" }}>
      <label>Name :</label>
      <input defaultValue=""  {...register("name", { required: true })} />
      </div>
      <div style={{ fontSize: 20, color: "black", border: "3px solid black" }}>
      <label>Password :</label>
      <input defaultValue="" {...register("password", { required: true })} />
      </div>
      <div style={{ fontSize: 20, color: "black", border: "3px solid black" }}>
      <label>Confirm Password :</label>
      <input defaultValue="" {...register("cf_password", { required: true })} />
      </div>
      {errors.password && <span>This field is required</span>}
      <input style={{ fontSize: 20, color: "red", border: "3px solid green" }} type="submit"  />
    </form>
  )
}

export default registrationscreen