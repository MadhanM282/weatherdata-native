import axios from 'axios';
import React, {useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
const {width: screenWidth} = Dimensions.get('window');

export const Register = ({navigation}) => {
  const [Credentials, SetCredentials] = useState({
    name: '',
    email: '',
    password: '',
    language: 'en',
  });
  const UserRegister = async () => {
    try {
      console.log(Credentials);
      await axios
        .post('https://jwtath-1.herokuapp.com/register', Credentials)
        .then(({data}) => {
          console.log(data);
          navigation.navigate('Login');
        })
        .catch(err => console.log(err.message));
    } catch (error) {
      console.log(error.message);
    }
  };

  const HandelChange = (id, e) => {
    console.log(e, id);
    SetCredentials({...Credentials, [id]: e});
  };

  return (
    <ScrollView style={Styles.button}>
      <KeyboardAvoidingView>
        <Text style={Styles.HeroTitle}>Enter Details to Register</Text>
        <Text style={Styles.inputTitles}>Name:-</Text>
        <TextInput
          placeholderTextColor="#818589"
          id="name"
          style={Styles.TextFields}
          placeholder="Enter Your Name.."
          onChangeText={e => HandelChange('name', e)}
          defaultValue={Credentials.name}
        />
        <Text style={Styles.inputTitles}>Email:-</Text>
        <TextInput
          placeholderTextColor="#818589"
          id="email"
          style={Styles.TextFields}
          placeholder="Enter your Email Address.."
          onChangeText={e => HandelChange('email', e)}
          defaultValue={Credentials.email}
        />
        <Text style={Styles.inputTitles}>Password:-</Text>
        <TextInput
          placeholderTextColor="#818589"
          id="password"
          style={Styles.TextFields}
          secureTextEntry={true}
          placeholder="Enter your Password.."
          onChangeText={e => HandelChange('password', e)}
          defaultValue={Credentials.password}
        />
        <View style={Styles.ButtonContainor}>
          <View style={Styles.login}>
            <Pressable onPress={() => UserRegister()} style={Styles.buttons}>
              <Text style={Styles.buttonText}>Register</Text>
            </Pressable>
          </View>
          <Text style={Styles.condition}>Already have an account?</Text>
          <View style={Styles.login}>
            <Pressable
              onPress={() => navigation.navigate('Login', {name: 'Login'})}
              style={Styles.buttons}>
              <Text style={Styles.buttonText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
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
