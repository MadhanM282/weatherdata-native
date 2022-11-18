import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {Card} from 'react-native-shadow-cards';
var db = openDatabase({name: 'UserDatabase.db'});

import en from '../language/en.json';
import fr from '../language/fr.json';
import ge from '../language/ge.json';
import * as RNLocalize from 'react-native-localize';
const {height: screenHeight, width: screenWidth} = Dimensions.get('window');

export const Profile = ({navigation}) => {
  const [StudentData, SetStudent] = useState({});
  const [Res, SetRes] = useState({});
  const [Tags, SetTags] = useState({});

  // console.log('Parent', Res);

  useEffect(() => {
    // Data();
    const lang = RNLocalize.findBestAvailableLanguage(['de', 'en', 'fr']);
    console.log('language', lang);
    lang.languageTag === 'en'
      ? SetTags(en)
      : lang.languageTag === 'fr'
      ? SetTags(fr)
      : SetTags(ge);
    DataBase();
  }, []);

  const DataBase = async () => {
    const Student = await AsyncStorage.getItem('student');
    let ID = JSON.parse(Student);
    console.log('Student list', ID.id);
    SetStudent(JSON.parse(Student));

    // WHERE studentid = ${ID.id}
    db.transaction(tx => {
      let temp = [];
      //     SELECT * FROM parentdetails
      // INNER JOIN StudentData
      // ON parentdetails.studentid = Runs.id WHERE Runs.name = '012114'
      tx.executeSql('SELECT * FROM parentdetails', [], (txt, results) => {
        console.log('results', results);
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i).parentdetails);
        }
        let data = JSON.parse(temp);
        console.log('PArents list', data);
        let res = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].studentid === ID.id) {
            res.push(data[i]);
          }
        }
        // console.log('parentdetails', JSON.parse(temp));
        SetRes(res);
      });
    });
  };

  //   {
  //     "age": "36",
  //     "childcount": "2",
  //     "country": "United States of America",
  //     "education": "Tertiary",
  //     "email": "Richal@gmail.com",
  //     "ethnicgroup": "American",
  //     "income": "100000",
  //     "maritalstatus": "Married",
  //     "mobile": "",
  //     "name": "Richal",
  //     "occupation": "Professional",
  //     "religion": "Christian",
  //     "studentid": "3"
  // }

  return (
    <View style={Style.containor}>
      <Text style={Style.Title}>Student Details :-</Text>
      <View style={Style.Card}>
        <Card style={Style.Shadow}>
          <Text style={Style.Text}>
            {Tags.ID}:- {StudentData.id}
          </Text>
          <Text style={Style.Text}>
            {Tags.Name}:- {StudentData.name}
          </Text>
          <Text style={Style.Text}>
            {Tags.Gender}:- {StudentData.gender}
          </Text>
          <Text style={Style.Text}>
            {Tags.Age}:- {StudentData.age}
          </Text>
          <Text style={Style.Text}>
            {Tags.Country}:- {StudentData.country}
          </Text>
          <Text style={Style.Text}>
            {Tags.School}:- {StudentData.school}
          </Text>
          <Text style={Style.Text}>
            {Tags.Ethnicity}:- {StudentData.ethnicity}
          </Text>
        </Card>
      </View>
      {Res.length > 0 ? (
        Res?.map(Parent => {
          return (
            <View key={Parent.studentid}>
              <Text style={Style.Title}>Parent Details :-</Text>
              <View style={Style.Card}>
                <Card style={Style.Shadow}>
                  <Text style={Style.Text}>
                    {Tags.Name}:- {Parent.name}
                  </Text>
                  <Text style={Style.Text}>
                    {Tags.Age}:- {Parent.age}
                  </Text>
                  <Text style={Style.Text}>
                    {Tags.Mobile}:- {Parent.mobile}
                  </Text>
                  <Text style={Style.Text}>
                    {Tags.Country}:- {Parent.country}
                  </Text>
                  <Text style={Style.Text}>
                    {Tags.Education}:- {Parent.education}
                  </Text>
                  <Text style={Style.Text}>
                    {Tags.Ethnicity}:- {Parent.ethnicgroup}
                  </Text>
                  <Text style={Style.Text}>
                    {Tags.Email}:- {Parent.email}
                  </Text>
                </Card>
              </View>
            </View>
          );
        })
      ) : (
        <View style={Style.ButtonContainor}>
          <Pressable
            style={Style.buttons}
            onPress={() => {
              navigation.navigate('ParentForm');
            }}>
            <Text style={Style.buttonText}>Add Parent Details</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const Style = StyleSheet.create({
  ButtonContainor: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50,
  },
  buttons: {
    padding: 10,
    width: screenWidth / 2,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'orange',
    textAlign: 'center',
  },
  containor: {
    // margin: 10,
    backgroundColor: 'white',
    height: screenHeight,
  },
  Title: {
    color: 'black',
    fontSize: 25,
    marginBottom: 20,
    marginLeft: 20,
  },
  Text: {
    color: 'black',
    fontSize: 20,
    margin: 5,
    fontFamily: 'bold',
  },
  Card: {
    alignItems: 'center',
    marginBottom: 50,
  },
  Shadow: {
    elevation: 15,
    cornerRadius: 10,
    padding: 10,
  },
});
