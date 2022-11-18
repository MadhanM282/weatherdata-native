import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Checkbox} from './checkbox';
import {Input} from './input';
import {RadioComponent} from './radioComponent';
const {width: screenWidth} = Dimensions.get('window');

export const QuestionCard = ({
  QuestionSections,
  index,
  SetIndex,
  SetResponce,
  Responce,
}) => {
  // const [Disable, SetDisable] = useState(false);
  // const [multiple, SetMultiple] = useState([]);
  const [input, SetInput] = useState({});
  const [MultyOption, SetMultyOption] = useState({
    questionID: '',
    answers: [],
  });
  // console.log(MultyOption)

  const handelSingleRadio = e => {
    console.log(e);
    const ind = Responce.findIndex(
      value => value.questionID === QuestionSections.id,
    );
    if (ind !== undefined && ind >= 0) {
      console.log('index', ind);
      Responce[ind] = {['questionID']: QuestionSections.id, ['answerID']: e.id};
      console.log('Result', Responce);
    } else {
      SetResponce([
        ...Responce,
        {['questionID']: QuestionSections.id, ['answerID']: e.id},
      ]);
    }
  };

  // const handelMultiple = e => {
  //   SetMultiple(MultyOption);
  //   SetMultyOption({
  //     questionID: '',
  //     answers: [],
  //   });
  // };
  const HandelMultyOptions = e => {
    SetMultyOption({
      ...MultyOption,
      answers: [...MultyOption.answers, e.id],
      questionID: QuestionSections.id,
    });
  };

  const handelInput = e => {
    SetInput({
      ...input,
      ['question']: QuestionSections.id,
      ['answer']: e,
    });
    // const ind = Responce.findIndex(
    //   value => value.questionID === input.questionID,
    // );
    // if (ind !== undefined) {
    //   Responce[ind] = input;
    // } else {
    //   SetResponce([...Responce, input]);
    // }
  };

  return (
    <View>
      {QuestionSections.Type === 'multiple' ? (
        <Text style={Styles.condition}>{QuestionSections.condition}</Text>
      ) : (
        <Text style={Styles.condition}> </Text>
      )}
      <Text style={Styles.Title}>
        {QuestionSections.id}.{QuestionSections?.question}
      </Text>
      {QuestionSections.Type === 'single' ? (
        // <Text>Single</Text>
        <RadioComponent
          handelSingleRadio={handelSingleRadio}
          i={index}
          data={QuestionSections?.options}
        />
      ) : QuestionSections.Type === 'multiple' ? (
        <Checkbox
          // HandelResponce={HandelResponce}
          data={QuestionSections}
          i={index}
          handelMultiple={HandelMultyOptions}
        />
      ) : QuestionSections.Type === 'input' ? (
        <Input SetInput={SetInput} i={index} handelInput={handelInput} />
      ) : (
        <Text>{QuestionSections.Type}</Text>
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  condition: {
    fontSize: 20,
    marginTop: 30,
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
    color: 'black',
    fontSize: 20,
  },
  BottomText: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
  },
});
