import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Dimensions, Platform, Pressable, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const {width: screenWidth} = Dimensions.get('window');

export const SectionCard = ({navigation}) => {
  const [name, SetName] = useState('');
  const [QuestionSections, SetQuestionSections] = useState([]);
  // console.log(QuestionSections);
  useEffect(() => {
    data();
    GetQuestions();
  }, []);

  const GetQuestions = async () => {
    await axios
      .get('https://jsons-ervermock.herokuapp.com/StudentQuestions')
      .then(({data}) => {
        SetQuestionSections(data);
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
      {QuestionSections.map((e, i) => {
        return (
          <Pressable
            onPress={b => {
              console.log(b);
            }}
            style={Styles.Containor}
            key={i}>
            <Text style={Styles.Text}>
              {i + 1}.{e.Title}
            </Text>
          </Pressable>
        );
      })}
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
    marginBottom: 50,
  },
  Text: {
    color: '#fff',
    fontSize: 20,
  },
  Containor: {
    borderWidth: 1,
    padding: 20,
    margin: 10,
    borderRadius: 8,
  },
});
