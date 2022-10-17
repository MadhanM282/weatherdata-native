import axios from 'axios';
import React, {useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const {width: screenWidth} = Dimensions.get('window');

export const Register = ({navigation}) => {
  const [Credentials, SetCredentials] = useState({
    name: '',
    email: '',
    password: '',
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
    <LinearGradient
      colors={['#c0392b', '#f1c40f', '#8e44ad']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 1}}
      style={Styles.button}>
      <KeyboardAvoidingView>
        <Text style={Styles.HeroTitle}>Enter Details to Register</Text>
        <Text style={Styles.inputTitles}>Name:-</Text>
        <TextInput
          id="name"
          style={Styles.TextFields}
          placeholder="Enter Your Name.."
          onChangeText={e => HandelChange('name', e)}
          defaultValue={Credentials.name}
        />
        <Text style={Styles.inputTitles}>Email:-</Text>
        <TextInput
          id="email"
          style={Styles.TextFields}
          placeholder="Enter your Email Address.."
          onChangeText={e => HandelChange('email', e)}
          defaultValue={Credentials.email}
        />
        <Text style={Styles.inputTitles}>Password:-</Text>
        <TextInput
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
          <Text>Already have an account?</Text>
          <View style={Styles.login}>
            <Pressable
              onPress={() => navigation.navigate('Login', {name: 'Login'})}
              style={Styles.buttons}>
              <Text style={Styles.buttonText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
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
