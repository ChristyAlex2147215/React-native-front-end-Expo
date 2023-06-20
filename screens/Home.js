import React,{useContext, useState} from 'react'
import { View,Text,SafeAreaView } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { StatusBar } from 'expo-status-bar'
import Footer from "../components/nav/Footer"

const Home = () => {
    const [state,setState]=useContext(AuthContext)
    console.log("state from the home is :",JSON.stringify(state))
  return (
    <>
     <StatusBar/>
     <SafeAreaView style={{flex:1}}>
     <Text>Welcome Home,{"User"}</Text>
     
     {/* state.user.name */}
     {/* putting footer on the bottom */}
    <View style={{flex:1,justifyContent:"flex-end"}}>
       <Footer/>
    </View>
   </SafeAreaView>
    
    </>
   
  )
}

export default Home