import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const {width: screenWidth} = Dimensions.get('window');

export const Login = ({navigation}) => {
  const [Credentials, SetCredentials] = useState({
    email: '',
    password: '',
  });

  const UserLogin = async () => {
    try {
      console.log(Credentials);
      await axios
        .post('https://jwtath-1.herokuapp.com/login', Credentials)
        .then(async ({data}) => {
          console.log(data);
          await AsyncStorage.setItem('auth', 'true');
          navigation.navigate('Home');
        })
        .catch(err => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const HandelChange = (id, e) => {
    console.log(e, id);
    SetCredentials({...Credentials, [id]: e});
  };

  return (
    <LinearGradient
      colors={['#c0392b', '#f1c40f', '#8e44ad']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 1}}
      style={Styles.button}>
      <View>
        <Text style={Styles.HeroTitle}>Enter Details to Login</Text>
        <Text style={Styles.inputTitles}>Email:-</Text>
        <TextInput
          style={Styles.TextFields}
          placeholder="Enter your Email Address.."
          onChangeText={newText => HandelChange('email', newText)}
          defaultValue={Credentials.email}
        />
        <Text style={Styles.inputTitles}>Password:-</Text>
        <TextInput
          style={Styles.TextFields}
          secureTextEntry={true}
          placeholder="Enter your Password.."
          onChangeText={newText => HandelChange('password', newText)}
          defaultValue={Credentials.password}
        />

        <View style={Styles.ButtonContainor}>
          <View style={Styles.login}>
            <Pressable onPress={() => UserLogin()} style={Styles.buttons}>
              <Text style={Styles.buttonText}>Login</Text>
            </Pressable>
          </View>
          <View style={Styles.login}>
            <Text>Dont Have an account?</Text>
            <Pressable
              onPress={() =>
                navigation.navigate('Register', {name: 'Register'})
              }
              style={Styles.buttons}>
              <Text style={Styles.buttonText}>Register</Text>
            </Pressable>
          </View>
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
