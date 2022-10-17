import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import {Checkbox} from './checkbox';
// import {Input} from './input';
import {QuestionCard} from './questionCard';
// import {Radio} from './radio';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const Parent = ({navigation, route}) => {
  // console.log(navigation);
  // console.log(route);
  // console.log(props, 'props');
  const [name, SetName] = useState('');
  const [QuestionSections, SetQuestionSections] = useState([]);
  const [index, SetIndex] = useState(0);
  const [Status, SetStatus] = useState(false);
  // const [toggler, SetToggler] = useState(false);
  useEffect(() => {
    data();
    GetQuestions();
  }, []);

  const GetQuestions = async () => {
    SetStatus(false);
    await axios
      .get('https://jsons-ervermock.herokuapp.com/ParentQuestions')
      .then(({data}) => {
        SetQuestionSections(data[0].Questions);
        SetStatus(true);
      })
      .catch(err => console.error(err));
  };
  const data = async () => {
    const key = await AsyncStorage.getItem('key');
    SetName(key);
  };
  return Status ? (
    <View>
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
        <Text style={Styles.Title}>{QuestionSections[index]?.Section}</Text>
        <QuestionCard
          QuestionSections={QuestionSections}
          index={index}
          SetIndex={SetIndex}
        />
      </LinearGradient>
    </View>
  ) : (
    <LinearGradient
      colors={['#c0392b', '#f1c40f', '#8e44ad']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 1}}
      style={Styles.button}>
      <View style={[Loading.container, Loading.horizontal]}>
        <ActivityIndicator color="#ffffff" size="large" />
      </View>
    </LinearGradient>
  );
};

const Styles = StyleSheet.create({
  condition: {
    fontSize: 20,
  },
  scrollView: {
    // marginbottom: 0,
    flex: 1,
    height: screenHeight,
    borderWidth: 1,
  },
  button: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    height: screenHeight,
  },
  Card: {
    borderWidth: 1,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 1,
    marginBottom: 50,
  },
  Text: {
    color: 'white',
    fontSize: 17,
  },
  buttonText: {
    fontSize: 20,
    color: 'orange',
    textAlign: 'center',
  },
  buttons: {
    padding: 10,
    borderWidth: 1,
    width: screenWidth / 3,
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
    fontSize: 20,
    marginBottom: 30,
  },
  BottomText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
});

const Loading = StyleSheet.create({
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
