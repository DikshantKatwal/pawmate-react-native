import React, { useState, useEffect , useLayoutEffect, useContext } from 'react';
import { Button, SafeAreaView, Text, Image, StyleSheet,Keyboard ,Platform,TouchableWithoutFeedback,KeyboardAvoidingView , TouchableOpacity,ImageBackground , TextInput, View, ActivityIndicator, Alert } from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';

import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
const loadFonts = () => {
  return Font.loadAsync({
    'CustomFont': require('../../assets/fonts/RobotoCondensed-VariableFont_wght.ttf'),
    'Medium': require('../../assets/fonts/static/RobotoCondensed-Medium.ttf'),
    'SemiBold': require('../../assets/fonts/static/RobotoCondensed-SemiBold.ttf'),
    'Bold': require('../../assets/fonts/static/RobotoCondensed-Bold.ttf'),
    'light': require('../../assets/fonts/static/RobotoCondensed-Light.ttf'),
  
  });
};


const LoginScreen = ({ route, navigation }) => {
  const { login } = useContext(AuthContext);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const loadAsyncFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };
    loadAsyncFonts();
  }, []);

 

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const NavigationSignUp = () => {
    navigation.navigate('SignUpScreen');
  };
  
  

  const NavigationForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const { duration, easing, endCoordinates } = this._keyboardEvent || {};

if (Platform.OS === 'ios' && duration === 0 && !!this.props.ignoreIOSKeyboardWillChangeEvents) {
    return;
}

  return (
    <ImageBackground
    source={require('../../assets/4.png')} // Update the image path
    style={styles.background}
    resizeMode="cover"
  >
    <SafeAreaView className='flex-1 '>
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner} className=' items-center justify-center w-full h-full'>
          <Text style={styles.title} className='text-center'>PAWMATE</Text>
          <TextInput style={styles.TextInput} className='w-full' placeholder="Username" keyboardType="default" value={username} onChangeText={setUsername} textContentType='oneTimeCode'/>
          <View className='w-full relative justify-center mt-2'>
            
              <TextInput style={styles.TextInput}  className='w-full relative' placeholder="Password" keyboardType="default" value={password} onChangeText={setPassword} secureTextEntry={!passwordVisible} textContentType='oneTimeCode' />
              <TouchableOpacity className='absolute right-3 bottom-5 ' onPress={togglePasswordVisibility}>
                {passwordVisible ? (<EyeIcon size={25} color="black" />) : (<EyeSlashIcon size={25} color="black" /> )}
              </TouchableOpacity>
            </View>
          
          <TouchableOpacity style={styles.forgotpassword} className='w-3/6'
          onPress={() =>  {NavigationForgotPassword();}}
        ><Text className='text-right text-sm'>Forgot Password?</Text></TouchableOpacity>
          <TouchableOpacity style={styles.loginbtn} className=' w-1/2 rounded-lg p-2 shadow-sm shadow-black'
          onPress={() =>  {login(username, password);}}
        ><Text style={styles.text} className='text-center'>LOG IN</Text>
          
        </TouchableOpacity>
      
        
        <TouchableOpacity className=' w-60 mt-5'
          onPress={() =>  {NavigationSignUp();}}
        ><Text className='text-center text-sm'>Create a new account?</Text>
        </TouchableOpacity>
 


        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </SafeAreaView>
  </ImageBackground>
    
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    marginTop: 20,
    width: '100%',
    padding:10,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: "Bold",
  },
  text:{
    fontFamily:'light',
    fontSize: 30, 
  },
  TextInput:{
    paddingHorizontal: 16,

    paddingVertical: 12,
    fontSize: 16,
    borderRadius: 8,
    fontFamily: "CustomFont",
    backgroundColor: "white",
    marginBottom: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },



  forgotpassword: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },

  loginbtn:{
    backgroundColor: "white",
  },
});