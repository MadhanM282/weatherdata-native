import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
const {width: screenWidth} = Dimensions.get('window');

export const DropDown = ({data, label, HandelSelect, id}) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (null || isFocus) {
      return (
        <Text
          style={[DropdownStyle.label, isFocus && DropdownStyle.labelColor]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={DropdownStyle.container}>
      {renderLabel()}
      <Dropdown
        style={[
          DropdownStyle.dropdown,
          isFocus && DropdownStyle.DropdownOnFocus,
        ]}
        placeholderStyle={DropdownStyle.placeholderStyle}
        selectedTextStyle={DropdownStyle.selectedTextStyle}
        inputSearchStyle={DropdownStyle.inputSearchStyle}
        iconStyle={DropdownStyle.iconStyle}
        itemTextStyle={DropdownStyle.itemTextStyle}
        containerStyle={DropdownStyle.containerStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? label : '...'}
        searchPlaceholder="Search..."
        value={null}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          HandelSelect(item.label, id);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const DropdownStyle = StyleSheet.create({
  container: {
    padding: 6,
    width: screenWidth - 15,
    // marginTop: 5,
  },
  dropdown: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
  },
  icon: {
    marginRight: 5,
  },
  labelColor: {
    color: 'black',
  },
  label: {
    position: 'absolute',
    left: 5,
    top: -13,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 20,
  },
  placeholderStyle: {
    fontSize: 20,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 20,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
  itemTextStyle: {
    color: 'black',
  },
  containerStyle: {
    borderRadius: 9,
  },
  DropdownOnFocus: {
    borderColor: 'blue',
    fontSize: 20,
  },
});
