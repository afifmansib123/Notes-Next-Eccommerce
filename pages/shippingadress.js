import { useForm } from "react-hook-form"
import Checkoutwizard from "@/components/checkoutwizard"
import { useContext, useEffect } from "react"
import { Store } from "@/utils/Store"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

const shippingadress = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue, //we will use this property to set the values from the inputs to the cart object
    } = useForm()

    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const { shippingadress } = cart
    const router = useRouter()

    useEffect(() => {
        setValue('housenumber', shippingadress.housenumber)
        setValue('street', shippingadress.street)
        setValue('state', shippingadress.state)
        setValue('province', shippingadress.province)
        setValue('country', shippingadress.country)
    }, [setValue, shippingadress])

    const submitinformation = ({ housenumber, street, state, province, country }) => {
        dispatch({
            type: "SHIPPINGADD",
            payload: { housenumber, street, state, province, country }
        })
        Cookies.set('cart', JSON.stringify({ ...cart, shippingadress: { housenumber, street, state, province, country } }))

        router.push('/payment')
    }
    return (
        <div>
            <Checkoutwizard activestep={1} />

            <form onSubmit={handleSubmit(submitinformation)}>
                <label>house number</label>
                <input {...register("housenumber", { required: true })} />
                {errors.housenumber && <span>This field is required</span>}

                <label>street</label>
                <input {...register("street", { required: true })} />
                {errors.street && <span>This field is required</span>}

                <label>state</label>
                <input {...register("state", { required: true })} />
                {errors.state && <span>This field is required</span>}

                <label>province</label>
                <input {...register("province", { required: true })} />
                {errors.province && <span>This field is required</span>}

                <label>country</label>
                <input {...register("country", { required: true })} />
                {errors.country && <span>This field is required</span>}

                <button type="submit">go to payment</button>
            </form>

        </div>
    )
}
export default shippingadress
shippingadress.authenticationvariable = true