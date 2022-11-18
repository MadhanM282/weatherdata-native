/* eslint-disable no-alert */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
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
import {openDatabase} from 'react-native-sqlite-storage';
import {DropDown} from './dropdown';
import {Countries} from './list';
const {width: screenWidth} = Dimensions.get('window');
var db = openDatabase({name: 'UserDatabase.db'});
import * as RNLocalize from 'react-native-localize';
import en from '../language/en.json';
import fr from '../language/fr.json';
import ge from '../language/ge.json';

const Schools = [
  {label: 'Delhi Public School', value: '1'},
  {label: 'Kendra vidhyalayam', value: '2'},
  {label: 'Depaul', value: '3'},
];
export const StudentForm = ({navigation}) => {
  // const dim = Dimensions.get('screen');
  // console.log('dimensions', dim);
  const [Students, SetStudents] = useState([]);
  const [Tags, SetTags] = useState({});

  // console.log('List in student form', Students);
  const [studentDetails, SetStudentDetails] = useState({
    name: '',
    id: '',
    age: '',
    gender: '',
    ethnicity: '',
    country: '',
    school: '',
  });

  useEffect(() => {
    const lang = RNLocalize.findBestAvailableLanguage(['de', 'en', 'fr']);
    console.log('language', lang);
    lang.languageTag === 'en'
      ? SetTags(en)
      : lang.languageTag === 'fr'
      ? SetTags(fr)
      : SetTags(ge);
    CreateTable();
  }, []);

  const DataBase = async () => {
    Students.push(studentDetails);
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM StudentData');
      tx.executeSql('INSERT INTO StudentData (StudentData) VALUES (?)', [
        JSON.stringify(Students),
      ]);
    });
  };
  const CreateTable = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='StudentData'",
        [],
        function (tx, res) {
          // console.log('item:', res.rows);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS StudentData', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS StudentData(StudentData NVARCHAR(10000))',
              [],
            );
          }
        },
      );
    });
    db.transaction(tx => {
      let temp = [];
      tx.executeSql('SELECT * FROM StudentData', [], (txt, results) => {
        // console.log('results', results);
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i).StudentData);
          // console.log('StudentData', JSON.parse(temp));
        }
        SetStudents(JSON.parse(temp));
      });
    });
  };
  const HandelChange = (e, id) => {
    SetStudentDetails({...studentDetails, [id]: e});
  };
  return (
    <ScrollView style={Loading.button}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={Styles.containor}>
        <View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>{Tags.Name}</Text>
            <TextInput
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'name')}
              defaultValue={''}
              placeholderTextColor="#818589"
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>{Tags.ID}</Text>
            <TextInput
              keyboardType="number-pad"
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'id')}
              defaultValue={''}
              placeholderTextColor="#818589"
            />
          </View>
          <View style={Loading.container}>
            <DropDown
              data={Schools}
              HandelSelect={HandelChange}
              label={'Select School'}
              id={'school'}
            />
          </View>
          <View style={Loading.container}>
            <DropDown
              data={Countries}
              HandelSelect={HandelChange}
              label={'Select Country'}
              id={'country'}
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>{Tags.Age}</Text>
            <TextInput
              keyboardType="number-pad"
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'age')}
              defaultValue={''}
              placeholderTextColor="#818589"
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>{Tags.Gender}</Text>
            <TextInput
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'gender')}
              defaultValue={''}
              placeholderTextColor="#818589"
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>{Tags.Ethnicity}</Text>
            <TextInput
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'ethnicity')}
              defaultValue={''}
              placeholderTextColor="#818589"
            />
          </View>
          <View style={Styles.ButtonContainor}>
            <View style={Styles.login}>
              <Pressable
                onPress={async () => {
                  if (studentDetails.name === '') {
                    alert('enter Name');
                  } else if (studentDetails.age === '') {
                    alert('enter age');
                  } else if (studentDetails.gender === '') {
                    alert('enter gender');
                  } else if (studentDetails.ethnicity === '') {
                    alert('enter ethnicity');
                  } else if (studentDetails.id === '') {
                    alert('enter id');
                  } else if (studentDetails.school === '') {
                    alert('Select School Name');
                  } else if (studentDetails.country === '') {
                    alert('Select Country');
                  } else {
                    await AsyncStorage.setItem(
                      'student',
                      JSON.stringify(studentDetails),
                    );
                    DataBase();
                    navigation.navigate('Home');
                  }
                }}
                style={Styles.buttons}>
                <Text style={Styles.buttonText}>{Tags?.Buttons?.Save}</Text>
              </Pressable>
            </View>
            <View style={Styles.login}>
              <Pressable
                onPress={async () => {
                  if (studentDetails.name === '') {
                    alert('enter Name');
                  } else if (studentDetails.age === '') {
                    alert('enter age');
                  } else if (studentDetails.gender === '') {
                    alert('enter gender');
                  } else if (studentDetails.ethnicity === '') {
                    alert('enter ethnicity');
                  } else if (studentDetails.id === '') {
                    alert('enter id');
                  } else if (studentDetails.school === '') {
                    alert('Select School Name');
                  } else if (studentDetails.country === '') {
                    alert('Select Country');
                  } else {
                    await AsyncStorage.setItem(
                      'student',
                      JSON.stringify(studentDetails),
                    );
                    DataBase();
                    navigation.navigate('ParentForm');
                  }
                }}
                style={Styles.buttons}>
                <Text style={Styles.buttonText}>
                  {Tags?.Buttons?.AddParentDetails}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  containor: {
    flex: 1,
  },
  TextFields: {
    width: screenWidth - 30,
    height: 50,
    borderBottomWidth: 1,
    marginBottom: 9,
    marginTop: -9,
    borderColor: 'black',
    fontSize: 20,
    marginLeft: 6,
    color: 'black',
  },
  Text: {
    fontSize: 20,
    color: 'black',
    marginLeft: 6,
    fontFamily: 'bolder',
  },
  buttons: {
    padding: 10,
    width: screenWidth / 2.5,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'orange',
    textAlign: 'center',
  },
  ButtonContainor: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

const Loading = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  container: {
    width: screenWidth,
    justifyContent: 'center',
  },
});
