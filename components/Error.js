import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {height: screenHeight} = Dimensions.get('window');

export const Error = () => {
  return (
    <LinearGradient
      colors={['#c0392b', '#f1c40f', '#8e44ad']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 1}}
      style={Loading.button}>
      <View style={[Loading.container, Loading.horizontal]}>
        <ActivityIndicator color="#ffffff" size="large" />
      </View>
    </LinearGradient>
  );
};

const Loading = StyleSheet.create({
  button: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    height: screenHeight,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
