import React from 'react';
import {Dimensions, StyleSheet, TextInput} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
const {width: screenWidth} = Dimensions.get('window');

export const Input = ({navigation}) => {
  const HandelChange = (id, e) => {
    console.log(e, id);
  };
  return (
    <TextInput
      style={Styles.TextFields}
      placeholder="Enter your Answer.."
      onChangeText={newText => HandelChange('email', newText)}
      defaultValue={''}
    />
  );
};

const Styles = StyleSheet.create({
  TextFields: {
    width: screenWidth - 30,
    height: 60,
    borderBottomWidth: 2,
    marginTop: 10,
    borderColor: 'white',
    fontSize: 20,
    color: 'white',
  },
});
