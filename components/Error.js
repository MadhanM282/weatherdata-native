import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';

const {height: screenHeight} = Dimensions.get('window');

export const Error = () => {
  return (
    <View style={Loading.button}>
      <View style={[Loading.container, Loading.horizontal]}>
        <ActivityIndicator color="#ffffff" size="large" />
      </View>
    </View>
  );
};

const Loading = StyleSheet.create({
  button: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    height: screenHeight,
    backgroundColor: 'white',
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
