import React from 'react';
// import CheckBox from '@react-native-community/checkbox';
import {StyleSheet, Text, View} from 'react-native';
import {CheckBoxButton} from './checkboxButton';

export const Checkbox = ({data, i, handelMultiple}) => {
  // console.log(data);

  return (
    <View>
      {/* <Text style={Style.condition}>{data.condition}</Text> */}
      <Text style={Style.Title}>Select all applicable options</Text>
      {data.options.map(value => {
        const state = false;
        return (
          <View key={value.id} style={Style.container}>
            <CheckBoxButton
              handelMultiple={handelMultiple}
              state={state}
              value={value}
              i={i}
            />
          </View>
        );
      })}
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  options: {
    color: 'white',
    fontSize: 18,
  },
  Title: {
    color: 'yellow',
    fontSize: 20,
    marginBottom: 10,
  },
  condition: {
    fontSize: 20,
  },
  Text: {
    color: 'white',
    fontSize: 17,
  },
});
