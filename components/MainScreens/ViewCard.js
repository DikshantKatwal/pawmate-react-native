import React, { useContext, useState, useEffect  } from "react";
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, StyleSheet  } from "react-native";

const ViewCard  = ({ route, navigation }) => {
  const { card } = route.params;
  return (

<ScrollView  className="bg-white flex-1 mt-10" style={{ paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
{
              card?.images?.[0]?.image ? (
                <Image
                
                  source={{ uri: card.images[0].image }} // Prepend the base URL if needed
                  style={{ height: 500, borderRadius: 10, marginBottom:10 }}
                />
              ) : null
            }
          
          <View className=' ' style={styles.detailcard}>
            
            <View className='bg-gray-200 rounded-md p-2'>
            <Text className='font-bold text-gray-700 text-3xl ' >{card?.name}</Text>
            <Text className='font-normal text-gray-700 text-base ' >known as: {card?.nickname}</Text>
            <Text className='font-normal text-gray-700 text-base ' >Age: {card?.age} years old</Text>
            <Text className='font-normal text-gray-700 text-base ' >Gender: {card?.gender}</Text>
            <Text className='font-normal text-gray-700 text-base text-center underline' >Bio</Text>
            <Text className='font-normal text-gray-700 text-base ' >{card?.bio}</Text>
            </View>
            
          </View>
          {
              card?.images?.[1]?.image ? (
                <Image
                  source={{ uri: card.images[1].image }} // Prepend the base URL if needed
                  style={{ height: 500, borderRadius: 10, marginBottom:10 }}
                />
              ) : null
            }
      </ScrollView>
  )
}

export default ViewCard


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
