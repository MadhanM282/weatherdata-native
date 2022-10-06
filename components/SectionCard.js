import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
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

export const SectionCard = ({navigation}) => {
  const [name, SetName] = useState('');
  useEffect(() => {
    data();
    GetQuestions();
  }, []);

  const GetQuestions = async () => {
    await axios
      .get('http://localhost:3000/StudentQuestions')
      .then(({data}) => {
        console.log(data);
      })
      .catch(err => console.error(err));
  };

  const data = async () => {
    const key = await AsyncStorage.getItem('key');
    SetName(key);
  };
  return (
    <LinearGradient
      colors={['#c0392b', '#f1c40f', '#8e44ad']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 1}}
      style={Styles.button}>
      <Pressable style={Styles.Card}>
        <Text style={Styles.Text}>ID:-{24}</Text>
        <Text style={Styles.Text}>Name:-{name}</Text>
        <Text style={Styles.Text}>DOB:-27/04/1999</Text>
        <Text style={Styles.Text}>Status:- Active</Text>
      </Pressable>
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
    padding: 8,
  },
  Text: {
    color: '#fff',
    fontSize: 20,
  },
});
