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

const EditProfile = ({ route, navigation }) => {
    const PlaceholderImage = require("../../assets/pawmate_assets/placeholder_image_upload.png");
    const { details } = route.params;
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickName] = useState("");
    const [bio, setBio] = useState("");
    const [images, setImages] = useState([null, null]);
    const [allimages, setAllImages] = useState([null, null]);
    const { updateImage, uploadDetails } = useContext(UserContext);
  useEffect(() => {
  
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    };
    requestPermissions();
  }, []);

  useEffect(() =>{
    if(details){
        setName(details.name)
        setNickName(details.nickname)
        setNickName(details.nickname)
        setBio(details.bio)
        setGender(details.gender)
        setAge(details.age)
        if (details.images && details.images.length > 0) {
            const fetchedImages = details.images.map((image) => ({ id: image.id,uri: image.image }));
            setImages(fetchedImages);
          }
     
    }
  }, []);
  const pickImageAsync = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
        const newImages = [...images];
        const imageId = newImages[index]?.id ?? '';  // Get the existing ID for the image being updated
        newImages[index] = { uri: result.assets[0].uri, id: imageId }; // Include ID
        setImages(newImages);
        updateImage(result.assets[0].uri, imageId); 
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

  const handleNext = async () => {
    await uploadDetails(name, nickname, age, bio, gender)
    navigation.navigate('Profile');

  };
  

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView className="flex-1 pt-6 bg-teal-200">
                    <View className=" items-center flex-row justify-between mx-5">
                        <Text className="font-semibold text-2xl">Edit Profile</Text>
                        <TouchableOpacity onPress={() => handleNext()}
                            >
                        <Text className="font-semibold text-lg">
                        Done
                        </Text></TouchableOpacity>
                    </View>
                    <View className="pt-5 items-center">
                      <View className='flex-row items-center justify-between  w-11/12 mb-2'>
                      <Text className="font-semibold text-lg mr-2 ">
                        Name
                      </Text> 
                      <TextInput
                        style={styles.TextInput}
                        className="w-4/6"
                        placeholder="Paw's Name"
                        keyboardType="default"
                        value={name} 
                        onChangeText={setName}
                        />
                      </View>

                      <View className='flex-row items-center justify-between  w-11/12  mb-2'>
                      <Text className="font-semibold text-lg mr-2 ">
                        Nick name
                      </Text> 
                        <TextInput
                        className="w-4/6"
                        style={styles.TextInput}
                        placeholder="Paw's Nickname"
                        keyboardType="default"
                        value={nickname} 
                        onChangeText={setNickName}
                        />
                      </View>
                      <View className='flex-row  w-11/12 justify-between'>
                      <Text className="font-semibold text-lg ">
                        Age
                      </Text> 
                      <Text className="font-semibold text-lg ">
                        Gender
                      </Text> 
                      </View>
                        <View className='flex-row  w-11/12 justify-between'>
                          
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
                        <Text className="font-semibold text-lg w-11/12">
                          Bio
                        </Text>
                        <TextInput
                        style={styles.TextInput}
                        className="h-2/6 w-11/12"
                        placeholder="Paw's Bio"
                        keyboardType="default"
                        multiline={true}
                        numberOfLines={4}
                        value={bio} 
                        onChangeText={setBio}
                        />

                        <View className="flex-1 flex-row max-h-64 gap-2 mt-2 ">
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
    // <View>
    //   {/* Display or use the details data */}
    //   <Text>{JSON.stringify(details, null, 2)}</Text>
    // </View>
  );
}

export default EditProfile;
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
      paddingVertical: 12,
      fontSize: 18,
      borderRadius: 8,
      fontFamily: "SemiBold",
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
  