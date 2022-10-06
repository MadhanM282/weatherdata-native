import React from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const {width: screenWidth} = Dimensions.get('window');

export const Dashboard = ({navigation}, Auth) => {
  // console.log(Auth, 'data');
  return (
    <LinearGradient
      colors={['#c0392b', '#f1c40f', '#8e44ad']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 1}}
      style={Styles.button}>
      <View style={Styles.ButtonContainor}>
        <View style={Styles.login}>
          <Pressable
            onPress={() => navigation.navigate('Home')}
            style={Styles.buttons}>
            <Text style={Styles.buttonText}>Home</Text>
          </Pressable>
        </View>
        <View style={Styles.login}>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            style={Styles.buttons}>
            <Text style={Styles.buttonText}>Login</Text>
          </Pressable>
        </View>
        <View style={Styles.login}>
          <Text>Dont Have an account?</Text>
          <Pressable
            onPress={() => navigation.navigate('Register')}
            style={Styles.buttons}>
            <Text style={Styles.buttonText}>Register</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

const Styles = StyleSheet.create({
  HeroTitle: {
    fontSize: 30,
    color: 'white',
  },
  inputTitles: {
    fontSize: 20,
    color: 'black',
  },
  TextFields: {
    width: screenWidth - 30,
    height: 60,
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 10,
    borderColor: 'white',
    fontSize: 26,
    color: 'white',
  },
  ButtonContainor: {
    width: screenWidth - 250,
    marginLeft: 100,
  },
  login: {
    marginTop: 10,
  },
  button: {
    // paddingTop: 100,
    paddingVertical: 0,
    paddingHorizontal: 10,
    height: screenWidth - Platform.select({ios: -455, android: -550}),
  },
  buttons: {
    padding: 10,
    borderWidth: 1,
    width: screenWidth - 250,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'orange',
    textAlign: 'center',
  },
});
