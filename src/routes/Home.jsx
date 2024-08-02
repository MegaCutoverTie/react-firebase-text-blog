import { useEffect } from "react"
import { useFirestore } from "../hooks/useFirestore"


import { auth } from "../firebase"

import Title from "../components/Title"

const Home = () => {
    const {data, error, loading, getData,} = useFirestore()

    useEffect(() => {
        getData()
    }, [])

    if(loading.getData) return <p>Loading data...</p>
    if(error) return <p>{error}</p> 

    console.log(auth.currentUser.email)

    return(
        <div className="container pt-3 h-full">

        <Title text={"All posts"}/>

        {
            data.map(item => (
                <div key={item.nanoid} className="m-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <span className="flex">
                        <img src="/user.svg" alt="" className="w-4 mr-2"/>
                        <p>{item.email}:</p>
                    </span>
                    <p className="text-xl font-semibold border-b-2 border-gray-400 mt-2 pb-1">{item.title}</p>
                    <p className="text-md pt-1">{item.text}</p>
                </div>
            ))
        }
        </div>
    )
}

export default Home