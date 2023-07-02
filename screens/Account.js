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
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import { set } from 'mongoose'

const Account = ({navigation}) => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  //for the image fetched from the database
  const [image,setImage]=useState(
    {
      url:"",
      public_id:""
    })
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [loading,setLoading]=useState("")
  const [editName,setEditName]=useState(false)
  const [editEmail,setEditEmail]=useState()
  //fetching the auth info from the context
  const [state,setState]=useContext(AuthContext)
  // console.log("Obtained context is:",state)
  //for the image to upleaded
  const [uploadImage,setUploadImage]=useState("")
  const [role,setRole]=useState("")
  


 useEffect(()=>
  {
    if(state)
    {
      console.log("context data inthe app is =>",state)
      let Name=state?.user.name;
      let Email=state?.user.email;
      let Image=state?.user.image;
      let Role=state?.user.role;
      setName(Name);
      setEmail(Email);
      setImage(Image)
      setRole(Role)
      console.log(Name)
      console.log(Email)
      console.log(Image)
      console.log(Role)
    }
  },[state,image])

  // const handleImageUpload=async()=>
  // {
  //   console.log("Get ready to chooose an image as profile picture")
  //   let permissionResult=await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   console.log("permissoions from the user for media=>",permissionResult)
  //   if(permissionResult.granted===false)
  //   {
  //     alert("Media access Permission required")
  //     return
  //   }
  //   else{
  //     let pickerImageResult=await ImagePicker.launchImageLibraryAsync(
  //       {allowsEditing:true,
  //       aspect:[4,3],
  //       base64:true,

  //       }
  //       );
  //       if(pickerImageResult.canceled==true)
  //       {
  //         return;
  //       }
  //       console.log("Image Picker Result=>",pickerImageResult)
  //       let base64Image=`data:image/jpg;baser64,${pickerImageResult.base64}`
  //       setUploadImage(base64Image)
  //       //handle the upload in server
  //        const data=await axios.post("/upload-image",{"image":base64Image,"email":email});
  //        if(!data)
  //        {
  //         console.log("Failed in uploading the file")
  //        }

  //   }
    
  // }

  //curret function under debugging
  const handleImageUpload = async () => {
    // console.log("Get ready to choose an image as a profile picture");
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // console.log("Permissions from the user for media:", permissionResult);
    if (permissionResult.granted === false) {
      alert("Media access permission required");
      return;
    } 
    else {
      let pickerImageResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
      });
      if (pickerImageResult.canceled === true) {
        return;
      }
      // console.log("Image Picker Result:", pickerImageResult);
      let base64Image = `data:image/jpg;base64,${pickerImageResult.base64}`;
      // setUploadImage(base64Image);
      // Handle the upload in the server
      // let token= state && state.token ? state.token:""
      try {
        const response = await axios.post("/upload-image", 
        {
          image: base64Image,
        }
        // {
        //   headers:{
        //   Authorization:`Bearer ${token}`
        //           }
        // }
        )

        // console.log("Image upload response =>", JSON.stringify(response));
        // console.log("Image upload response data =>", JSON.stringify(response.data));
        // console.log("Image upload response data of user=>", JSON.stringify(response.data.updateUser));
        // console.log("Image upload response data of user img=>", JSON.stringify(response.data.updateUser.image));
        // const user_data=response.data.updateUser
        // setImage({url:user_data.image.url,public_id:user_data.image.public_id})
        //update the context after the image is uploaded succesfully
        // const tUser=JSON.parse( await AsyncStorage.getItem("@auth"))
        // tUser.user=response.data.updateUser
        // console.log("updating the state image alone now =>",tUser)
        // state.user.image.url=response.data.updateUser.image.url
        // state.user.image.public_id=response.data.updateUser.image.public_id
        //new cod ehre
        const updatedState = {
          ...state,
          user: {
            ...state.user,
            image: {
              ...state.user.image,
              url:response.data.updateUser.image.url,
              public_id: response.data.updateUser.image.public_id
            }
          }
        };
        setState(updatedState)
        
        // await AsyncStorage.setItem("@auth",JSON.stringify(updatedState))
        //changing the state after the image updated
        // setState({...state,user:response})
        //cahnging the image state
        // console.log("response url is =>",response.data.updateUser.image.url)
        // console.log("response public id =>",response.data.updateUser.image.public_id)
        // setImage( {
        //   url:state.user.image.url,
        //   public_id:state.user.image.public_id
        // })
        console.log("Image upload response is=>", response.data.updateUser)
        console.log("After image upload state now is =>", updatedState)
        console.log("After image upload state image now is =>",image)
        // setState({...state.user.image,url:response.data.updateUser.image.url,public_id:response.data.updateUser.image.url})
        setImage(
          {
            url:updatedState.user.image.url,
            public_id:updatedState.user.image.public_id

          }
        )
        await AsyncStorage.setItem("@auth",JSON.stringify(updatedState))
        // setState({...state.user.image,url:response.data.updateUser.image.url})
        alert("Image have saved succesfully")
        //end of the image upload here


        }
       catch (error) {
        console.error("Failed to upload the file:", error);
      }
    }
  };
  


  //not in use now
  // const pickImageAsync = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     console.log("Image choose result is=>",result);
  //     setUploadImage(result.uri)
  //     setImage({...Image,url:result.uri})
  //     //upload the image to the server
  //     // const data=await axios.post("/upload-image",{image:result.uri,email:email});
  //     try {
  //       const formData = new FormData();
  //       formData.append("image", {
  //         uri: result.uri,
  //         name: "image.jpg", // Provide a desired file name here
  //         type: "image/jpeg", // Adjust the file type based on your requirements
  //       });
  //       formData.append("email", "example@example.com");
  //       console.log("form data is=>",formData.image)
  //       console.log("form data is=>",formData.email)
  
  //       const response = await axios.post("/upload-image",formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  
  //       console.log("Image upload response =>", response);
  
  //       // Update the context or perform any other necessary actions with the response
  //     } catch (error) {
  //       console.error("Image upload error =>", error);
  //     }
  //     // console.log("image upload response =>",data)
  //     //update the context user info
    

  //   } else {
  //     alert('You did not select any image.');
  //   }
  // };

  //for the update password functionality
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
        const {data}=await axios.put(`/update-password`,{password})
       if(data.error)
       {
        alert(data.error)
        setLoading(false)
       }
       else
       {
        console.log("password update success => ", data)
        alert("password update success")
        // setState(data)
        //saving the data to the local storage
        //redirect to home on success
       }
        // redirect to home page
        setLoading(false)
    }
    catch(err)
    {  
        console.log(err)
    }
  }

  //fot chnaging the password of the accoount
  const updatePassword=()=>
  {
    //code to change the user password from account page
    if(password!==confirmPassword)
    {
      alert("Passwords dosent match!")
      return
    }
   try
   {
    const data=axios.put("/update-password",{password})
    if(data.status==="fail")
    {
      console.log("update failed")
    }
   }
   catch(e)
   {
    console.log("An error occures when updating password.")
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
      {(image && image.url) || state.user.image? (
        <View style={{justifyContent:"center",alignItems:"center"}}>
        <Image source={{uri: image.url}} 
        style={{width:150,height:150,marginTop:20,borderRadius:200,backgroundColor:"lightblue"}}/>
        <FontAwesome5 name='camera' size={30} style={{top:-70,zIndex:99,alignSelf:"center",justifyContent:"center"}} onPress={handleImageUpload}/>
        </View>
        
      )
      :(<TouchableOpacity style={{justifyContent:"center",alignItems:"center",backgroundColor:"pink",width:150,height:150,borderRadius:200}}> 
        <FontAwesome5 name='camera' size={30} style={{alignSelf:"center",justifyContent:"center",}} onPress={handleImageUpload}/>
        </TouchableOpacity>
        ) }
    </CircleLogo>
    
 </View>
    <View style={{flexDirection:"row",alignSelf:"center",marginTop:15}}>
     <Text>{name || ""}</Text>
     {/* (<TextInput value={name? name:""} onChangeText={onEditName} style={{backgroundColor:"lightgrey"}} placeholder='Enter your name here'/>) */}
      <FontAwesome5 name="pen" style={{marginHorizontal:5,paddingTop:2}} onPress={onPressEditName}/>
    </View>
    <View style={{flexDirection:"row",alignSelf:"center",marginVertical:10}} onPress={()=>{onPressEditEmail}}>
      <Text>{email || ""}</Text>
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