import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

const Navbar = () => {
    const {user, signOutUser} = useContext(UserContext)

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
                <Link to="/" className="flex items-center">
                    <img src="/antonio.jpg" alt="Logo" className="mr-3 h-6 sm:h9 rounded-full"/>
                    <span className="self-center text-xl font-semibold text-white whitespace-nowrap">Antonio Malpica</span>
                </Link>
                <div className="flex md:order-2">
                    {
                        user 
                        ? (
                        <>
                        <NavLink to="/" className= {btnBlue} >Home</NavLink>
                        <NavLink to="/profile" className= {btnBlue} >My posts</NavLink>
                        <button onClick={handleClickLogout} className= {btnRed}>Logout</button>
                        </>)
                        : (
                        <>
                        <NavLink to="/register" className= {btnBlue}>Register</NavLink>
                        <NavLink to="/login" className= {btnBlue}>Login</NavLink>
                        </>)
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar