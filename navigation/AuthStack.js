import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../components/AuthScreens/LoginScreen';
import SignUpScreen from '../components/AuthScreens/SignUpScreen';
import OTPScreen from '../components/AuthScreens/OTPScreen';
import ForgotPassword from '../components/AuthScreens/ForgotPassord';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
  <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown:false}}/>  
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}}/>
        <Stack.Screen name="OTPScreen" component={OTPScreen} options={{headerShown:false}}/>              
  </Stack.Navigator>
);
}

export default AuthStack