import React, { useRef } from 'react';
import { View, Animated, PanResponder, Dimensions, StyleSheet } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ProfileScreen = () => {
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > 120) {
          // Swiped right
          Animated.spring(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gesture.dy },
            useNativeDriver: false,
          }).start(() => {
            // Reset position after animation
            position.setValue({ x: 0, y: 0 });
          });
        } else if (gesture.dx < -120) {
          // Swiped left
          Animated.spring(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy },
            useNativeDriver: false,
          }).start(() => {
            // Reset position after animation
            position.setValue({ x: 0, y: 0 });
          });
        } else {
          // Return to the original position
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const rotateCard = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const cards = Array.from({ length: 10 }).map((_, index) => {
    const isFirstCard = index === 0;
    return (
      <Animated.View
        key={index}
        {...(isFirstCard && panResponder.panHandlers)}
        style={[
          isFirstCard ? position.getLayout() : {},
          { transform: isFirstCard ? [{ rotate: rotateCard }] : [] },
          isFirstCard && { zIndex: 10 },
          {
            position: 'absolute',
            top: isFirstCard ? SCREEN_HEIGHT / 4 : 20 * index,
          },
        ]}
      >
        {/* Your card content here */}
        <View
          style={{
            width: 300,
            height: 400,
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        />
      </Animated.View>
    );
  });

  return <View style={{ flex: 1 }}>{cards}</View>;
};

export default ProfileScreen;
