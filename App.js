import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreensNav from './components/nav/ScreensNav';
import Navigation from './navigation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    // stack navigator componet
    <Navigation/>
  );
}

export default App;