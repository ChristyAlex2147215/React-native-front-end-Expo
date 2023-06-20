import React,{useState} from 'react'
import { View,TouchableOpacity,Text } from 'react-native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { useNavigation,useRoute } from '@react-navigation/native'
import { Divider } from '@rneui/themed';

const FooterTab=({name,title,submit,routeName})=>
{
    const activeScreenColor= routeName===title && "orange"
    return(
        <TouchableOpacity onPress={submit}>
            <FontAwesome5 name={name} size={30} style={{alignSelf:"center"}} color={activeScreenColor}/>
            <Text style={{color:activeScreenColor}}>{title}</Text>
        </TouchableOpacity>

    )

}

const Footer = () => {
    const navigation=useNavigation()
    const route=useRoute()
    // console.log("Route is =>",route)


  return (
   <>
   <Divider width={2}/>
    <View style={{flexDirection:"row",justifyContent:"space-around",marginVertical:10}}>
        <FooterTab 
        name="home" 
        title="Home" 
        submit={()=>navigation.navigate("Home")}
        routeName={route.name}
        />
        <FooterTab 
        name="plus-square" 
        title="Post" 
        submit={()=>navigation.navigate("Post")}
        routeName={route.name}
        />
        <FooterTab 
        name="list-ol" 
        title="Links" 
        submit={()=>navigation.navigate("Links")}
        routeName={route.name}
        />
        <FooterTab 
        name="user" 
        title="Account" 
        submit={()=>navigation.navigate("Account")}
        routeName={route.name}
        />

    </View>
    </>
  )
}

export default Footer