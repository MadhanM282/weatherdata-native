import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';

export const CheckBoxButton = ({state}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <CheckBox
      disabled={false}
      value={toggleCheckBox}
      onValueChange={newValue => setToggleCheckBox(newValue)}
      tintColors={{true: 'white', false: 'black'}}
    />
  );
};
