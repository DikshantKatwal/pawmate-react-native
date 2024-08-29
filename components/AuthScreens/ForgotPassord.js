import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
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
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const loadFonts = () => {
  return Font.loadAsync({
    CustomFont: require("../../assets/fonts/RobotoCondensed-VariableFont_wght.ttf"),
    Medium: require("../../assets/fonts/static/RobotoCondensed-Medium.ttf"),
    SemiBold: require("../../assets/fonts/static/RobotoCondensed-SemiBold.ttf"),
    Bold: require("../../assets/fonts/static/RobotoCondensed-Bold.ttf"),
  });
};

const ForgotPassword = ({ route, navigation }) => {
  const { forgot_password } = useContext(AuthContext);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
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

  const NavigationLogin = () => {
    navigation.navigate("LoginScreen");
  };
  
  const handle_forgot_password = async  (email) => {
    FPstatus = await forgot_password(email);
    if (FPstatus === true) {
      navigation.navigate("LoginScreen");
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
              Enter your email
            </Text>
            <View className="w-full relative justify-center mt-5 ">
              <TextInput
                style={styles.TextInput}
                className="w-full"
                placeholder="email"
                keyboardType="default"
                value={email} onChangeText={setEmail}
              />
            </View>
            <View className=" w-full pt-10 items-center">
              <TouchableOpacity
                style={styles.loginbtn}
                className=" w-1/2 rounded-lg p-2 shadow-sm shadow-black"
                    onPress={() =>  {handle_forgot_password(email);}
                }
              >
                <Text style={styles.text} className="text-center">
                  Apply
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className=" w-full mt-4"
                onPress={() => {
                  NavigationLogin();
                }}
              >
                <Text className="text-center text-sm">
                  Already have an account?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ForgotPassword;

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
    marginTop: 20,
    width: "100%",
    padding: 8,
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

    paddingVertical: 12,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "white",
    fontFamily: "SemiBold",
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
