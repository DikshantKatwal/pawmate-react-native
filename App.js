import * as React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNav from './navigation/AppNav';
import { AuthProvider } from './context/AuthContext';

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <AuthProvider>
        <AppNav/>
        </AuthProvider>
       
      );
} 