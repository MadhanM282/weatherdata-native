import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
// import RadioButtonRN from 'radio-buttons-react-native';
import {RadioButton} from 'react-native-paper';
export const RadioComponent = ({data, index}) => {
  const [value, setValue] = useState(1);
  useEffect(() => {
    setValue(0);
  }, [index]);
  return (
    <View>
      {data.map(item => {
        return (
          <RadioButton.Group
            key={index}
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <Pressable onPress={() => setValue(item.id)} style={Style.box}>
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
