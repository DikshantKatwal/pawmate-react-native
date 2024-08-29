import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  TextInput,
  Button,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../utils/config";

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigation  }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertText, setAlertText] = useState("");


  const check_logged_in = async () => {
    const userInfoString = await AsyncStorage.getItem("userInfo");
    const userInfo = JSON.parse(userInfoString);
    if (userInfo) {
      console.log(userInfo)
      setUserInfo(userInfo);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };


  const logout = async () => {
    const userInfoString = await AsyncStorage.getItem("userInfo");
    const userInfo = JSON.parse(userInfoString);
    token = userInfo.token
    const headers = {
      'Authorization': `Token  ${token}`, // Assuming you are using a Bearer token
      'Content-Type': 'application/json', // Adjust content type as needed
    };
    try {
      const response = await axios.post(
        `${BASE_URL}auth/user_logout/`,
        {}, // You can pass data here if needed
        { headers: headers } // Include headers in the request
      );
      await AsyncStorage.removeItem("userInfo");
      setUserInfo(null)
      setIsLoggedIn(false);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  const verify_otp = async (otp) => {
    const userVerifyString = await AsyncStorage.getItem("verify");
    const userVerify = JSON.parse(userVerifyString);
    token = userVerify.token
    const headers = {
      'Authorization': `Token  ${token}`, // Assuming you are using a Bearer token
      'Content-Type': 'application/json', // Adjust content type as needed
    };
    try {
      const response = await axios.post(
        `${BASE_URL}auth/verify_user/`,
        {
          email: userVerify.email,
          password : userVerify.password,
          otp: otp

        }, // You can pass data here if needed
        { headers: headers } // Include headers in the request
      );
      if (response.status === 202) {
        if (response.data.token) {
          await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
          setIsLoggedIn(true);
        }  
    }
    } catch (error) {
      console.error(
        'Error removing item with key "userInfo" from AsyncStorage:',
        error
      );
    }
  };

  const resend_otp = async () => {
    const userVerifyString = await AsyncStorage.getItem("verify");
    const userVerify = JSON.parse(userVerifyString);
    token = userVerify.token
    const headers = {
      'Authorization': `Token  ${token}`, // Assuming you are using a Bearer token
      'Content-Type': 'application/json', // Adjust content type as needed
    };
    try {
      const response = await axios.post(`${BASE_URL}auth/resend_otp/`,
        {}, // You can pass data here if needed
        { headers: headers } // Include headers in the request
      );
      if (response.status === 202) {
        setAlertText('OTP sent to your email :)');
        setModalVisible(true);
    }
    } catch (error) {
      setAlertText(error.response.data.error);
      setModalVisible(true);
    }
  };


  const login = async (username, password) => {
    try {
      console.log(userInfo)
      if (!username || !password) {
        setAlertText("Please provide your credentials");
        setModalVisible(true);
      } else {
        const response = await axios.post(`${BASE_URL}auth/login/`,
          {
            username: username,
            password: password,
          }
        );
        await AsyncStorage.setItem("userInfo", JSON.stringify(response.data));

        setIsLoggedIn(true);
        // Handle successful login, set user state, navigate to next screen, etc.
      }
    } catch (error) {
      setAlertText(error.response.data.error);
      setModalVisible(true);
      // Handle login failure, show error message, etc.
    }
  };


  const signup = async (username, email, password, repassword) => {
    try {
      if (!username || !password || !email || !repassword) {
        setAlertText("Please provide your credentials to signup");
        setModalVisible(true);
      } 
      else if (password !== repassword) {
        setAlertText("Opps!! Password Didn't Match");
        setModalVisible(true);
      }
      else {
        const response = await axios.post(`${BASE_URL}auth/signup/`,
          {
            username: username,
            password: password,
            email: email
          }
        );
        if (response.status === 202) {
            if (response.data.token) {
              await AsyncStorage.setItem('verify', JSON.stringify(response.data));
              return true;
            }  
        }
      }
    } catch (error) {
      setAlertText(error.response.data.error);
      setModalVisible(true);
      // Handle login failure, show error message, etc.
    }
  };


  const forgot_password = async (email) => {
    try {
      if (!email) {
        setAlertText("Please provide your email");
        setModalVisible(true);
      } 
      else {
        const response = await axios.post(`${BASE_URL}auth/forgot_password/`,
          {
            email: email
          }
        );
        if (response.status === 202) {
          setAlertText(response.data.message);
          setModalVisible(true);
          return true;
        }
      }
    } catch (error) {
      setAlertText(error.response.data.error);
      setModalVisible(true);
      // Handle login failure, show error message, etc.
    }
  };


  useEffect(() => {
    check_logged_in();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        check_logged_in,
        logout,
        login,
        signup,
        verify_otp,
        resend_otp,
        forgot_password,
        userInfo,
      }}
    >
      {children}
      {/* Modal for "Please provide credentials" message */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{alertText}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </AuthContext.Provider>
  );
};
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#0c93ab",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
