import React, {useEffect, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {StyleSheet, Text, View} from 'react-native';

export const CheckBoxButton = ({state, i, value, handelMultiple}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(state);

  useEffect(() => {
    setToggleCheckBox(false);
  }, [i]);

  return (
    <View style={Style.container}>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={newValue => {
          console.log(newValue);
          setToggleCheckBox(newValue);
          handelMultiple(value);
        }}
        tintColors={{true: 'white', false: 'black'}}
      />
      <Text style={Style.Text}>{value.label}</Text>
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Text: {
    color: 'white',
    fontSize: 17,
  },
});
