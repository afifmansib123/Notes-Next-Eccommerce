import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useReducer, useEffect, useState } from "react";
import { useForm } from "react-hook-form"

const initialdata = {
    startloading: false,
    product: {},
    error: false,
}


export default function productuploader() {
    const router = useRouter()
    const [loading, setloading] = useState()
    const { status, data: session } = useSession()

    useEffect(() => {
        if (status === "authenticated") {
            //setloading(false)
            if (!session?.user?.isadmin) {
                setloading(true)
                router.push('/unauthorized?message=admin login required');
            } else {
                setloading(false)
            }
        } else {
            setloading(true)
            router.push('/login')
        }


    }, [status, session])

    if (loading === true) {
        return <p>loading</p>
    }

    const { register, handleSubmit, setValue } = useForm()
    const onSubmit = (data) => alert(JSON.stringify(data))

    const uploadHandler = async (e, imageField = 'image') => {
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
        try {
            const { data: { signature, timestamp } } = await axios('/api/admin/cloudinary-sign');

            const file = e.target.files[0];
            const formData = new FormData()
            formData.append('file', file);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp);
            formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
            const { data } = await axios.post(url, formData);
            setValue(imageField, data.secure_url);
            alert('successfully uploaded')
        } catch (err) {
            alert('failed to upload')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} />
            <input {...register("price")} />
            <input {...register("slug")} />
            <input {...register("image")} />
            <input {...register("catergory")} />
            <div className="mb-4">
                <label htmlFor="image">image</label>
                <input
                    type="text"
                    className="w-full"
                    id="image"
                    {...register('image', {
                        required: 'Please enter image',
                    })}
                />
            </div>
            <div className="mb-4">
                {/* This is the code for file upload */}
                <label htmlFor="imageFile">Upload image</label>
                <input
                    type="file"
                    className="w-full"
                    id="imageFile"
                    onChange={uploadHandler}
                />
            </div>
            <input type="submit" />
        </form>
    )
}