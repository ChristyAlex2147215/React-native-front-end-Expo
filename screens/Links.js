import React from 'react'
import {View,Text,SafeAreaView} from "react-native"
import { StatusBar } from 'expo-status-bar'
import Footer from '../components/nav/Footer'

const Links = () => {
  return (
    <>
    <StatusBar/>
    <SafeAreaView style={{flex:1}}>
    <Text>Links page</Text>
    
    {/* state.user.name */}
    {/* putting footer on the bottom */}
   <View style={{flex:1,justifyContent:"flex-end"}}>
      <Footer/>
   </View>
  </SafeAreaView>
   
   </>
  )
}

export default Links