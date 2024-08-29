import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

function Card({ onSwipeLeft, onSwipeRight }) {
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: () => {
      if (translateX.value > 100) {
        onSwipeRight && onSwipeRight();
      } else if (translateX.value < -100) {
        onSwipeLeft && onSwipeLeft();
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text>Card</Text>
      </Animated.View>
    </PanGestureHandler>
  );
}

export default function App() {
  const handleSwipeLeft = () => {
    console.log('Swiped left!');
  };

  const handleSwipeRight = () => {
    console.log('Swiped right!');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Card onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    width: '91.67%', // 11/12 of the screen width
    height: '83.33%', // 5/6 of the screen height
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
