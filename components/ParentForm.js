/* eslint-disable no-alert */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
const {height: screenHeight, width: screenWidth} = Dimensions.get('window');
import {RadioButton} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';
import {DropDown} from './dropdown';
import {Countries} from './list';
var db = openDatabase({name: 'UserDatabase.db'});

export const ParentForm = ({navigation}) => {
  const [Students, SetStudents] = useState([]);
  // console.log('Students', Students);

  const [ParentDetails, SetParentDetails] = useState({
    studentid: '',
    name: '',
    email: '',
    mobile: '',
    country: '',
    age: '',
    ethnicgroup: '',
    maritalstatus: '',
    childcount: '',
    religion: '',
    education: '',
    occupation: '',
    income: '',
  });

  useEffect(() => {
    StudentDetails();
    CreateTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const StudentDetails = async () => {
    let Student = await AsyncStorage.getItem('student');
    let ID = JSON.parse(Student);
    SetParentDetails({...ParentDetails, ['studentid']: ID.id});
    // console.log('local data', Student);
  };
  const DataBase = () => {
    // console.log('Students list', Students);
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM parentdetails');
      tx.executeSql('INSERT INTO parentdetails (parentdetails) VALUES (?)', [
        JSON.stringify(Students),
      ]);
    });
  };
  const CreateTable = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='parentdetails'",
        [],
        function (tx, res) {
          // console.log('item:', res.rows);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS parentdetails', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS parentdetails(parentdetails NVARCHAR(10000))',
              [],
            );
          }
        },
      );
    });
    db.transaction(tx => {
      let temp = [];
      tx.executeSql('SELECT * FROM parentdetails', [], (txt, results) => {
        // console.log('results', results);
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i).parentdetails);
          // console.log('parentdetails', JSON.parse(temp));
        }
        SetStudents(JSON.parse(temp));
      });
    });
  };
  // console.log('singleStudent', ParentDetails);
  const HandelChange = (e, id) => {
    ParentDetails[id] = e;
  };
  const HandelRadio = (e, id) => {
    ParentDetails[id] = e;
  };

  return (
    <ScrollView style={Loading.button}>
      <KeyboardAvoidingView style={Styles.key}>
        <View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>Enter Parent/Gardian Name</Text>
            <TextInput
              placeholderTextColor="#818589"
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'name')}
              defaultValue={''}
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>Enter Your email</Text>
            <TextInput
              placeholderTextColor="#818589"
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'email')}
              defaultValue={''}
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>Enter Your Mobile Number</Text>
            <TextInput
              placeholderTextColor="#818589"
              keyboardType="number-pad"
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'mobile')}
              defaultValue={''}
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
            <Text style={Styles.Text}>What is your age?</Text>
            <TextInput
              placeholderTextColor="#818589"
              keyboardType="number-pad"
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'age')}
              defaultValue={''}
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>What is your Ethnic group?</Text>
            <TextInput
              placeholderTextColor="#818589"
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'ethnicgroup')}
              defaultValue={''}
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>What is your religion?</Text>
            <Radio
              HandelRadio={HandelRadio}
              id={'religion'}
              label={['Hindu', 'Christian', 'Muslim']}
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>What is your marital status?</Text>
            <Radio
              HandelRadio={HandelRadio}
              id={'maritalstatus'}
              label={['Married', 'Single']}
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>
              What is your household average income per month?
            </Text>
            <TextInput
              placeholderTextColor="#818589"
              keyboardType="number-pad"
              style={Styles.TextFields}
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'income')}
              defaultValue={''}
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>How many children do you have?</Text>
            <TextInput
              placeholderTextColor="#818589"
              style={Styles.TextFields}
              keyboardType="number-pad"
              placeholder="Enter your Answer.."
              onChangeText={newText => HandelChange(newText, 'childcount')}
              defaultValue={''}
            />
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>
              What is your highest level of education? Please tick appropriate
              box
            </Text>
            <View>
              <Radio
                HandelRadio={HandelRadio}
                id={'education'}
                label={['No Formal', 'Primary', 'Secondary', 'Tertiary']}
              />
            </View>
          </View>
          <View style={Loading.container}>
            <Text style={Styles.Text}>
              What is your occupation status? Please tick appropriate box
            </Text>
            <Radio
              HandelRadio={HandelRadio}
              id={'occupation'}
              label={['Domestic duties', 'Professional', 'Casual worker']}
            />
          </View>
          <View style={Styles.ButtonContainor}>
            <View style={Styles.login}>
              <Pressable
                onPress={() => {
                  if (ParentDetails.age === '') {
                    alert('enter age');
                  } else if (ParentDetails.ethnicgroup === '') {
                    alert('enter ethnicgroup');
                  } else if (ParentDetails.maritalstatus === '') {
                    alert('enter maritalstatus');
                  } else if (ParentDetails.childcount === '') {
                    alert('enter childcount');
                  } else if (ParentDetails.religion === '') {
                    alert('enter religion');
                  } else if (ParentDetails.education === '') {
                    alert('enter education');
                  } else if (ParentDetails.occupation === '') {
                    alert('enter occupation');
                  } else if (ParentDetails.income === '') {
                    alert('enter income');
                  } else {
                    Students.push(ParentDetails);
                    DataBase();
                    navigation.navigate('Home');
                  }
                }}
                style={Styles.buttons}>
                <Text style={Styles.buttonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const Radio = ({HandelRadio, id, label}) => {
  // console.log(label);
  const [value, setValue] = useState(0);
  // console.log('Value', value);
  useEffect(() => {
    HandelRadio(label[0], id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={Styles.containor}>
      {label.map((item, i) => {
        return (
          <RadioButton.Group
            key={i}
            onValueChange={newValue => {
              setValue(newValue);
              HandelRadio(item, id);
            }}
            value={value}>
            <Pressable
              onPress={() => {
                setValue(i);
                HandelRadio(item, id);
              }}
              style={Styles.box}>
              <RadioButton value={i} color="blue" />
              <Text style={Styles.Text}>{item}</Text>
            </Pressable>
          </RadioButton.Group>
        );
      })}
    </View>
  );
};

const Styles = StyleSheet.create({
  containor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  TextFields: {
    width: screenWidth - 30,
    height: 60,
    borderBottomWidth: 2,
    marginBottom: 9,
    marginTop: -9,
    borderColor: 'black',
    fontSize: 20,
    color: 'black',
    marginLeft: 5,
  },
  Text: {
    fontSize: 20,
    color: 'black',
    marginLeft: 5,
  },
  box: {
    flexDirection: 'row',
    paddingRight: 20,
    justifyContent: 'space-evenly',
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
  key: {
    flex: 1,
  },
});

const Loading = StyleSheet.create({
  button: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    height: screenHeight,
    backgroundColor: 'white',
  },
  container: {
    width: screenWidth,
    justifyContent: 'center',
  },
});
