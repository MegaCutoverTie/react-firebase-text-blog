import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

import { errorsFirebase } from "../utils/errorsFirebase"
import { formValidate } from "../utils/formValidate"

import FormError from "../components/FormError"
import FormInput from "../components/FormInput"
import Title from "../components/Title"
import FormButton from "../components/FormButton"

const Register = () => {
    
    const {register, handleSubmit, formState: {errors}, getValues, setError} = useForm()
    const {registerUser} = useContext(UserContext)
    const navegator = useNavigate()
    const {required, patternEmail, minLengthPass, validateTrim, validatePassMatch} = formValidate()

    const onSubmit = async(data) => {
        try{
            await registerUser(data.email, data.password)
            navegator("/")
        }catch(error){
            const {code, message} = errorsFirebase(error.code)
            setError(code, {
                message
            })
        }
    }

    return (
        <>
        <Title text={"Register"}/>
        <FormError error={errors.firebase}/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput type="email" placeholder="Enter your email" {...register("email", {
                required,
                pattern: patternEmail,
            })}
            label="Enter your email"
            error={errors.email}></FormInput>
            <FormError error={errors.email}/>

            <FormInput type="password" placeholder="Enter your password" {...register("password", {
                minLength: minLengthPass,
                validate: validateTrim,
            })}
            label="Enter your password"
            error={errors.password}></FormInput>
            <FormError error={errors.password}/>

            <FormInput type="password" placeholder="Confirm your password" {...register("repassword", {
                validate: validatePassMatch(getValues("password")),
            })}
            label="Confirm your password"
            error={errors.repassword}></FormInput>
            <FormError error={errors.repassword}/>

            <FormButton text={"Register"} type={"submit"}/>
        </form>
        </>
    )
}

export default Register
