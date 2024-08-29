import React, { useContext, useEffect, useState }  from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/MainScreens/Homescreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../components/MainScreens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  HomeIcon,UserIcon, ChatBubbleOvalLeftEllipsisIcon, Square2StackIcon } from "react-native-heroicons/solid";
import Swiper from 'react-native-deck-swiper';
import ChatScreen from '../components/MainScreens/ChatScreen';
import CardScreen from '../components/MainScreens/CardScreen';
import { UserContext } from '../context/userContext';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import EditProfile from '../components/MainScreens/EditProfile';
import ViewCard from '../components/MainScreens/ViewCard';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const TabNavigator  = () => {
 
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: '#1A4870',
          position: 'absolute',
          borderTopWidth: 0,
      },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Square2StackIcon size={size} color={focused ? '#FFFFFF' : 'gray'} />;
          } else if (route.name === 'Profile') {
            return <UserIcon size={size} color={focused ? '#FFFFFF' : 'gray'} />;
          }
          else if (route.name === 'Chat') {
            return <ChatBubbleOvalLeftEllipsisIcon size={size} color={focused ? '#FFFFFF' : 'gray'}/>;
          }
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'gray',
      })}
      >
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
       <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};


const MainNav = () => {
  const { isActive } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      await isActive;
      console.log(isActive)
      setLoading(false);
    };
    initializeAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {!isActive ? (
        <Stack.Screen name="CardScreen" component={CardScreen} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
      )}
       <Tab.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
       <Tab.Screen name="ViewCard" component={ViewCard} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainNav;