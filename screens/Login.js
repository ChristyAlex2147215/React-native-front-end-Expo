import React,{useState,useEffect, useContext} from "react";
import { Text, View, StyleSheet,TextInput, TouchableOpacity,Image,ActivityIndicator,ScrollView } from "react-native";
import UserInput from "../components/auth/UserInput";
import { Modal } from "react-native-modal";
import { BlurView } from "@react-native-community/blur";
import axios from "axios"
import SubmitButton from "../components/auth/SubmitButton";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../context/AuthContext";

export const ScreeenLoader = (props) => {
    console.log("Calling the screen loader");
    return (
      <Modal isVisible={props.loading} backdropOpacity={1} backdropColor="transparent" style={styles.modal}>
        <BlurView style={styles.blurView} blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white">
          <ActivityIndicator size="large" color="blue" style={{ justifyContent: "center", alignContent: "center", alignItems: "center", alignSelf: "center" }} />
        </BlurView>
      </Modal>
    );
  };
  

const Signup = (props) => {
    const [email,SetEmail]=useState("")
    const [password,SetPassword]=useState("")
    const [loading,SetLoading]=useState(false)
    const navigation=useNavigation()
    const [state,setState]=useContext(AuthContext)

    useEffect(() => {
        // Simulate loading process
        setTimeout(() => {
            SetLoading(false);
            console.log("Change in SetTimeout")
        }, 2000);
      }, [loading]);

      const goSignup=()=>
    {
      navigation.navigate("Signup")
    }   
      const goFp=()=>
    {
      navigation.navigate("ForgotPassword")
    }   

      const handleSumbmit=async()=>
      {
        SetLoading(true)
        if( !email || !password)
        {
            alert("All fields are mandatory")
            SetLoading(false)
            return;
        }
        try{
            console.log(email,password,loading);
            console.log(axios.defaults.baseURL) 
            const {data}=await axios.post(
            `/signin`,
            {email,password})
           if(data.error)
           {
            alert(data.error)
            SetLoading(false)
           }
           else
           {
            console.log("signin success => ",data)
            alert("sign up success")
            let reposeData=JSON.stringify(data)
            console.log("Stringified login response data is=>",reposeData)
            setState(reposeData)
            //saving the data to the local storage
            try
            {
              await AsyncStorage.setItem('@auth', reposeData)
            }
            catch(e)
            {
              console.log("Erroe occured to save the data in to the Async storage")
            }
            //redirect to home on success
            navigation.navigate("Home")
           }
            // redirect to home page
        }
        catch(err)
        {  
            console.log(err)
        }
      }

  return (
    <KeyboardAwareScrollView 
    contentContainerStyle={{ flex: 1, flexDirection: 'row', width: "100%", justifyContent: "flex-start", marginTop: 30,alignItems:"center" }}>
       <View style={{flexDirection:"column",width:"100%",flex:1}}>
            <Image source={require("../assets/animal_logo.png")} style={styles.logoImage}/>
                <Text style={styles.SignupText}>
                    {"SignIn!"}
                </Text>
            <UserInput 
            type="text" 
            name="Email" 
            value={email} 
            state={SetEmail}/>
            <UserInput 
            type="password" 
            name="Password" 
            value={password} 
            state={SetPassword}/>
            <SubmitButton title={"SignIn!"} bgcolor={"red"} handleSubmit={handleSumbmit} loading={loading} />
            <Text style={{textAlign:"center",fontSize:16,marginTop:16}}>
                Don't have an account ?  
            <Text style={{color:"red"}}
            onPress={goSignup}
            > SignUp</Text></Text>
            <Text style={{textAlign:"center",marginTop:16}} onPress={goFp}>
              Forgot Password?
            </Text>
        </View>
       {/* {loading && <ScreeenLoader loading={loading}/>} */}
       
    </KeyboardAwareScrollView>
  )
  
}

const styles=StyleSheet.create({
    SignupText:{fontSize:24,textAlign:"center"},
    contentView:{width:"100%",alignItems:"flex-start",marginHorizontal:16},
    name:{justifyContent:"flex-start", 
        fontSize:16,
        color:"grey",
        alignSelf:"flex-start"},
        logoImage: {
            width:300, // Specify the desired width
            height:200,    // Specify the desired height
            alignSelf:"center",
            resizeMode:"stretch",
            marginVertical:30,

          }, modal: {
            flex: 1,
            width:"100%",
            margin: 0,
            alignItems: "center",
            justifyContent: "center",
          },
          blurView: {
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          },
          container: {
            alignItems: "center",
            justifyContent: "center",
          },

})

export default Signup