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
import {openDatabase} from 'react-native-sqlite-storage';
import {QuestionCard} from './questionCard';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
var db = openDatabase({name: 'UserDatabase.db'});

export const Parent = ({navigation, route}) => {
  const [name, SetName] = useState([]);
  const [QuestionSections, SetQuestionSections] = useState({});
  const [index, SetIndex] = useState(0);
  const [Status, SetStatus] = useState(false);
  const [ParentResponse, SetParentResponse] = useState({});
  const [StudentResponse, SetStudentResponse] = useState({});
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
    db.transaction(tx => {
      let temp = [];
      tx.executeSql('SELECT * FROM ParentData', [], (txt, results) => {
        console.log('results', results);
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i).ParentData);
          console.log('ParentData', JSON.parse(temp));
        }
        SetParentResponse(JSON.parse(temp));
      });
    });
    db.transaction(tx => {
      let temp = [];
      tx.executeSql('SELECT * FROM StudentData', [], (txt, results) => {
        console.log('results', results);
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i).StudentData);
          console.log('StudentData', JSON.parse(temp));
        }
        SetStudentResponse(JSON.parse(temp));
      });
    });
  };
  return Status ? (
    <View>
      <LinearGradient
        colors={['#c0392b', '#f1c40f', '#8e44ad']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}
        style={Styles.button}>
        <Pressable style={Styles.Card}>
          <Text style={Styles.Text}>Name:-{StudentResponse.parent}</Text>
          <Text style={Styles.Text}>Status:-{ParentResponse.occupation}</Text>
          <Text style={Styles.Text}>DOB:-{ParentResponse.age}</Text>
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
