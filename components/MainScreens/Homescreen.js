import React, { useContext, useState } from "react";
import { Button, View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import Swiper from "react-native-deck-swiper";
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from "../../context/userContext";

export default function HomeScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const { fetchDetails, fetchCards } = useContext(UserContext);
  const [cards, setCards] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const newCards = await fetchCards();
        const details = await fetchDetails();

        setCards(newCards);
        console.log(newCards[0])
        if (details.images.length > 0) {
          setImage(details.images[0].image);
        }
      };

      getData();
    }, [fetchDetails, fetchCards])
  );

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView className='flex-1 mt-2'>
      <View className='h-16 flex-row justify-between items-center px-5'>
        <View>
          <Text className='font-light text-lg'>
            Hello, {userInfo?.username}
          </Text>
        </View>
        <View>
          <TouchableOpacity className="w-12 h-12 rounded-full" onPress={handleProfile}>
            <Image
              style={{ position: 'absolute', top: 0, height: '100%', width: '100%', borderRadius: 100 }}
              source={{ uri: image }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className='bg-cyan-500 flex-1' style={{ alignItems: "center", justifyContent: "center" }}>
        {cards.length > 0 ? (
          <Swiper
            style={{ backgroundColor: "transparent" }}
            cards={cards}
            stackSize={5}
            cardIndex={0}
            animateCardOpacity
            verticalSwipe={false}
            overlayLabels={{
              left: {
                title: "NOPE",
                style: {
                  label: {
                    textAlign: "right",
                    color: 'red',
                  },
                },
              },
              right: {
                title: "Match",
                style: {
                  label: {
                    textAlign: "left",
                    color: "#4DED30"
                  }
                }
              }
            }}
            onSwipedLeft={() => {
              console.log("Swiped Left");
            }}
            onSwipedRight={() => {
              console.log("Swiped Right");
            }}
            renderCard={(card) => (
              <View className="relative h-3/4 rounded-xl" style={styles.card}>
                <TouchableOpacity className="flex-1" onPress={() => navigation.navigate("ViewCard", { card })}>
                  <Image className="absolute top-0 h-full w-full rounded-xl" source={{ uri: card?.images[0]?.image }} />
                  <View className="flex-1 flex-row w-64 bottom-16 left-5 absolute">
                    <Text className="text-white text-xl">{card?.name}, </Text>
                    <Text className="text-white text-xl">{card?.age}</Text>
                  </View>
                  <Text className="text-white text-xl bottom-10 left-5 absolute">{card?.nickname}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text className="text-white">Loading cards...</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card:{
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
