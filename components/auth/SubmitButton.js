import React from 'react'
import { Text, View, TouchableOpacity} from "react-native";

const SubmitButton = ({title,handleSubmit,bgcolor="lightgrey",loading,width}) => {
  return (
    <TouchableOpacity style={{backgroundColor:bgcolor, alignSelf:"center",width:width || 100,height:40,borderRadius:15,borderWidth:1, marginTop:20}}
    onPress={handleSubmit}>
     <Text style={{fontSize:24, textAlign:"center",fontWeight:400,color:"black"}}>
        {loading? "Plase wait":title}
     </Text>
    </TouchableOpacity>
  )
}

export default SubmitButton