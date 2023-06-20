import React,{useContext, useState,useEffect} from 'react'
import {View,Text,SafeAreaView,ScrollView,Image,StyleSheet,TextInput,TouchableOpacity} from "react-native"
import { StatusBar } from 'expo-status-bar'
import Footer from '../components/nav/Footer'
import {AuthContext}  from "../context/AuthContext"
import UserInput from '../components/auth/UserInput'
import SubmitButton from '../components/auth/SubmitButton'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CircleLogo from '../components/auth/CircleLogo'

const Account = ({navigation}) => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [image,setImage]=useState(
    {
      url:"https://cdn.pixabay.com/photo/2023/04/15/17/19/cat-7928232_1280.png",
      public_id:""
    })
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [loading,setLoading]=useState("")
  const [editName,setEditName]=useState()
  const [editEmail,setEditEmail]=useState()
  //fetching the auth info from the context
  const [state,setState]=useContext(AuthContext)
  // console.log("Obtained context is:",state)

 useEffect(()=>
  {
    if(state)
    {
      const {name,email,image}=state?.user;
      setName(name);
      setEmail(email);
    }
  },[state])

  const handleSumbmit=async()=>
  {
    setLoading(true)
    
    if(!password)
    {
        alert("Password is mandatory")
        setLoading(false)
        return;
    }
    if(password !== confirmPassword)
    {
        alert("Passwords must match")
        setLoading(false)
        return;
    }
    try{
        console.log(password,confirmPassword,loading);
        console.log(axios.defaults.baseURL) 
        const {data}=await axios.put(`/update-password`,{email,password})
       if(data.error)
       {
        alert(data.error)
        setLoading(false)
       }
       else
       {
        console.log("password update success => ",data)
        alert("password update success")
        setState(data)
        //saving the data to the local storage
        //redirect to home on success
       }
        // redirect to home page
    }
    catch(err)
    {  
        console.log(err)
    }
  }

  const logOut=async()=>
  {
    setState({user:null,token:""})
    await AsyncStorage.removeItem("@auth")
  }
  const onEditName=(value)=>
  {
    console.log("editing name =>",value)
    setName(value)
  }
  const onEditEmail=(value)=>
  {
    console.log("editing email =>",value)
    setEmail(value)
  }
  const onPressEditName=()=>
  {
    setEditName(!editName)
  }
  const onPressEditEmail=()=>
  {
    setEditEmail(!editEmail)
  }

  return (
    <>
    <SafeAreaView style={{flex:1,marginTop:20}}>
    <ScrollView contentContainerStyle={{flex:1}}>
    {/* <Image source={require("../assets/animal_logo.png")} style={styles.logoImage}/> */}
    {/* Image componet from the components and auth */}
 <View >
 <CircleLogo>
      {image && image.url ? (
        <View style={{justifyContent:"center",alignItems:"center"}}>
        <Image source={{uri: image.url}} 
        style={{width:150,height:150,marginTop:20,borderRadius:200}}/>
        <FontAwesome5 name='camera' size={30} style={{top:-70,zIndex:99,alignSelf:"center",justifyContent:"center"}}/>
        </View>
        
      )
      :(<TouchableOpacity style={{justifyContent:"center",alignItems:"center",backgroundColor:"pink",width:150,height:150,borderRadius:200}}> 
        <FontAwesome5 name='camera' size={30} style={{alignSelf:"center",justifyContent:"center",}}/>
        </TouchableOpacity>
        ) }
    </CircleLogo>
    
 </View>
    <View style={{flexDirection:"row",alignSelf:"center",marginTop:15}}>
      {editName? (<Text>{state?.user?.name}</Text>):
      (<TextInput value={setName} onChangeText={onEditName} style={{backgroundColor:"lightgrey"}} placeholder='Enter your name here'/>)}
      <FontAwesome5 name="pen" style={{marginHorizontal:5,paddingTop:2}} onPress={onPressEditName}/>
    </View>
    <View style={{flexDirection:"row",alignSelf:"center",marginVertical:10}} onPress={()=>{onPressEditEmail}}>
      <Text>{state?.user?.email}</Text>
      <FontAwesome5 name="pen" style={{marginHorizontal:5,paddingTop:2}}/>
    </View>
    
    {/* state.user.name */}
    {/* putting footer on the bottom */}
    <UserInput 
            type="password" 
            name="password" 
            value={password} 
            state={setPassword}/>
    <UserInput 
            type="password" 
            name="confirm password" 
            value={confirmPassword} 
            state={setConfirmPassword}/>
    <SubmitButton title={"Update Password"} bgcolor={"lightgrey"} handleSubmit={handleSumbmit} loading={loading} width={"70%"} />
    <SubmitButton title={"SignOut"} bgcolor={"lightgrey"} handleSubmit={logOut} loading={loading} width={"70%"}/>
    {/* fixing footer on the bottom of screen */}
   <View style={{flex:1,justifyContent:"flex-end"}}>
      <Footer/>
   </View>
  </ScrollView>
  </SafeAreaView>
   </>
  )
}

const styles=StyleSheet.create(
  {
    logoImage:{
      width:"40%",
      height:130,
      alignSelf:"center",
      borderRadius:300,
      borderWidth:1,
      borderColor:"black"
    },
    centerAlign:{
      alignSelf:"center",
      marginTop:15
    }

  }
)
export default Account