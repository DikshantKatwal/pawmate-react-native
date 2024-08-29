import React, { useState, useEffect,useRef ,  useLayoutEffect, useContext } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import * as Font from "expo-font";

const loadFonts = () => {
  return Font.loadAsync({
    CustomFont: require("../../assets/fonts/RobotoCondensed-VariableFont_wght.ttf"),
    Medium: require("../../assets/fonts/static/RobotoCondensed-Medium.ttf"),
    SemiBold: require("../../assets/fonts/static/RobotoCondensed-SemiBold.ttf"),
    Bold: require("../../assets/fonts/static/RobotoCondensed-Bold.ttf"),
  });
};

const OTPScreen = ({ route, navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputs = useRef([]);
  const { verify_otp, resend_otp } = useContext(AuthContext);
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
  

  const handleOtpChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < otp.length - 1) {
        otpInputs.current[index + 1].focus();
      }
      
      // Check if all fields are filled
      if (newOtp.every(num => num !== '')) {
        const finalOtp = newOtp.join('');
        verify_otp(finalOtp)
      }
    }
  };


  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && index > 0 && otp[index] === '') {
      otpInputs.current[index - 1].focus();
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/4.png")} // Update the image path
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.title} className="text-center">
              PAWMATE
            </Text>
            <Text  className="text-center">
              Check your email for otp
            </Text>

            <View className="w-full relative justify-center flex-row mt-5">
            {otp.map((value, index) => (
          <TextInput
            key={index}
            style={styles.TextInput}
            className="w-11"
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleOtpChange(index, text)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
            ref={(input) => { otpInputs.current[index] = input; }}
          />
        ))}
        
            </View>
            <TouchableOpacity className=' w-30 mt-5'
          onPress={resend_otp}
        ><Text className='text-center text-sm'>Resend</Text>
        </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor:'black',
    alignItems: "center",
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
    height:'80%',
    padding: 8,
    paddingBottom:60,
  },
  title: {
    fontSize: 29,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Bold",
  },
  text: {
    fontFamily: "light",
    fontSize: 30,
  },

  TextInput: {
    paddingHorizontal: 16,
    marginHorizontal:5,
    paddingVertical: 12,
    fontSize: 16,
    borderRadius: 8,
    fontFamily: "SemiBold",
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
    alignSelf: "flex-end",
    marginBottom: 10,
  },

  loginbtn: {
    backgroundColor: "white",
  },
});
