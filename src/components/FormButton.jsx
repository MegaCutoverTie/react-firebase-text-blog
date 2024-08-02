import LoadBtn from "./LoadBtn"

const FormButton = ({text, type, color = "blue", loading, onClick}) => {

    if(loading){
        return(
            <LoadBtn />
        )
    }

    return(
        <button onClick={onClick} type={type} className={`mt-3 text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800`}>{text}</button>
    )
}

export default FormButton