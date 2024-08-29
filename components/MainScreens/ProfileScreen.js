import React, { useContext, useState, useEffect  } from "react";
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, StyleSheet  } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import {  CogIcon } from "react-native-heroicons/solid";
import {ArrowLeftStartOnRectangleIcon} from 'react-native-heroicons/outline';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { BASE_URL } from "../../utils/config";
import { UserContext } from "../../context/userContext";
import { useFocusEffect } from '@react-navigation/native';


const ImageWithLoading = ({ uri }) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginBottom: 10 }} />
      )}
      <Image
        source={{ uri }}
        style={{ height: 500, borderRadius: 10, marginBottom: 10 }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};


export default function ProfileScreen({ route, navigation }) {
  const {userInfo} = useContext(AuthContext);
  const{logout} = useContext(AuthContext);
  const {fetchDetails} = useContext(UserContext)
  const [images, setImages] = useState([null, null]);
  const [dogs, setDogs] = useState([]);
  const PlaceholderImage =require('../../assets/pawmate_assets/placeholder_image_upload.png')
  const IMAGE_BASE_URL = 'http://192.168.1.213:8089/uploads/';
  const [details, setDetails] = useState(null);
  
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const details = await fetchDetails();
        setDetails(details); // Store the fetched data in the state
      };

      getData();
    }, [fetchDetails])
  );


  const handleEditProfile= () =>{
    navigation.navigate('EditProfile', { details });
  }

 return(
  <SafeAreaView className='flex-1 mt-2'>
  <View className=' h-16 flex-row justify-between items-center px-5'>
    <View>
      <Text className='font-light text-lg'>
        Hello, {userInfo?.username}
      </Text>
    </View>
    <View>
    {/* logout(); */}
   <TouchableOpacity onPress={() =>  {logout()}}> 
    {/* <CogIcon size={35} color="#00CCBB" /> */}
    <ArrowLeftStartOnRectangleIcon
          size={35}
          color="#00CCBB"
          style={{transform: [{rotateY: '180deg'}]}}
        />
    </TouchableOpacity> 
    </View>
  </View>

<ScrollView  className="bg-white flex-1" style={{ paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
{
              details?.images?.[0]?.image ? (
                <Image
                
                  source={{ uri: details.images[0].image }} // Prepend the base URL if needed
                  style={{ height: 500, borderRadius: 10, marginBottom:10 }}
                />
              ) : null
            }
          
          <View className=' ' style={styles.detailcard}>
            
            <View className='bg-gray-200 rounded-md p-2'>
            <Text className='font-bold text-gray-700 text-3xl ' >{details?.name}</Text>
            <Text className='font-normal text-gray-700 text-base ' >known as: {details?.nickname}</Text>
            <Text className='font-normal text-gray-700 text-base ' >Age: {details?.age} years old</Text>
            <Text className='font-normal text-gray-700 text-base ' >Gender: {details?.gender}</Text>
            <Text className='font-normal text-gray-700 text-base text-center underline' >Bio</Text>
            <Text className='font-normal text-gray-700 text-base ' >{details?.bio}</Text>
            </View>
            
          </View>
          {
              details?.images?.[1]?.image ? (
                <Image
                  source={{ uri: details.images[1].image }} // Prepend the base URL if needed
                  style={{ height: 500, borderRadius: 10, marginBottom:10 }}
                />
              ) : null
            }
            <View className=' mb-20 '>
              <TouchableOpacity onPress={() =>  {handleEditProfile()}}>
              <Text className='font-thin underline text-center text-xl ' >Edit Profile</Text>

              </TouchableOpacity>
            </View>
      </ScrollView>
</SafeAreaView>
 );
}



const styles = StyleSheet.create({
 
  detailcard:{

    fontSize: 16,
    borderRadius: 8,
    fontFamily: "CustomFont",
    backgroundColor: "white",
    marginVertical: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 1,
  },
})
