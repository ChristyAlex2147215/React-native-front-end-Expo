import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AuthProvider} from "./context/AuthContext"
import ScreensNav from './components/nav/ScreensNav';

const Navigation = () => {
  return (
    <NavigationContainer>
        <AuthProvider>
            <ScreensNav/>
        </AuthProvider>
    </NavigationContainer>
  )
   
}

export default Navigation