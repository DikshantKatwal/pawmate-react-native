import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";
import { Modal, View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet} from 'react-native';
import { BASE_URL } from '../utils/config';
import * as mime from 'mime';

export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
//   useEffect(() => {
//     // Replace this with your actual API call to check if the user is active
//     const checkUserActiveStatus = async () => {
//       // Simulate an API call
//       const response = await fetch('https://api.example.com/check-user-status');
//       const data = await response.json();
//       setIsActive(data.isActive);
//     };

//     checkUserActiveStatus();
//   }, []);

const uploadImage = async (imageUri) => {
  const userInfoString = await AsyncStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);
  const token = userInfo.token;

  const headers = {
    'Authorization': `Token ${token}`,
    'Content-Type': 'multipart/form-data', // Ensure the content type is set correctly
  };

  // Create a new FormData object
  const formData = new FormData();

  // Get the file name and MIME type of the image
  const fileName = imageUri.split('/').pop();
  const mimeType = mime.getType(imageUri);

  // Append the image to the form data
  formData.append('image', {
    uri: imageUri,
    name: fileName,
    type: mimeType || 'image/jpeg', // Default to 'image/jpeg' if MIME type is not detected
  });
  

  try {
    const response = await axios.post(`${BASE_URL}dogs/upload_image/`, formData, { headers });
  } catch (error) {
    if (error.response && error.response.data) {
      setAlertText(error.response.data.error);
    } else {
      setAlertText("An unexpected error occurred.");
    }
    setModalVisible(true);
  }
};

const updateImage = async (imageUri, id) => {
  const userInfoString = await AsyncStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);
  const token = userInfo.token;

  const headers = {
    'Authorization': `Token ${token}`,
    'Content-Type': 'multipart/form-data', // Ensure the content type is set correctly
  };

  // Create a new FormData object
  const formData = new FormData();

  // Get the file name and MIME type of the image
  const fileName = imageUri.split('/').pop();
  const mimeType = mime.getType(imageUri);

  // Append the image to the form data
  formData.append('image', {
    uri: imageUri,
    name: fileName,
    type: mimeType || 'image/jpeg', // Default to 'image/jpeg' if MIME type is not detected
  });
  formData.append('id', id);
  

  try {
    const response = await axios.post(`${BASE_URL}dogs/update_image/`, formData, { headers });
  } catch (error) {
    if (error.response && error.response.data) {
      setAlertText(error.response.data.error);
    } else {
      setAlertText("An unexpected error occurred.");
    }
    setModalVisible(true);
  }
};


const uploadDetails = async (name, nickname, age, bio, gender) => {
  
  const userInfoString = await AsyncStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);
  token = userInfo.token
  const headers = {
    'Authorization': `Token  ${token}`, // Assuming you are using a Bearer token
    'Content-Type': 'application/json', // Adjust content type as needed
  };
  try {
    if (name ==='' || !nickname || !bio) {
        setAlertText("all fields are required");
        setModalVisible(true);
        return
      }
    const response = await axios.post(`${BASE_URL}dogs/details/`,
      {
        name: name,
        nickname: nickname,
        age:age,
        gender:gender,
        bio:bio
      }, // You can pass data here if needed
      { headers: headers } 
    );
    check_is_active();
    // setIsActive(true)

  } catch (error) {
    setAlertText(error.response.data.error);
    setModalVisible(true);
    // Handle login failure, show error message, etc.
  }
};


const fetchDetails = async () => {
  
  const userInfoString = await AsyncStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);
  token = userInfo?.token
  if(token){
    const headers = {
      'Authorization': `Token  ${token}`, // Assuming you are using a Bearer token
      'Content-Type': 'application/json', // Adjust content type as needed
    };
    try {
      const response = await axios.post(`${BASE_URL}dogs/fetch_details/`,
       {},
        { headers: headers } 
      );
      data = response.data
      return data
      // setIsActive(true)
  
    } catch (error) {
      setAlertText(error.response.data.error);
      setModalVisible(true);
      // Handle login failure, show error message, etc.
    }
  }
 
};

const fetchCards = async () => {
  
  const userInfoString = await AsyncStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);
  token = userInfo.token
  const headers = {
    'Authorization': `Token  ${token}`, // Assuming you are using a Bearer token
    'Content-Type': 'application/json', // Adjust content type as needed
  };
  try {
    const response = await axios.post(`${BASE_URL}cards/fetch_cards/`,
     {},
      { headers: headers } 
    );
    data = response.data
    console.log(data)
    return data
    // setIsActive(true)

  } catch (error) {
    setAlertText(error.response.data.error);
    setModalVisible(true);
    // Handle login failure, show error message, etc.
  }
};



const check_is_active = async () => {
  const userInfoString = await AsyncStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);
  token = userInfo?.token
  const headers = {
    'Authorization': `Token  ${token}`, // Assuming you are using a Bearer token
    'Content-Type': 'application/json', // Adjust content type as needed
  };
  try {
    const response = await axios.post(`${BASE_URL}dogs/check_active/`,
      {
      
      },
      { headers: headers } 
    );
    if (response.status === 202) {
      setIsActive(true)
    }
    else{
      setIsActive(false)
    }
    console.log(isActive)
  } catch (error) {
  }
};

useEffect(() => {
  check_is_active();
}, []);



  return (
    <UserContext.Provider value={{ isActive,uploadImage, uploadDetails, fetchDetails, updateImage, fetchCards }}>
      {children}
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
    </UserContext.Provider>
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