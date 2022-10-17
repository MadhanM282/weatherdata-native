import React, {useEffect, useState} from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
import {StyleSheet} from 'react-native';
export const Radio = ({data, index}) => {
  // const [use, SetUse] = useState([]);
  const [init, SetInit] = useState(-1);

  useEffect(() => {
    SetInit();
  }, [index]);

  return (
    <RadioButtonRN
      data={data}
      box={false}
      initial={init}
      // deactiveColor={'white'}
      selectedBtn={e => {}}
      textStyle={Style.text}
    />
  );
};

const Style = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
  },
});
