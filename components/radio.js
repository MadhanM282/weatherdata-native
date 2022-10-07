import React, {useEffect, useState} from 'react';
// import RadioGroup from 'react-native-radio-buttons-group';

// const radioButtonsData = [
//   {
//     id: '1', // acts as primary key, should be unique and non-empty string
//     label: 'Option 1',
//     value: 'option1',
//   },
//   {
//     id: '2',
//     label: 'Option 2',
//     value: 'option2',
//   },
// ];

// export const Radio = ({data}) => {
//   console.log(data);
//   const [radioButtons, setRadioButtons] = useState(data);

//   function onPressRadioButton(radioButtonsArray) {
//     setRadioButtons(radioButtonsArray);
//   }

//   return (
//     <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton} />
//   );
// };
import {View} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

var radio_props = [
  {label: 'param1', value: 0},
  {label: 'param2', value: 1},
];

export const Radio = ({data}) => {
  const [use, SetUse] = useState([]);

  return (
    <View>
      <RadioForm
        radio_props={data}
        initial={0}
        onPress={value => {
          SetUse({value: value});
          console.log(value);
        }}
      />
    </View>
  );
};
