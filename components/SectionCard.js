import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const {width: screenWidth} = Dimensions.get('window');
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Student} from './student';
import {Parent} from './parent';
import * as RNLocalize from 'react-native-localize';
import en from '../language/en.json';
import fr from '../language/fr.json';
import ge from '../language/ge.json';

const Tab = createMaterialTopTabNavigator();

export const SectionCard = ({navigation}) => {
  const [Res, SetRes] = useState({});
  const [Tags, SetTags] = useState({});

  console.log('Res', Res);

  // console.log(QuestionSections);
  useEffect(() => {
    const lang = RNLocalize.findBestAvailableLanguage(['de', 'en', 'fr']);
    console.log('language', lang);
    lang.languageTag === 'en'
      ? SetTags(en)
      : lang.languageTag === 'fr'
      ? SetTags(fr)
      : SetTags(ge);
    data();
  }, []);

  const data = async () => {
    let student = await AsyncStorage.getItem('student');
    SetRes(JSON.parse(student));
  };
  return (
    <View style={Styles.TopBar}>
      {Res !== {} ? (
        <View style={Styles.Card}>
          <Text style={Styles.Text}>
            {Tags.ID}:- {Res?.id}
          </Text>
          <Text style={Styles.Text}>
            {Tags.Name}:- {Res?.name}
          </Text>
          <Text style={Styles.Text}>
            {Tags.Age}:- {Res?.age}
          </Text>
          <Text style={Styles.Text}>
            {Tags.School}:- {Res?.school}
          </Text>
        </View>
      ) : (
        ''
      )}
      <View style={Styles.ButtonContainor}>
        <View style={Styles.login}>
          <Pressable
            onPress={() => {
              navigation.navigate('Profile');
            }}
            style={Styles.buttons}>
            <Text style={Styles.buttonText}>{Tags?.Buttons?.ViewProfile}</Text>
          </Pressable>
        </View>
      </View>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            tabBarStyle: {
              backgroundColor: 'white',
              color: 'black',
            },
          }}
          name="Student"
          component={Student}
        />
        <Tab.Screen
          options={{
            tabBarStyle: {
              backgroundColor: '#white',
            },
          }}
          name="Parent"
          component={Parent}
        />
      </Tab.Navigator>
    </View>
  );
};

const Styles = StyleSheet.create({
  TopBar: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
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
  },
  Text: {
    color: 'black',
    fontSize: 20,
  },
  Containor: {
    borderWidth: 1,
    padding: 20,
    margin: 10,
    borderRadius: 8,
  },
  buttons: {
    padding: 10,
    width: screenWidth - 250,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'orange',
    textAlign: 'center',
  },
  login: {
    margin: 7,
  },
  ButtonContainor: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
