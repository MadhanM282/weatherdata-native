import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
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
import {openDatabase} from 'react-native-sqlite-storage';
const {height: screenHeight, width: screenWidth} = Dimensions.get('window');
var db = openDatabase({name: 'UserDatabase.db'});

export const StudentForm = ({navigation}) => {
  // const dim = Dimensions.get('screen');
  // console.log('dimensions', dim);
  const [Students, SetStudents] = useState([]);
  console.log('List', Students);
  const [studentDetails, SetStudentDetails] = useState({
    name: '',
    parent: '',
    id: '',
    age: '',
    gender: '',
    ethnicity: '',
  });
  const [Res, SetRes] = useState({});
  console.log(Res);
  useEffect(() => {
    CreateTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const DataBase = async () => {
    SetStudents([...Students, studentDetails]);
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM StudentData');
      tx.executeSql('INSERT INTO StudentData (StudentData) VALUES (?)', [
        JSON.stringify(Students),
      ]);
    });
    db.transaction(tx => {
      let temp = [];
      tx.executeSql('SELECT * FROM StudentData', [], (txt, results) => {
        console.log('results', results);
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i).StudentData);
          console.log('StudentData', JSON.parse(temp));
        }
        SetRes(JSON.parse(temp));
      });
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
          console.log('StudentData', JSON.parse(temp));
        }
        SetStudents([...Students, JSON.parse(temp)]);
      });
    });
  };
  const HandelChange = (e, id) => {
    SetStudentDetails({...studentDetails, [id]: e});
  };
  // console.log(studentDetails);
  return (
    <LinearGradient
      colors={['#c0392b', '#f1c40f', '#8e44ad']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 1}}
      style={Loading.button}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={Styles.containor}>
        <View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>Name</Text>
            <TextInput
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'name')}
              defaultValue={''}
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>Enter ID</Text>
            <TextInput
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'id')}
              defaultValue={''}
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>
              Name of Participating parents in the study
            </Text>
            <TextInput
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'parent')}
              defaultValue={''}
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>Age (years)</Text>
            <TextInput
              keyboardType="number-pad"
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'age')}
              defaultValue={''}
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>Gender</Text>
            <TextInput
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'gender')}
              defaultValue={''}
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>Ethnicity</Text>
            <TextInput
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'ethnicity')}
              defaultValue={''}
            />
          </View>
          <View style={Styles.ButtonContainor}>
            <View style={Styles.login}>
              <Pressable
                onPress={() => {
                  if (studentDetails.name === '') {
                    alert('enter Name');
                  } else if (studentDetails.parent === '') {
                    alert('enter Parent Name');
                  } else if (studentDetails.age === '') {
                    alert('enter age');
                  } else if (studentDetails.gender === '') {
                    alert('enter gender');
                  } else if (studentDetails.ethnicity === '') {
                    alert('enter ethnicity');
                  } else {
                    DataBase();
                    navigation.navigate('Sections');
                  }
                }}
                style={Styles.buttons}>
                <Text style={Styles.buttonText}>Save</Text>
              </Pressable>
            </View>
            <View style={Styles.login}>
              <Pressable
                onPress={() => {
                  if (studentDetails.name === '') {
                    alert('enter Name');
                  } else if (studentDetails.parent === '') {
                    alert('enter Parent Name');
                  } else if (studentDetails.age === '') {
                    alert('enter age');
                  } else if (studentDetails.gender === '') {
                    alert('enter gender');
                  } else if (studentDetails.ethnicity === '') {
                    alert('enter ethnicity');
                  } else {
                    DataBase();
                    navigation.navigate('ParentForm');
                  }
                }}
                style={Styles.buttons}>
                <Text style={Styles.buttonText}>Parent Details</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const Styles = StyleSheet.create({
  containor: {
    flex: 1,
  },
  TextFields: {
    width: screenWidth - 30,
    height: 60,
    borderBottomWidth: 2,
    marginBottom: 9,
    marginTop: -9,
    borderColor: 'white',
    fontSize: 20,
    color: 'white',
  },
  Text: {
    fontSize: 20,
    color: 'white',
  },
  buttons: {
    padding: 10,
    width: screenWidth / 3,
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
    paddingVertical: 3,
    paddingHorizontal: 10,
    height: screenHeight,
  },
  container: {
    width: screenWidth,
    justifyContent: 'center',
  },
});
