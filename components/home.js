import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const {width: screenWidth} = Dimensions.get('window');
// import AsyncStorage from '@react-native-async-storage/async-storage';
let data;
export const HomeSection = ({navigation}) => {
  useEffect(() => {
    GetAuth();
  }, []);

  const GetAuth = async () => {
    data = await AsyncStorage.getItem('auth');
  };
  console.log(data, 'in home');
  if (!data) {
    navigation.navigate('Login');
    console.log('logged');
  }
  const HandelChanged = async e => {
    await AsyncStorage.setItem('key', e);
    console.log(e);
    navigation.navigate('Card');
  };
  //  const HandelTouch = async () => {};
  return (
    <LinearGradient
      colors={['#c0392b', '#f1c40f', '#8e44ad']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 1}}
      style={Styles.button}>
      <ScrollView>
        <Pressable style={Styles.Card}>
          <Text style={Styles.Text}>ID</Text>
          <Text style={Styles.Text}>Name</Text>
          <Text style={Styles.Text}>DOB</Text>
          <Text style={Styles.Text}>Status</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={e => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
        <Pressable
          style={Styles.Card}
          onPress={() => {
            HandelChanged('madhan');
          }}>
          <Text style={Styles.Text}>24</Text>
          <Text style={Styles.Text}>Madhan</Text>
          <Text style={Styles.Text}>27/04/1999</Text>
          <Text style={Styles.Text}>Active</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
};

const Styles = StyleSheet.create({
  button: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    height: screenWidth - Platform.select({ios: -455, android: -550}),
  },
  Card: {
    borderWidth: 1,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 10,
  },
  Text: {
    color: '#fff',
    fontSize: 20,
  },
});
