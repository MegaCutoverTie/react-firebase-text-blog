import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useFirestore } from "../hooks/useFirestore"
import { formValidate } from "../utils/formValidate"

import Title from "../components/Title"
import FormButton from "../components/FormButton"
import FormInput from "../components/FormInput"
import FormError from "../components/FormError"
import FormModal from "../components/FormModal"


const Profile = () => {
    const {required,} = formValidate()
    const {register, handleSubmit, formState: {errors}, resetField, setValue, setError} = useForm()
    const {data, error, loading, getDataP, addData, updateData, deleteData} = useFirestore()
    const [updateId, setUpdateId] = useState()

    useEffect(() => {
        getDataP()
    }, [])

    if(loading.getData) return <p>Loading data...</p>
    if(error) return <p>{error}</p> 

    const onSubmit = async({title, text}) => {
        try{
            if(updateId){
                await updateData(updateId, title, text)
                setUpdateId('')
            }else{
               await addData(title, text)
            }
            resetField('title')
            resetField('text')
        }catch (error){
            const {code, message} = errorsFirebase(error.code)
            setError(code, {
                message,
            })
        }
    }
    
    const handleClickEdit = (item) => {
        setValue('title', item.title)
        setValue('text', item.text)
        setUpdateId(item.nanoid)
    }

    const handleClickDelete = async(nanoid) => {
        await deleteData(nanoid)
    }

    return(
        <div className="container pt-3 h-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4 mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <FormInput type="text" placeholder="Example title" {...register("title", {
                    required,
                })}
                label="Post title"
                error={errors.title}>
                </FormInput>
                <FormError error={errors.title}/>

                <FormInput type="text" placeholder="Example text" {...register("text", {
                    required,
                })}
                label="Post body"
                error={errors.text}>
                </FormInput>
                <FormError error={errors.text}/>
                {
                    updateId 
                    ? <FormButton text="Edit post" type="submit" loading={loading.addData}/>
                    : <FormButton text="Add post" type="submit" loading={loading.addData}/>
                }
            </form>

            <Title text={"My posts"}/>

            {
                data.map(item => (
                    <div key={item.nanoid} className="m-4 px-6 pt-6 pb-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <span className="flex">
                            <img src="/user.svg" alt="" className="w-4 mr-2"/>
                            <p>You:</p>
                        </span>
                        <p className="text-xl font-semibold border-b-2 border-gray-400 mt-2 pb-1">{item.title}</p>
                        <p className="text-md pt-1">{item.text}</p>
                        <span className="flex space-x-2">
                            <FormButton text="Edit" type="button" onClick={() => handleClickEdit(item)}/>
                            <FormButton text="Delete" type="button" loading={loading[item.nanoid]} color="red" onClick={() => handleClickDelete(item.nanoid)}/>
                        </span>
                        
                    </div>
                ))
            }
        </div>
    )
}

export default Profile