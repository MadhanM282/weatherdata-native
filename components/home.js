import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const users = [
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
  {
    Name: 'Madhan',
    DOB: '27/04/1999',
    id: '24',
    Status: 'Active',
  },
];
import LinearGradient from 'react-native-linear-gradient';
const {height: screenHeight} = Dimensions.get('window');
// import AsyncStorage from '@react-native-async-storage/async-storage';
let data;
export const HomeSection = ({navigation}) => {
  useEffect(() => {
    GetAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GetAuth = async () => {
    data = await AsyncStorage.getItem('auth');
    if (data === undefined || null || false) {
      console.log(data, 'data on top');
      navigation.navigate('Login');
    }
  };
  const HandelChanged = async e => {
    await AsyncStorage.setItem('key', e);

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
      <Pressable style={Styles.Card}>
        <Text style={Styles.Text}>ID</Text>
        <Text style={Styles.Text}>Name</Text>
        <Text style={Styles.Text}>DOB</Text>
        <Text style={Styles.Text}>Status</Text>
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
                    HandelChanged('madhan');
                  }}>
                  <Text style={Styles.Text}>{user.id}</Text>
                  <Text style={Styles.Text}>{user.Name}</Text>
                  <Text style={Styles.Text}>{user.DOB}</Text>
                  <Text style={Styles.Text}>{user.Status}</Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
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
    padding: 10,
  },
  Text: {
    color: '#fff',
    fontSize: 20,
  },
  Scroll: {
    height: 600,
  },
});
