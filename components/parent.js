import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Radio} from './radio';
const {width: screenWidth} = Dimensions.get('window');

export const Parent = ({navigation}) => {
  const [name, SetName] = useState('');
  const [QuestionSections, SetQuestionSections] = useState([]);
  const [index, SetIndex] = useState(0);
  // console.log(QuestionSections);
  useEffect(() => {
    data();
    GetQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log('Question in the array', QuestionSections);

  // if (QuestionSections !== []) {
  //   console.log('Question in the array', QuestionSections[0].Questions[index]);
  // }
  const GetQuestions = async () => {
    // SetQuestionSections([]);
    await axios
      .get('https://jsons-ervermock.herokuapp.com/ParentQuestions')
      .then(({data}) => {
        SetQuestionSections(data[0].Questions);
        // console.log('inside', data[0].Questions);
      })
      .catch(err => console.error(err));
  };
  const data = async () => {
    const key = await AsyncStorage.getItem('key');
    SetName(key);
    // QuestionSections.map(e => {
    //   console.log('mapping', e);
    // });
  };
  console.log(index);
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
      <Text style={Styles.Title}>
        Section:-{QuestionSections[index]?.Section}
      </Text>
      <Text style={Styles.Text}>
        Question:-{index + 1}/{QuestionSections.length}
      </Text>
      <Text style={Styles.Title}>
        {index + 1}.{QuestionSections[index]?.question}
      </Text>
      {QuestionSections[index]?.options ? (
        <Radio data={QuestionSections[index]?.options} />
      ) : (
        ''
      )}
      <View style={Styles.buttonDiv}>
        <Pressable
          onPress={() => {
            if (index > 0) {
              SetIndex(index - 1);
            }
          }}
          style={Styles.buttons}>
          <Text style={Styles.buttonText}>Previous</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (index < QuestionSections.length - 1) {
              SetIndex(index + 1);
            }
          }}
          style={Styles.buttons}>
          <Text style={Styles.buttonText}>next</Text>
        </Pressable>
      </View>
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
  buttonText: {
    fontSize: 20,
    color: 'orange',
    textAlign: 'center',
  },
  buttons: {
    padding: 10,
    borderWidth: 1,
    width: screenWidth - 300,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  Containor: {
    borderWidth: 1,
    padding: 20,
    margin: 10,
    borderRadius: 8,
  },
  buttonDiv: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  Title: {
    color: 'white',
    fontSize: 30,
    marginBottom: 30,
  },
});
