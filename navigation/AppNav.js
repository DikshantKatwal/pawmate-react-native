// AppNav.js
import React, { useContext, useEffect, useState  } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AuthStack from './AuthStack';
import MainNav from './MainNav';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { UserProvider } from '../context/userContext';


const AppNav = () => {
  const { isLoggedIn, check_logged_in } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const initializeAuth = async () => {
      await check_logged_in();
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
    <UserProvider>
      <NavigationContainer>
        {isLoggedIn ? <MainNav /> : <AuthStack />}     
      </NavigationContainer>
    </UserProvider>
  );
};

export default AppNav;