import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
// import RadioButtonRN from 'radio-buttons-react-native';
import {RadioButton} from 'react-native-paper';
export const RadioComponent = ({data, i, handelSingleRadio}) => {
  const [value, setValue] = useState(0);
  console.log(value);
  useEffect(() => {
    setValue(0);
  }, [i]);
  return (
    <View>
      {data.map((item, ind) => {
        return (
          <RadioButton.Group
            key={ind}
            onValueChange={newValue => {
              setValue(newValue);
              handelSingleRadio(item);
            }}
            value={value}>
            <Pressable
              onPress={() => {
                setValue(item.id);
                handelSingleRadio(item);
              }}
              style={Style.box}>
              <RadioButton value={item.id} color="blue" />
              <Text style={Style.text}>{item.label}</Text>
            </Pressable>
          </RadioButton.Group>
        );
      })}
    </View>
  );
};

const Style = StyleSheet.create({
  box: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});
