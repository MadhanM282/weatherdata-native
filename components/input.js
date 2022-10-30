import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, TextInput} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
const {width: screenWidth} = Dimensions.get('window');

export const Input = ({SetInput, i, handelInput}) => {
  const [Default, setdefault] = useState('');
  const HandelChange = e => {
    // console.log(e);
    SetInput(e);
    handelInput(e);
  };
  useEffect(() => {
    console.log(i, 'index');
    // SetInput('');
    setdefault('');
  }, [i]);
  return (
    <TextInput
      style={Styles.TextFields}
      placeholder="Enter your Answer.."
      onChangeText={newText => HandelChange(newText)}
      defaultValue={Default}
    />
  );
};

const Styles = StyleSheet.create({
  TextFields: {
    width: screenWidth / 2,
    height: 60,
    borderBottomWidth: 2,
    marginTop: 10,
    borderColor: 'white',
    fontSize: 20,
    color: 'white',
  },
});
