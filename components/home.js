import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});

const {height: screenHeight, width: screenWidth} = Dimensions.get('window');
// import AsyncStorage from '@react-native-async-storage/async-storage';
let data;
export const HomeSection = ({navigation}) => {
  const [users, SetUsers] = useState([]);
  console.log(users);
  useEffect(() => {
    GetAuth();
    GetStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GetAuth = async () => {
    data = await AsyncStorage.getItem('auth');
    if (data === undefined || null || false) {
      console.log(data, 'data on top');
      navigation.navigate('Login');
    }
  };

  const GetStudents = async () => {
    // axios
    //   .get('https://pg-admin-students.herokuapp.com/getStudents')
    //   .then(res => {
    //     SetUsers(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    db.transaction(tx => {
      let temp = [];
      tx.executeSql('SELECT * FROM StudentData', [], (txt, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i).StudentData);
          console.log('StudentData in student section', JSON.parse(temp));
        }
        SetUsers(JSON.parse(temp));
      });
    });
  };

  const HandelChanged = async e => {
    // await AsyncStorage.setItem('key', JSON.stringify(e));

    navigation.navigate({
      name: 'Sections',
      params: {postTitle: 'An okay post'},
    });
  };

  return (
    <LinearGradient
      colors={['#c0392b', '#f1c40f', '#8e44ad']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 1}}
      style={Styles.button}>
      <View>
        {users?.map((user, index) => {
          return (
            <View key={index} style={Styles.box}>
              <Pressable
                style={Styles.Card}
                onPress={e => {
                  HandelChanged(user);
                }}>
                <Text style={Styles.Text}>{user.name}</Text>
                <Text style={Styles.Text}>{user.age}</Text>
                <Text style={Styles.Text}>{user.parent}</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
      <View style={Styles.ButtonContainor}>
        <View style={Styles.login}>
          <Pressable
            onPress={() => navigation.navigate('StudentForm')}
            style={Styles.buttons}>
            <Text style={Styles.buttonText}>Student Details</Text>
          </Pressable>
        </View>
        <View style={Styles.login}>
          <Pressable
            onPress={() => navigation.navigate('ParentForm')}
            style={Styles.buttons}>
            <Text style={Styles.buttonText}>Parent Details</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

const Styles = StyleSheet.create({
  containor: {
    flex: 1,
  },
  box: {
    marginBottom: 20,
    borderRadius: 5,
    justifyContent: 'space-evenly',
  },
  button: {
    paddingVertical: 0,
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
    padding: 7,
  },
  Text: {
    color: '#fff',
    fontSize: 20,
  },
  Scroll: {
    height: 600,
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
    flex: 0.8,
    // borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

{
  /* <Pressable style={Styles.Card}>
        <Text style={Styles.Text}>ID</Text>
        <Text style={Styles.Text}>Name</Text>
        <Text style={Styles.Text}>DOB</Text>
      </Pressable>
      <SafeAreaView style={Styles.containor}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={Styles.containor}>
          {users.map((user, index) => {
            return (
              <View key={index} style={Styles.box}>
                <Pressable
                  style={Styles.Card}
                  onPress={e => {
                    HandelChanged(user);
                  }}>
                  <Text style={Styles.Text}>{user.student_id}</Text>
                  <Text style={Styles.Text}>{user.name}</Text>
                  <Text style={Styles.Text}>{user.dob}</Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView> */
}
