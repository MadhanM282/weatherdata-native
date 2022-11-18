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
        value={toggleCheckBox}
        onValueChange={newValue => {
          // console.log(newValue);
          setToggleCheckBox(newValue);
          handelMultiple(value);
        }}
        tintColors={{true: 'green', false: 'black'}}
      />
      <Text style={Style.Text}>{value.label}</Text>
    </View>
  );
};

// const default = ()=>{
//   return (
//     <View style={Style.container}>
//       <CheckBox
//         value={toggleCheckBox}
//         defaultCheck={true}
//         onValueChange={newValue => {
//           // console.log(newValue);
//           setToggleCheckBox(newValue);
//           handelMultiple(value);
//         }}
//         tintColors={{true: 'green', false: 'black'}}
//       />
//       <Text style={Style.Text}>{value.label}</Text>
//     </View>
//   );
// }

const Style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Text: {
    color: 'black',
    fontSize: 17,
  },
});
