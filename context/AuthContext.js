import React,{useState,useEffect,createContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { IP } from "../config";
import { useNavigation } from "@react-navigation/native";

const AuthContext=createContext()

const AuthProvider = ({children}) => {
    const [state,setState]=useState({user:null,token:""})
    // setting the base url of the axios to the IP address
    axios.defaults.baseURL=IP
    const navigation=useNavigation()
    const token=state && state.token ? state.token:""
    axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
    //hadle when the token expired or 401 error
    // when token expires after 7d the user need to login agian to get a new user so we clean the context and Async storage
    
    axios.interceptors.response.use(
      async function (response) {
        return response;
      },
      async function (error) {
        let res = error.response;
        if (res?.status === 401 && res.config && !res.config.__isRetryRequest) {
          await AsyncStorage.removeItem("@auth");
          setState({ user: null, token: "" });
          navigation.navigate("Login");
        }
        return Promise.reject(error);
      }
    );
    

    useEffect(
        ()=>
        {
            const loadFromAsyncStorage=async()=>
            {
               let data=await AsyncStorage.getItem('@auth')
               let processed_data=JSON.parse(data)
               console.log("user data  from AUth context are =>",JSON.stringify(processed_data?.user))
               console.log("token data from AUth context are =>",processed_data?.token)
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