import { useState } from "react"
import { db, auth } from "../firebase"
import { collection, getDocs, query, where, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore/lite"
import { nanoid } from "nanoid"

export const useFirestore = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState({})

    const getData = async() => {
        try{
            setLoading(prev => ({...prev, getData: true}))
            const dataRef = collection(db, "urls")
            const q = query(dataRef, where("enabled", "==", true ))
            const querySnapshot = await getDocs(q)
            const dataDB = querySnapshot.docs.map((doc) => doc.data())
            setData(dataDB)
        }catch (error){
            setError(error.message)
        }finally{
            setLoading(prev => ({...prev, getData: false}))
        }
    }

    const getDataP = async() => {
        try{
            setLoading(prev => ({...prev, getData: true}))
            const dataRef = collection(db, "urls")
            const q = query(dataRef, where("uid", "==", auth.currentUser.uid))
            const querySnapshot = await getDocs(q)
            const dataDB = querySnapshot.docs.map((doc) => doc.data())
            setData(dataDB)
        }catch (error){
            setError(error.message)
        }finally{
            setLoading(prev => ({...prev, getData: false}))
        }
    }

    const addData = async(title, text) => {
        try{
            setLoading(prev => ({...prev, addData: true}))
            const newDoc = {
                enabled: true,
                nanoid: nanoid(6),
                text: text,
                title: title,
                uid: auth.currentUser.uid,
                email: auth.currentUser.email,
            }
            const docRef = doc(db, "urls", newDoc.nanoid)
            await setDoc(docRef, newDoc)
            setData([...data, newDoc])
        }catch (error){
            console.log(error)
            setError(error.message)
        }finally{
            setLoading(prev => ({...prev, addData: false}))
        }
    }

    const updateData = async(nanoid, newTitle, newText) => {
        try{
            setLoading(prev => ({...prev, [nanoid]: true}))
            const docRef = doc(db, "urls", nanoid)
            await updateDoc(docRef, {
                title: newTitle,
                text: newText,
            })
            setData(data.map(item => item.nanoid === nanoid ? ({
                ...item,
                title: newTitle,
                text: newText,
            }) : item))
        }catch (error){
            console.log(error)
            setError(error.message)
        }finally{
            setLoading(prev => ({...prev, [nanoid]: false}))
        }
    }

    const deleteData = async(nanoid) => {
        try{
            setLoading(prev => ({...prev, [nanoid]: true}))
            const docRef = doc(db, "urls", nanoid)
            await deleteDoc(docRef)
            setData(data.filter(item => item.nanoid !== nanoid))
        }catch (error){
            console.log(error)
            setError(error.message)
        }finally{
            setLoading(prev => ({...prev, [nanoid]: false}))
        }
    }
    
    return{
        data, 
        error, 
        loading,
        getData,
        getDataP,
        addData,
        updateData,
        deleteData,
    }
}