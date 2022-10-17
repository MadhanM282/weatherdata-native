import React, {useEffect} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {Checkbox} from './checkbox';
import {Input} from './input';
import {RadioComponent} from './radioComponent';
const {width: screenWidth} = Dimensions.get('window');

export const QuestionCard = ({QuestionSections, index, SetIndex}) => {
  useEffect(() => {}, [index]);
  return (
    <View>
      {QuestionSections[index].Type === 'multiple' ? (
        <Text style={Styles.condition}>
          {QuestionSections[index].condition}
        </Text>
      ) : (
        ''
      )}
      <Text style={Styles.Title}>
        {index + 1}.{QuestionSections[index]?.question}
      </Text>
      {QuestionSections[index].Type === 'single' ? (
        // <Text>Single</Text>
        <RadioComponent i={index} data={QuestionSections[index]?.options} />
      ) : QuestionSections[index].Type === 'multiple' ? (
        <Checkbox data={QuestionSections[index]} />
      ) : QuestionSections[index].Type === 'input' ? (
        <Input />
      ) : (
        <Text>{QuestionSections[index].Type}</Text>
      )}
      <View style={Styles.buttonDiv}>
        <Pressable
          onPress={() => {
            if (index > 0) {
              SetIndex(index - 1);
            }
          }}
          style={Styles.buttons}>
          <Text style={Styles.buttonText}>Previous</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (index < QuestionSections.length - 1) {
              SetIndex(index + 1);
            }
          }}
          style={Styles.buttons}>
          <Text style={Styles.buttonText}>Next</Text>
        </Pressable>
      </View>
      <View>
        <Text style={Styles.BottomText}>
          {index + 1}/{QuestionSections.length}
        </Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  condition: {
    fontSize: 20,
  },
  Card: {
    borderWidth: 1,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 1,
    marginBottom: 50,
  },
  Text: {
    color: 'white',
    fontSize: 17,
  },
  buttonText: {
    fontSize: 20,
    color: 'orange',
    textAlign: 'center',
  },
  buttons: {
    padding: 10,
    borderWidth: 1,
    width: screenWidth / 3,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  Containor: {
    borderWidth: 1,
    padding: 20,
    margin: 10,
    borderRadius: 8,
  },
  buttonDiv: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  Title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 30,
  },
  BottomText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
});
