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

const SignUpScreen = ({ route, navigation }) => {
  const { signup } = useContext(AuthContext);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [repassword, setRepassword] = useState("");
  const [password, setPassword] = useState("");
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
  const NavigationLogin = () => {
    navigation.navigate("LoginScreen");
  };

  const HandleSignup = async  (username, email, password, repassword) => {
    signupstatus = await signup(username, email, password, repassword);
    if (signupstatus === true) {
      navigation.navigate("OTPScreen");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/pawmate/5.png")} // Update the image path
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.title} className="text-center">
              PAWMATE
            </Text>

            <View className="w-full relative justify-center mt-5 ">
              <TextInput
                style={styles.TextInput}
                className="w-full"
                placeholder="Username"
                keyboardType="default"
                value={username} onChangeText={setUsername}
              />
              <TextInput
                style={styles.TextInput}
                className="w-full"
                placeholder="Email"
                keyboardType="default"
                value={email} onChangeText={setEmail}
              />
              <TextInput
                style={styles.TextInput}
                className="w-full relative"
                placeholder="Password"
                keyboardType="default"
                secureTextEntry={!passwordVisible}
                value={password} onChangeText={setPassword}
              />
              <TouchableOpacity
                className="absolute right-3 bottom-5 "
                onPress={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <EyeIcon size={25} color="black" />
                ) : (
                  <EyeSlashIcon size={25} color="black" />
                )}
              </TouchableOpacity>
            </View>
            <View className="w-full relative justify-center">
              <TextInput
                style={styles.TextInput}
                className="w-full relative"
                placeholder="Re-Password"
                keyboardType="default"
                secureTextEntry={!passwordVisible}
                value={repassword} onChangeText={setRepassword}
              />
              <TouchableOpacity
                className="absolute right-3 bottom-5 "
                onPress={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <EyeIcon size={25} color="black" />
                ) : (
                  <EyeSlashIcon size={25} color="black" />
                )}
              </TouchableOpacity>
            </View>
            <View className=" w-full pt-10 items-center">
              <TouchableOpacity
                style={styles.loginbtn}
                className=" w-1/2 rounded-lg p-2 shadow-sm shadow-black"
                onPress={() => {
                  HandleSignup(username, email, password, repassword);
                }}
              >
                <Text style={styles.text} className="text-center">
                  SIGN IN
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

export default SignUpScreen;

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
