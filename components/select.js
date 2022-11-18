import React from 'react';
import {StyleSheet, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
export const SelectTag = () => {
  return (
    <View style={Styles.containor}>
      <RNPickerSelect
        onValueChange={value => console.log(value)}
        items={[
          {label: 'Football', value: 'football'},
          {label: 'Baseball', value: 'baseball'},
          {label: 'Hockey', value: 'hockey'},
        ]}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  containor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
