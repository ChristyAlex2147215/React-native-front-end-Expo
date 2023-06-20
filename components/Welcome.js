import React from "react";
import { StyleSheet, Text, View } from 'react-native';


const Welcome =(props)=>
{
  return(
    <View>
      <Text>HEllo, {props.name}</Text>
    </View>
  )
}


export default Welcome