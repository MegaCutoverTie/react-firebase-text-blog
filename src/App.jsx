import { Routes, Route } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "./context/UserProvider"

import Home from "./routes/Home"
import Login from "./routes/Login"
import Register from "./routes/Register"
import Profile from "./routes/Profile"
import NotFound from "./routes/NotFound"

import Navbar from "./components/Navbar"
import RequireAuth from "./components/RequireAuth"
import FormLayout from "./components/FormLayout"
import Footer from "./components/Footer"

const App = () => {
  const {user} = useContext(UserContext)

  if(user === false) return <p>Loading...</p>

  return (
    <>
    <Navbar></Navbar>
    
    <Routes>
      <Route path="/" element={<RequireAuth />}>
        <Route index element={<Home />}/>
        <Route path="/profile" element={<Profile />}/>
      </Route>
      <Route path="/" element={<FormLayout />}>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Route>
      <Route path="*" element={<NotFound />}/>
    </Routes>
    
    {/* <Footer /> */}
    </>
  )
}

export default App