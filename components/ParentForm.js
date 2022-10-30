import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const {height: screenHeight, width: screenWidth} = Dimensions.get('window');
import {RadioButton} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});

export const ParentForm = ({navigation}) => {
  const [studentDetails, SetStudentDetails] = useState({
    age: '',
    ethnicgroup: '',
    maritalstatus: '',
    childcount: '',
    religion: '',
    education: '',
    occupation: '',
    income: '',
  });
  const [Res, SetRes] = useState({});
  console.log(Res);
  useEffect(() => {
    CreateTable();
  }, []);
  const DataBase = async () => {
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM ParentData');
      tx.executeSql('INSERT INTO ParentData (ParentData) VALUES (?)', [
        JSON.stringify(studentDetails),
      ]);
    });
    db.transaction(tx => {
      let temp = [];
      tx.executeSql('SELECT * FROM ParentData', [], (txt, results) => {
        console.log('results', results);
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i).ParentData);
          console.log('ParentData', JSON.parse(temp));
        }
        SetRes(JSON.parse(temp));
      });
    });
  };
  const CreateTable = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='ParentData'",
        [],
        function (tx, res) {
          console.log('item:', res.rows);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS ParentData', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS ParentData(ParentData NVARCHAR(10000))',
              [],
            );
          }
        },
      );
    });
  };
  console.log(studentDetails);
  const HandelChange = (e, id) => {
    SetStudentDetails({...studentDetails, [id]: e});
  };
  const HandelRadio = (e, id) => {
    console.log(e);
    SetStudentDetails({...studentDetails, [id]: e});
  };
  return (
    <LinearGradient
      colors={['#c0392b', '#f1c40f', '#8e44ad']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 1}}
      style={Loading.button}>
      <View>
        <View style={Loading.container}>
          <Text style={Styles.Text}>What is your age?</Text>
          <TextInput
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
            style={Styles.TextFields}
            keyboardType="number-pad"
            placeholder="Enter your Answer.."
            onChangeText={newText => HandelChange(newText, 'childcount')}
            defaultValue={''}
          />
        </View>
        <View style={Loading.container}>
          <Text style={Styles.Text}>
            What is your highest level of education? Please tick appropriate box
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
                if (studentDetails.age === '') {
                  alert('enter age');
                } else if (studentDetails.ethnicgroup === '') {
                  alert('enter ethnicgroup');
                } else if (studentDetails.maritalstatus === '') {
                  alert('enter maritalstatus');
                } else if (studentDetails.childcount === '') {
                  alert('enter childcount');
                } else if (studentDetails.religion === '') {
                  alert('enter religion');
                } else if (studentDetails.education === '') {
                  alert('enter education');
                } else if (studentDetails.occupation === '') {
                  alert('enter occupation');
                } else if (studentDetails.income === '') {
                  alert('enter income');
                } else {
                  DataBase();
                  navigation.navigate('Sections');
                }
              }}
              style={Styles.buttons}>
              <Text style={Styles.buttonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const Radio = ({HandelRadio, id, label}) => {
  // console.log(label);
  const [value, setValue] = useState(0);
  // console.log('Value', value);
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
    borderColor: 'white',
    fontSize: 20,
    color: 'white',
  },
  Text: {
    fontSize: 20,
    color: 'white',
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
