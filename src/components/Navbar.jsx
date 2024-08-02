import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

const Navbar = () => {
    const {user, signOutUser} = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false)

    const handleClickLogout = async() => {
        try{
            await signOutUser()
        }catch(error){
            console.log(error)
        }

        
    }
    const btnBlue = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

    const btnRed = "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"

    return (
        <nav className="bg-blue-700 border-gray-600 px-2 sm:px-4 py-2 border-b-2">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="https://portfolio-antonio-malpica.netlify.app/" className="flex items-center">
                    <img src="/antonio.jpg" alt="Logo" className="mr-3 h-6 sm:h9 rounded-full"/>
                    <span className="self-center text-xl font-semibold text-white whitespace-nowrap">Antonio Malpica</span>
                </a>
                <div className="flex md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                        </svg>
                    </button>
                </div>
                <div className={`${isOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-2`}>
                    {
                        user 
                        ? (
                        <div className="flex flex-col md:flex-row">
                        <NavLink to="/" className= {btnBlue} >Home</NavLink>
                        <NavLink to="/profile" className= {btnBlue} >My posts</NavLink>
                        <button onClick={handleClickLogout} className= {btnRed}>Logout</button>
                        </div>)
                        : (
                        <div className="flex flex-col md:flex-row">
                        <NavLink to="/register" className= {btnBlue}>Register</NavLink>
                        <NavLink to="/login" className= {btnBlue}>Login</NavLink>
                        </div>)
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar