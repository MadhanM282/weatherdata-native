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
import {QuestionCard} from './questionCard';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const Student = ({navigation, route}) => {
  // const [name, SetName] = useState([]);
  const [QuestionSections, SetQuestionSections] = useState({});
  const [index, SetIndex] = useState(0);
  const [Status, SetStatus] = useState(false);
  const [Responce, SetResponce] = useState([]);
  const [Res, SetRes] = useState({});

  console.log('Responce', Responce);
  useEffect(() => {
    data();
    GetQuestions();
  }, []);

  const GetQuestions = async () => {
    SetStatus(false);
    await axios
      .get('https://jsons-ervermock.herokuapp.com/StudentQuestions')
      .then(({data}) => {
        SetQuestionSections(data[0].Questions);
        SetStatus(true);
      })
      .catch(err => console.error(err));
  };
  const data = async () => {
    db.transaction(tx => {
      let temp = [];
      tx.executeSql('SELECT * FROM StudentData', [], (txt, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i).StudentData);
          console.log('StudentData in student section', JSON.parse(temp));
        }
        SetRes(JSON.parse(temp));
      });
    });
  };

  const DataBase = () => {
    db.transaction(function (tx) {
      tx.executeSql('INSERT INTO student (responce) VALUES (?)', [Responce]);
    });
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM student', [], (txt, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i).studentData);
        }
      });
    });
  };
  const CreateTable = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='student'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP sTABLE IF EXISTS student', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS student(responce NVARCHAR(100000))',
              [],
            );
          }
        },
      );
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
          <Text style={Styles.Text}>Name:-{Res.name}</Text>
          <Text style={Styles.Text}>Age:-{Res.age}</Text>
          <Text style={Styles.Text}>Gender:-{Res.gender}</Text>
        </Pressable>
        <Text style={Styles.Title}>{QuestionSections[index]?.Section}</Text>
        <QuestionCard
          QuestionSections={QuestionSections}
          index={index}
          SetIndex={SetIndex}
          SetResponce={SetResponce}
          Responce={Responce}
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
