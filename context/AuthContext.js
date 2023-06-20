import React,{useState,useEffect,createContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { IP } from "../config";

const AuthContext=createContext()

const AuthProvider = ({children}) => {
    const [state,setState]=useState({user:null,token:""})
    // setting the base url of the axios to the IP address
    axios.defaults.baseURL=IP


    useEffect(
        ()=>
        {
            const loadFromAsyncStorage=async()=>
            {
               let data=await AsyncStorage.getItem('@auth')
               let processed_data=JSON.parse(data)
               setState({...state,user:processed_data.user,token:processed_data.token})
            }
           loadFromAsyncStorage();
        },[])
  return (
    <AuthContext.Provider value={[state,setState]}>
        {children}
    </AuthContext.Provider>
  )
}

export {AuthContext,AuthProvider}