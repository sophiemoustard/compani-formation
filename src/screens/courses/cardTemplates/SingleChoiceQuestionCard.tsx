import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import { StateType } from '../../../../src/types/StoreType';
import { getCard } from '../../../store/selectors';
import { navigate } from '../../../navigationRef';
import { CardType } from '../../../types/CardType';
import CardHeader from '../../../components/cards/CardHeader';
import { FIRA_SANS_MEDIUM } from '../../../styles/fonts';
import { GREY, GREEN, ORANGE } from '../../../styles/colors';
import { MARGIN } from '../../../styles/metrics';
import QuestionCardFooter from '../../../components/cards/QuestionCardFooter';
import QCUAnswer from '../../../components/cards/QCUAnswer';
import { SINGLE_CHOICE_QUESTION } from '../../../core/data/constants';

interface SingleChoiceQuestionCard {
  card: CardType,
  courseId: string,
  index: number
}

const SingleChoiceQuestionCard = ({ card, courseId, index }: SingleChoiceQuestionCard) => {
  const [isPressed, setIsPressed] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (card && card.template === SINGLE_CHOICE_QUESTION && card.falsyAnswers && !isPressed) {
      setAnswers(shuffle([...card.falsyAnswers, card.qcuGoodAnswer]));
    }
  }, [card, isPressed]);

  if ((card && card.template !== SINGLE_CHOICE_QUESTION) || (!card || !card.falsyAnswers)) return null;

  const goBack = () => {
    navigate('Home', { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId } } });
  };

  const expectedColor = answers[selectedAnswerIndex] === card.qcuGoodAnswer
    ? { inputs: GREEN['600'], background: GREEN['100'], text: GREEN['800'] }
    : { inputs: ORANGE['600'], background: ORANGE['100'], text: ORANGE['800'] };
  const style = styles(isPressed, expectedColor);

  return (
    <>
      <CardHeader color={GREY[600]} onPress={() => goBack()} icon='x-circle' />
      <ScrollView contentContainerStyle={style.container}>
        <Text style={style.question}>{card.question}</Text>
        <View>
          <FlatList
            data={answers}
            keyExtractor={item => item}
            renderItem={({ item, index: answerIndex }) =>
              <QCUAnswer
                onPress={() => setIsPressed(true)} isPressed={isPressed} index={answerIndex}
                onSelectedAnswerIndex={sai => setSelectedAnswerIndex(sai)}
                isSelected={selectedAnswerIndex === answerIndex}
                item={item} isGoodAnswerAndPressed={item === card.qcuGoodAnswer && isPressed} /> } />
        </View>
      </ScrollView>
      <View style={style.footerContainer}>
        <Text style={style.explanation}>{card.explanation}</Text>
        <QuestionCardFooter expectedColor={expectedColor} index={index} isPressed= {isPressed} />
      </View>
    </>
  );
};

const styles = (isPressed: boolean, expectedColor) => StyleSheet.create({
  container: {
    marginHorizontal: MARGIN.LG,
    flexGrow: 1,
    justifyContent: 'space-between',
    marginBottom: MARGIN.LG,
  },
  question: {
    ...FIRA_SANS_MEDIUM.LG,
    color: GREY['800'],
    marginBottom: MARGIN.XL,
  },
  explanation: {
    display: isPressed ? 'flex' : 'none',
    textAlign: 'justify',
    marginHorizontal: MARGIN.LG,
    marginVertical: MARGIN.MD,
    color: expectedColor.text,
  },
  footerContainer: {
    backgroundColor: isPressed ? expectedColor.background : GREY['100'],
  },
});

const mapStateToProps = (state: StateType) => ({ card: getCard(state), index: state.cardIndex });

export default connect(mapStateToProps)(SingleChoiceQuestionCard);
