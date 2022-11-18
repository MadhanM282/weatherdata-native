import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
const {width: screenWidth} = Dimensions.get('window');

export const Login = ({navigation}) => {
  const [Credentials, SetCredentials] = useState({
    email: '',
    password: '',
  });

  const UserLogin = async () => {
    await AsyncStorage.setItem('userid', '');
    try {
      // console.log(Credentials);
      await axios
        .post('https://jwtath-1.herokuapp.com/login', Credentials)
        .then(async ({data}) => {
          // console.log(data.id);
          await AsyncStorage.setItem('userid', data.id);
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
    // console.log(e, id);
    SetCredentials({...Credentials, [id]: e});
  };

  return (
    <ScrollView style={Styles.button}>
      <View>
        <Text style={Styles.HeroTitle}>Enter Details to Login</Text>
        <Text style={Styles.inputTitles}>Email:-</Text>
        <TextInput
          placeholderTextColor="#818589"
          style={Styles.TextFields}
          placeholder="Enter your Email Address.."
          onChangeText={newText => HandelChange('email', newText)}
          defaultValue={Credentials.email}
        />
        <Text style={Styles.inputTitles}>Password:-</Text>
        <TextInput
          placeholderTextColor="#818589"
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
          <Text style={Styles.condition}>Dont Have an account?</Text>
          <View style={Styles.login}>
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
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  condition: {
    color: 'black',
  },
  HeroTitle: {
    fontSize: 25,
    color: 'black',
    paddingBottom: 30,
  },
  inputTitles: {
    fontSize: 20,
    color: 'black',
  },
  TextFields: {
    width: screenWidth - 30,
    height: 50,
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 10,
    borderColor: 'black',
    fontSize: 20,
    color: 'black',
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
