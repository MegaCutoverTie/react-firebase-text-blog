import { Outlet } from "react-router-dom"

const FormLayout = () => {
    return(
        <div className="container mx-auto border-2 border-gray-500 p-4 rounded-2xl max-w-sm px-8 pb-5 my-10">
            <Outlet/>
        </div>
    )
}

export default FormLayout