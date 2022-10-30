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
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import {openDatabase} from 'react-native-sqlite-storage';
import {Login} from './components/login';
import {Register} from './components/register';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HomeSection} from './components/home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Student} from './components/student';
import {Parent} from './components/parent';
import {Error} from './components/Error';
import {StudentForm} from './components/StudentForm';
import {ParentForm} from './components/ParentForm';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const {height: screenHeight} = Dimensions.get('window');

// var db = openDatabase({name: 'UserDatabase.db'});

const App = () => {
  // console.log(screenWidth, screenHeight);
  const isDarkMode = useColorScheme() === 'dark';

  const [Auth, SetAuth] = useState();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#c0392b' : '#c0392b',
  };
  // const NetInfo = useNetInfo();
  // const [Result, SetResults] = useState([]);
  useEffect(() => {
    // SetResults([]);
    GetAuth();
  }, [Auth]);
  console.log('auth', Auth);
  // const Data = JSON.stringify(Result);
  // CreateTable();
  // DataBase();

  const GetAuth = async () => {
    let data = await AsyncStorage.getItem('auth');
    // await AsyncStorage.setItem('auth', 'false');
    SetAuth(JSON.parse(data));
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

  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          options={{
            tabBarStyle: {
              backgroundColor: '#c0392b',
              color: 'black',
            },
          }}
          name="Student"
          component={Student}
        />
        <Tab.Screen
          options={{
            tabBarStyle: {
              backgroundColor: '#c0392b',
            },
          }}
          name="Parent"
          component={Parent}
        />
      </Tab.Navigator>
    );
  }

  return (
    <View>
      <View>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <LinearGradient
          colors={['#c0392b', '#f1c40f', '#8e44ad']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={styles.button}>
          <View style={HeaderCard.Containor}>
            <ImageBackground
              source={{
                uri: 'https://img.icons8.com/ios-glyphs/1000/night-wind---v2.png',
              }}
              resizeMode="cover"
              style={styles.image}>
              <Text style={HeaderCard.Text}>Student Monitor App</Text>
            </ImageBackground>
          </View>
          <NavigationContainer>
            <Stack.Navigator>
              {Auth === null || false ? (
                <Stack.Screen
                  options={{
                    headerStyle: {
                      backgroundColor: 'transparent',
                    },
                    headerShadowVisible: false,
                  }}
                  name="login"
                  component={Login}
                />
              ) : Auth === true ? (
                <Stack.Screen
                  options={{
                    headerStyle: {
                      backgroundColor: 'transparent',
                    },
                    headerShadowVisible: false,
                  }}
                  name="Dashboard"
                  component={HomeSection}
                />
              ) : (
                <Stack.Screen
                  options={{
                    headerStyle: {
                      backgroundColor: 'transparent',
                    },
                    headerShadowVisible: false,
                  }}
                  name="-"
                  component={Error}
                />
              )}
              <Stack.Screen
                options={{
                  headerStyle: {
                    backgroundColor: 'transparent',
                  },
                  headerShadowVisible: false,
                }}
                name="Home"
                component={HomeSection}
              />
              <Stack.Screen
                options={{
                  headerStyle: {
                    backgroundColor: 'transparent',
                  },
                  headerShadowVisible: false,
                }}
                name="StudentForm"
                component={StudentForm}
              />
              <Stack.Screen
                options={{
                  headerStyle: {
                    backgroundColor: 'transparent',
                  },
                  headerShadowVisible: false,
                }}
                name="ParentForm"
                component={ParentForm}
              />
              <Stack.Screen
                options={{
                  headerStyle: {
                    backgroundColor: 'transparent',
                  },
                  headerShadowVisible: false,
                }}
                name="Login"
                component={Login}
              />

              <Stack.Screen
                options={{
                  headerStyle: {
                    backgroundColor: 'transparent',
                  },
                  headerShadowVisible: false,
                }}
                name="Sections"
                component={MyTabs}
              />
              <Stack.Screen
                options={{
                  headerStyle: {
                    backgroundColor: 'transparent',
                  },
                  headerShadowVisible: false,
                }}
                name="Register"
                component={Register}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  button: {
    paddingTop: 100,
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: screenHeight,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});

const HeaderCard = StyleSheet.create({
  Containor: {
    backgroundColor: '#6da7de',
    marginTop: Platform.select({ios: -60, android: -90}),
    height: 50,
    borderRadius: 5,
  },
  Text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
  },
  DateSection: {
    flex: 0.12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;
