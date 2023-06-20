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
    const [name,SetName]=useState("")
    const [email,SetEmail]=useState("")
    const [password,SetPassword]=useState("")
    const [loading,SetLoading]=useState(false)
    const nagivation=useNavigation()
    const [state,setState]=useContext(AuthContext)

    useEffect(() => {
        // Simulate loading process
        setTimeout(() => {
            SetLoading(false);
            console.log("Change in SetTimeout")
        }, 2000);
      }, [loading]);
    
    const goLogin=()=>
    {
      nagivation.navigate("Login")
    }   

      const handleSumbmit=async()=>
      {
        SetLoading(true)
        if(!name || !email || !password)
        {
            alert("All fields are mandatory")
            SetLoading(false)
            return;
        }
        try{
            console.log(name," ,",email," ,",password," ,",loading); 
            const {data}=await axios.post(
            `/signup`,
            {"name":name,"email":email,"password":password})
           
            if(data.error)
            {
              alert(data.error)
              SetLoading(false)
            }
            else
            {
              console.log("signin success => ",data)
              alert("sign up success")
              setState(data)
            //saving the data to the local storage
            try
            {
              await AsyncStorage.setItem('@auth', data)
            }
            catch(e)
            {
              console.log("Erroe occured to save the data in to the Async storage")
            }
              // redirect to home page on sucess
              nagivation.navigate("Home")
            }
           
        }
        catch(err)
        {  
            console.log(err)
        }
      }

  return (
    <KeyboardAwareScrollView 
    contentContainerStyle={{ flex: 1, flexDirection: 'row', width: "100%", justifyContent: "flex-start",alignItems:"center",position:"absolute",marginTop:10 }}>
       <View style={{flexDirection:"column",width:"100%",flex:1}}>
            <Image source={require("../assets/animal_logo.png")} style={styles.logoImage}/>
                <Text style={styles.SignupText}>
                    {"SignUp!"}
                </Text>
            <UserInput
                type="text" 
                name="Name" 
                value={name} 
                state={SetName} 
                autoCapitalize="words"/>
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
            <SubmitButton title={"SignUp!"} bgcolor={"red"} handleSubmit={handleSumbmit} loading={loading} />
            <Text style={{textAlign:"center",fontSize:16,marginTop:16}}>
                Already have an account ?  
            <Text style={{color:"red"}} onPress={goLogin}> Login</Text></Text>
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