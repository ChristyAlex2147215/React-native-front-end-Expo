import React from 'react'
import {View,Text,Image} from "react-native"

const CircleLogo = ({children}) => {
  return (
    <View style={{
        justifyContent:"center",
        alignItems:"center"
    }}>
        {
        children? (children)
        :
        <Image source={require("../../assets/animal_logo.png")}
        style={{width:150,height:150,borderRadius:200}}/>

        }
    </View>
  )
}

export default CircleLogo