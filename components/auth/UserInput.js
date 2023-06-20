import React,{useState} from 'react'
import { Text, View, StyleSheet,TextInput } from "react-native";

const UserInput = (props) => {

    const onChangeValue=(value)=>
    {
        props.state(value)
        // console.log(value)
    }
  return (
    <View style={styles.contentView}>
    <Text style={styles.name}>{props.name}</Text>
    <TextInput 
    keyboardType={props.keyboardType || 'default'}
    autoCapitalize='words'
    onChangeText={(e)=>onChangeValue(e)}
    autoCorrect={props.autoCorrect || false}
    value={props.value}
    secureTextEntry={props.type==="password" ? true:false}
    style={{
        borderBottomWidth:.5,
        height:48,
        borderBottomColor:"#8e93a1",
        width:"100%",
        alignSelf:"flex-start",
    }}></TextInput>
</View>
  )
}

const styles=StyleSheet.create({
    SignupText:{fontSize:24,textAlign:"center"},
    contentView:{width:"100%",alignItems:"flex-start",marginHorizontal:8,
marginBottom:16},
    name:{ 
        fontSize:16,
        color:"grey",
        alignSelf:"flex-start"}

})
export default UserInput