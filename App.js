/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import {useNetInfo} from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
// import {openDatabase} from 'react-native-sqlite-storage';
import {Login} from './components/login';
import {Register} from './components/register';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeSection} from './components/home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Error} from './components/Error';
import {StudentForm} from './components/StudentForm';
import {ParentForm} from './components/ParentForm';
import {SectionCard} from './components/SectionCard';
import {Profile} from './components/Profile';
import en from './language/en.json';
import fr from './language/fr.json';
import ge from './language/ge.json';
import * as RNLocalize from 'react-native-localize';
import {DropDown} from './components/dropdown';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
const Stack = createNativeStackNavigator();

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const {height: screenHeight, width: screenWidth} = Dimensions.get('window');

// var db = openDatabase({name: 'UserDatabase.db'});

const App = () => {
  // console.log(screenWidth, screenHeight);
  const isDarkMode = useColorScheme() === 'dark';
  const [Header, SetHeader] = useState({});
  const [Auth, SetAuth] = useState();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#ff5c33' : '#ff5c33',
  };
  // const NetInfo = useNetInfo();
  // const [Result, SetResults] = useState([]);
  useEffect(() => {
    SetHeader(en);
    GetAuth();
  }, [Auth]);
  console.log('auth', Auth);
  // const Data = JSON.stringify(Result);
  // CreateTable();
  // DataBase();

  const GetAuth = async () => {
    try {
      let data = await AsyncStorage.getItem('auth');
      let Userid = await AsyncStorage.getItem('userid');
      console.log('id', Userid);
      // await AsyncStorage.setItem('auth', 'false');
      SetAuth(JSON.parse(data));
      await axios
        .get('https://jwtath-1.herokuapp.com/user/6377101926037f5e941ec769')
        .then(({daa}) => {
          console.log('daa', daa);
        })
        .catch(err => console.log(err.message));
    } catch (err) {
      console.log(err);
    }
  };
  // const DataBase = () => {
  //   db.transaction(function (tx) {
  //     tx.executeSql('DELETE FROM Weather');
  //     tx.executeSql('INSERT INTO Weather (WeatherData) VALUES (?)', [Data]);
  //   });
  //   db.transaction(tx => {
  //     tx.executeSql('SELECT * FROM Weather', [], (txt, results) => {
  //       var temp = [];
  //       for (let i = 0; i < results.rows.length; ++i) {
  //         temp.push(results.rows.item(i).WeatherData);
  //       }
  //     });
  //   });
  // };
  // const CreateTable = () => {
  //   db.transaction(function (txn) {
  //     txn.executeSql(
  //       "SELECT name FROM sqlite_master WHERE type='table' AND name='Weather'",
  //       [],
  //       function (tx, res) {
  //         console.log('item:', res.rows.length);
  //         if (res.rows.length === 0) {
  //           txn.executeSql('DROP TABLE IF EXISTS Weather', []);
  //           txn.executeSql(
  //             'CREATE TABLE IF NOT EXISTS Weather(WeatherData NVARCHAR(10000))',
  //             [],
  //           );
  //         }
  //       },
  //     );
  //   });
  // };

  // function MyTabs() {
  //   return (
  //     <View style={{flex: 1}}>
  //       <Pressable style={styles.Card}>
  //         <Text style={styles.Text}>ID:- {Res.student.id}</Text>

  //         <Text style={styles.Text}>Name:- {Res.student.name}</Text>
  //         <Text style={styles.Text}>Age:- {Res.student.age}</Text>
  //         <Text style={styles.Text}>School:- {Res.student.school}</Text>
  //       </Pressable>
  //       <Tab.Navigator>
  //         <Tab.Screen
  //           options={{
  //             tabBarStyle: {
  //               backgroundColor: 'white',
  //               color: 'black',
  //             },
  //           }}
  //           name="Student"
  //           component={Student}
  //         />
  //         <Tab.Screen
  //           options={{
  //             tabBarStyle: {
  //               backgroundColor: '#white',
  //             },
  //           }}
  //           name="Parent"
  //           component={Parent}
  //         />
  //       </Tab.Navigator>
  //     </View>
  //   );
  // }
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={HeaderCard.Containor}>
        <ImageBackground
          source={{
            uri: 'https://img.icons8.com/ios-glyphs/1000/night-wind---v2.png',
          }}
          resizeMode="cover"
          style={styles.image}>
          <Text style={HeaderCard.Text}>{Header.header}</Text>
        </ImageBackground>
      </View>
      <NavigationContainer>
        <Stack.Navigator>
          {Auth === null ? (
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: 'white',
                },
                headerShadowVisible: false,
                // headerShown: false,
              }}
              name="login"
              component={Login}
            />
          ) : Auth === true ? (
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: 'white',
                },
                headerShadowVisible: false,
                // headerShown: false,
              }}
              name="Dashboard"
              component={HomeSection}
            />
          ) : Auth === false ? (
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: 'white',
                },
                headerShadowVisible: false,
                // headerShown: false,
              }}
              name="login"
              component={Login}
            />
          ) : (
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: 'white',
                },
                headerShadowVisible: false,
                // headerShown: false,
              }}
              name="-"
              component={Error}
            />
          )}
          <Stack.Screen
            options={{
              headerStyle: {
                backgroundColor: 'white',
              },

              headerShadowVisible: false,
              // headerShown: false,
            }}
            name="Home"
            component={HomeSection}
          />
          <Stack.Screen
            options={{
              headerStyle: {
                backgroundColor: 'white',
              },

              headerShadowVisible: false,
              // headerShown: false,
            }}
            name="StudentForm"
            component={StudentForm}
          />
          <Stack.Screen
            options={{
              headerStyle: {
                backgroundColor: 'white',
              },

              headerShadowVisible: false,
              // headerShown: false,
            }}
            name="ParentForm"
            component={ParentForm}
          />
          <Stack.Screen
            options={{
              headerStyle: {
                backgroundColor: 'white',
              },

              headerShadowVisible: false,
              // headerShown: false,
            }}
            name="Profile"
            component={Profile}
          />
          <Stack.Screen
            options={{
              headerStyle: {
                backgroundColor: 'white',
              },

              headerShadowVisible: false,
              // headerShown: false,
            }}
            name="Login"
            component={Login}
          />

          <Stack.Screen
            options={{
              headerStyle: {
                backgroundColor: 'white',
              },

              headerShadowVisible: false,
              // headerShown: false,
            }}
            name="Sections"
            component={SectionCard}
          />
          <Stack.Screen
            options={{
              headerStyle: {
                backgroundColor: 'white',
              },

              headerShadowVisible: false,
              // headerShown: false,
            }}
            name="Register"
            component={Register}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight,
  },
  button: {
    paddingTop: 100,
    height: screenHeight,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  Text: {
    color: 'black',
    fontSize: 20,
  },
  Card: {
    borderWidth: 1,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 1,
  },
});

const HeaderCard = StyleSheet.create({
  Containor: {
    backgroundColor: '#6da7de',
    height: 50,
  },
  Text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
  },
  DateSection: {
    flex: 0.12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;
