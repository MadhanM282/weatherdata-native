import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});
import * as RNLocalize from 'react-native-localize';
import en from '../language/en.json';
import fr from '../language/fr.json';
import ge from '../language/ge.json';
import {Dropdown} from 'react-native-element-dropdown';
const Countries = [
  {label: 'english', value: 'en'},
  {label: 'french', value: 'fr'},
  {label: 'german', value: 'de'},
];

const {width: screenWidth} = Dimensions.get('window');
// import AsyncStorage from '@react-native-async-storage/async-storage';
let data;
export const HomeSection = ({navigation}) => {
  const [users, SetUsers] = useState([]);
  console.log('user in home section', users);
  const [Tags, SetTags] = useState({});
  const [UserId, SetUserID] = useState('');
  const [language, SetLanguage] = useState('');

  useEffect(() => {
    // console.log(RNLocalize.findBestAvailableLanguage(['de', 'en', 'fr']));
    const lang = RNLocalize.findBestAvailableLanguage(['de', 'en', 'fr']);
    console.log('language', lang);
    lang.languageTag === 'en'
      ? SetTags(en)
      : lang.languageTag === 'fr'
      ? SetTags(fr)
      : SetTags(ge);
    GetAuth();
    GetStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GetAuth = async () => {
    try {
      const Userid = await AsyncStorage.getItem('userid', data.id);
      SetUserID(Userid);
      data = await AsyncStorage.getItem('auth');
      if (data === undefined || null || false) {
        // console.log(data, 'data on top');
        navigation.navigate('Login');
      }
    } catch (e) {
      console.log(e.message);
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
          // console.log(
          //   'StudentData in student section in home page',
          //   JSON.parse(temp),
          // );
        }
        SetUsers(JSON.parse(temp));
      });
    });
  };

  const HandelChanged = async e => {
    await AsyncStorage.setItem('student', JSON.stringify(e));

    navigation.navigate({
      name: 'Sections',
      params: {postTitle: 'An okay post'},
    });
  };

  const HandelChangeDropdown = (e, id) => {
    SetLanguage(e);
  };

  return (
    <ScrollView style={Styles.button}>
      <View style={{backgroundColor: 'white', paddingTop: 10}}>
        <DropDownTag
          data={Countries}
          HandelSelect={HandelChangeDropdown}
          label={'Select Language'}
          id={'Language'}
        />
      </View>
      <View>
        <Pressable style={Styles.Card}>
          <Text style={Styles.Text}>{Tags?.ID}</Text>
          <Text style={Styles.Text}>{Tags?.Name}</Text>
          <Text style={Styles.Text}>{Tags?.Age}</Text>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Text style={[Styles.Text, {flexGrow: 2}]}>{Tags?.School}</Text>
        </Pressable>
        {users.length > 0
          ? users.map((user, index) => {
              // console.log('user', user);
              return (
                <View key={index} style={Styles.box}>
                  <Pressable
                    style={Styles.Card}
                    onPress={e => {
                      HandelChanged(user);
                    }}>
                    <Text style={Styles.Text}>{user?.id}</Text>

                    <Text style={Styles.Text}>{user?.name}</Text>
                    <Text style={Styles.Text}>{user?.age}</Text>
                    {/* eslint-disable-next-line react-native/no-inline-styles */}
                    <Text style={[Styles.Text, {flexGrow: 2}]}>
                      {user?.school}
                    </Text>
                  </Pressable>
                </View>
              );
            })
          : ''}
      </View>
      <View style={Styles.ButtonContainor}>
        <View style={Styles.login}>
          <Pressable
            onPress={() => navigation.navigate('StudentForm')}
            style={Styles.buttons}>
            <Text style={Styles.buttonText}>{Tags?.Buttons?.AddStudent}</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const DropDownTag = ({data, label, HandelSelect, id}) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (null || isFocus) {
      return (
        <Text
          style={[DropdownStyle.label, isFocus && DropdownStyle.labelColor]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={DropdownStyle.container}>
      {renderLabel()}
      <Dropdown
        style={[
          DropdownStyle.dropdown,
          isFocus && DropdownStyle.DropdownOnFocus,
        ]}
        placeholderStyle={DropdownStyle.placeholderStyle}
        selectedTextStyle={DropdownStyle.selectedTextStyle}
        inputSearchStyle={DropdownStyle.inputSearchStyle}
        iconStyle={DropdownStyle.iconStyle}
        itemTextStyle={DropdownStyle.itemTextStyle}
        containerStyle={DropdownStyle.containerStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? label : '...'}
        searchPlaceholder="Search..."
        value={null}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          HandelSelect(item.label, id);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const DropdownStyle = StyleSheet.create({
  container: {
    padding: 6,
    width: screenWidth / 2,
    // marginTop: 5,
  },
  dropdown: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
  },
  icon: {
    marginRight: 5,
  },
  labelColor: {
    color: 'black',
  },
  label: {
    position: 'absolute',
    left: 5,
    top: -13,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 20,
  },
  placeholderStyle: {
    fontSize: 20,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 20,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
  itemTextStyle: {
    color: 'black',
  },
  containerStyle: {
    borderRadius: 9,
  },
  DropdownOnFocus: {
    borderColor: 'blue',
    fontSize: 20,
  },
});

const Styles = StyleSheet.create({
  containor: {
    flex: 1,
  },
  box: {
    marginBottom: 20,
    borderRadius: 5,
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: 'white',
  },
  Card: {
    borderBottomWidth: 1,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 7,
  },
  Text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    flexGrow: 0,
    overflow: 'hidden',
    // flexShrink: 1,
    flexBasis: screenWidth / 4.3,
  },
  Scroll: {
    height: 600,
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
  ButtonContainor: {
    flex: 0.8,
    // borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
