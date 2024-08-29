import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import * as Font from "expo-font";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from "../../context/userContext";

const loadFonts = () => {
  return Font.loadAsync({
    CustomFont: require("../../assets/fonts/RobotoCondensed-VariableFont_wght.ttf"),
    Medium: require("../../assets/fonts/static/RobotoCondensed-Medium.ttf"),
    SemiBold: require("../../assets/fonts/static/RobotoCondensed-SemiBold.ttf"),
    Bold: require("../../assets/fonts/static/RobotoCondensed-Bold.ttf"),
    light: require("../../assets/fonts/static/RobotoCondensed-Light.ttf"),
  });
};
const PlaceholderImage = require("../../assets/pawmate_assets/placeholder_image_upload.png");
export default function CardScreen() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickName] = useState("");
  const [bio, setBio] = useState("");
  const [images, setImages] = useState([null, null]);
  const { uploadImage, uploadDetails } = useContext(UserContext);
  useEffect(() => {
  
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    };
    requestPermissions();
  }, []);
 
  const pickImageAsync = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      const newImages = [...images];
      newImages[index] = { uri: result.assets[0].uri };
      setImages(newImages);
      uploadImage(result.assets[0].uri);
    }
  };
  const genderOptions = [{ label: "Male", value: 'male' },
    { label: "Female", value: 'female' },
    { label: "Prefer not to say", value: 'pass' }
  ];

  const ageOptions = [{ label: "Skip", value: null }];
  for (let i = 1; i <= 30; i++) {
    ageOptions.push({ label: `${i}`, value: i });
  }

  const handleNext = () => {
    // if (!name || !nickname || !bio) {
    //   Alert.alert('Error', 'Please fill in all the details.');
    //   return;
    // }
    uploadDetails(name, nickname, age, bio, gender)
    // if (images.some(image => image === null)) {
    //   Alert.alert('Error', 'Please select both images.');
    //   return;
    // }

  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 pt-6 bg-teal-200">
          <View className=" items-center flex-row justify-between mx-5">
            <Text className="font-semibold text-2xl">Paw's Details</Text>
            <TouchableOpacity onPress={() => handleNext()}
                >
            <Text className="font-semibold text-lg">
              Next
              </Text></TouchableOpacity>
          </View>
          <View className="gap-y-3 pt-5 items-center">
            <TextInput
              style={styles.TextInput}
              placeholder="Paw's Name"
              keyboardType="default"
              value={name} 
              onChangeText={setName}
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Paw's Nickname"
              keyboardType="default"
              value={nickname} 
              onChangeText={setNickName}
            />
            <View className='flex-row'>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={ageOptions}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Age"
              searchPlaceholder="Search"
              value={age}
              onChange={(item) => {
                setAge(item.value);
              }}
            />
             <Dropdown
              style={styles.genderdropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={genderOptions}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Gender"
              searchPlaceholder="Gender"
              value={gender}
              onChange={(item) => {
                setGender(item.value);
              }}
            />
            </View>
            
            <TextInput
              style={styles.TextInput}
              className="h-2/6"
              placeholder="Paw's Bio"
              keyboardType="default"
              multiline={true}
              numberOfLines={4}
              value={bio} 
              onChangeText={setBio}
            />

            <View className="flex-1 flex-row max-h-64 gap-2 ">
              {images.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => pickImageAsync(index)}
                >
                  <Image
                    source={image || PlaceholderImage}
                    style={{ width: 150, height: 240, borderRadius: 10 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 25,
  },
  TextInput: {
    paddingHorizontal: 10,
    width: 300,
    paddingVertical: 12,
    fontSize: 18,
    borderRadius: 8,
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
  dropdown: {
    paddingHorizontal: 10,
    marginVertical: 6,
    height: 50,
    width: 100,
    borderRadius: 8,
    backgroundColor: "white",
    paddingVertical: 12,
    fontSize: 18,
    borderRadius: 8,
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
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
    fontFamily: "SemiBold",
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "SemiBold",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  genderdropdown: {
    paddingHorizontal: 10,
    marginVertical: 6,
    marginLeft: 20,
    height: 50,
    width: 180,
    borderRadius: 8,
    backgroundColor: "white",
    paddingVertical: 12,
    fontSize: 18,
    borderRadius: 8,
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
});
