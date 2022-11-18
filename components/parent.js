import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {QuestionCard} from './questionCard';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const Parent = ({navigation, route}) => {
  const [QuestionSections, SetQuestionSections] = useState({});
  const [index, SetIndex] = useState(0);
  const [Status, SetStatus] = useState(false);
  const [Page, SetPage] = useState(1);
  const [Responce, SetResponce] = useState([]);

  useEffect(() => {
    data();
    GetQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Page]);

  const GetQuestions = async () => {
    SetStatus(false);
    await axios
      .get(
        `https://jsons-ervermock.herokuapp.com/ParentQuestions?_page=${Page}`,
      )
      .then(({data}) => {
        SetQuestionSections(data);
        SetStatus(true);
      })
      .catch(err => console.error(err));
  };
  const data = async () => {};
  return Status ? (
    <ScrollView style={Styles.button}>
      <Text style={Styles.Title}>{QuestionSections[index]?.Section}</Text>
      {QuestionSections.map((question, i) => {
        return (
          <QuestionCard
            QuestionSections={question}
            index={i}
            key={i}
            SetIndex={SetIndex}
            SetResponce={SetResponce}
            Responce={Responce}
          />
        );
      })}
      <View style={Styles.buttonDiv}>
        <Pressable
          onPress={() => {
            SetPage(Page - 1);
          }}
          style={Styles.buttons}>
          <Text style={Styles.buttonText}>Previous</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            SetPage(Page + 1);
          }}
          style={Styles.buttons}>
          <Text style={Styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </ScrollView>
  ) : (
    <ScrollView style={Styles.button}>
      <View style={[Loading.container, Loading.horizontal]}>
        <ActivityIndicator color="black" size="large" />
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  condition: {
    fontSize: 20,
  },
  scrollView: {
    // marginbottom: 0,
    flex: 1,
    height: screenHeight,
    borderWidth: 1,
  },
  button: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    height: screenHeight,
    backgroundColor: 'white',
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
    color: 'black',
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
    marginBottom: 30,
  },
  BottomText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
});

const Loading = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
