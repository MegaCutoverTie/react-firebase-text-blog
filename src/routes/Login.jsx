import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

import { errorsFirebase } from "../utils/errorsFirebase"
import { formValidate } from "../utils/formValidate"

import FormError from "../components/FormError"
import FormInput from "../components/FormInput"
import Title from "../components/Title"
import FormButton from "../components/FormButton"

const Login = () => {
    const {register, handleSubmit, formState: {errors}, getValues, setError} = useForm()
    const {loginUser} = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const navegator = useNavigate()
    const {required, patternEmail, minLengthPass, validateTrim} = formValidate()

    const onSubmit = async(data) => {
        try{
            setLoading(true)
            await loginUser(data.email, data.password)
            navegator("/")
        }catch(error){
            const {code, message} = errorsFirebase(error.code)
            setError(code, {
                message,
            })
        }finally{
            setLoading(false)
        }
    }

    return(
        <>
        <Title text={"Login"}/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput type="email" placeholder="Enter your email" {...register("email", {
                required,
                pattern: patternEmail,
            })}
            label="Email"
            error={errors.email}></FormInput>
            <FormError error={errors.email}/>

            <FormInput type="password" placeholder="Enter your password" {...register("password", {
                minLength: minLengthPass,
                validate: validateTrim,
            })}
            label="Password"
            error={errors.password}></FormInput>
            <FormError error={errors.password}/>
            <FormButton text={"Login"} type={"submit"} loading={loading.addData}/>
            
        </form>
        </>
    )
}

export default Login