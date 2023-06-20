import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from "../../components/Welcome"
import { WebView } from 'react-native-webview';
import Signup from '../../screens/Signup'; 
import Login from "../../screens/Login"
import ForgotPassword from "../../screens/ForgotPasswod"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AuthProvider,AuthContext} from "../../context/AuthContext"
import Home from '../../screens/Home';
import { useContext } from 'react';
import HeaderTabs from './HeaderTabs';
import Account from '../../screens/Account';
import Post from '../../screens/Post';
import Links from '../../screens/Links';

const Stack = createNativeStackNavigator();

function ScreensNav() {
    const [state,setState]=useContext(AuthContext)
    const isAuthenticated=state && state.token!=="" && state.user !==null
    console.log("AUthenticated=>",isAuthenticated)
  return (
   
      <Stack.Navigator
      initialRouteName='Home'
    //   screenOptions={{headerShown:true}}
      >
        {/* changed to directly load home page */}
        {isAuthenticated ? (
        <>
        <Stack.Screen name="Home" component={Home} 
        options=
        {{
            title:"Home Page",
            headerRight:()=><HeaderTabs/>}} />
        <Stack.Screen name="Account" component={Account}  
            options=
        {{
            title:"Accounts Page",
            headerBackTitle:"Go Back",
            headerRight:()=><HeaderTabs/>}}/>
        <Stack.Screen name="Post" component={Post}  
            options=
        {{
            title:"Post Page",
            headerBackTitle:"Go Back",
            headerRight:()=><HeaderTabs/>}}/>
        <Stack.Screen name="Links" component={Links}  
            options=
        {{
            title:"Links Page",
            headerBackTitle:"Go Back",
            headerRight:()=><HeaderTabs/>}}/>
          </>
            ):
        (<>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>) }
       
        
      </Stack.Navigator>
  );
}

export default ScreensNav;