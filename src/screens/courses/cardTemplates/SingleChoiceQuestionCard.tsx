import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import { SingleChoiceQuestionType } from '../../../types/CardType';
import { StateType } from '../../../types/store/StoreType';
import { getCard } from '../../../store/activities/selectors';
import CardHeader from '../../../components/cards/CardHeader';
import { FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { GREY, GREEN, ORANGE, PINK } from '../../../styles/colors';
import { MARGIN } from '../../../styles/metrics';
import QuestionCardFooter from '../../../components/cards/QuestionCardFooter';
import SingleChoiceQuestionAnswer from '../../../components/cards/SingleChoiceQuestionAnswer';
import { SINGLE_CHOICE_QUESTION } from '../../../core/data/constants';

interface SingleChoiceQuestionCard {
  card: SingleChoiceQuestionType,
  index: number,
}

const SingleChoiceQuestionCard = ({ card, index }: SingleChoiceQuestionCard) => {
  const [isPressed, setIsPressed] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (card && card.template === SINGLE_CHOICE_QUESTION && !isPressed) {
      setAnswers(shuffle([...card.qcuFalsyAnswers, card.qcuGoodAnswer]));
    }
  }, [card, isPressed]);

  if (!card || card.template !== SINGLE_CHOICE_QUESTION) return null;

  const onSelectAnswer = (selectedIndex) => {
    setIsPressed(true);
    setSelectedAnswerIndex(selectedIndex);
  };

  const expectedColors = answers[selectedAnswerIndex] === card.qcuGoodAnswer
    ? { button: GREEN['600'], background: GREEN['100'], text: GREEN['800'] }
    : { button: ORANGE['600'], background: ORANGE['100'], text: ORANGE['800'] };
  const style = styles(isPressed, expectedColors.background, expectedColors.text);

  return (
    <>
      <CardHeader />
      <ScrollView contentContainerStyle={style.container}>
        <Text style={style.question}>{card.question}</Text>
        <View>
          <FlatList
            data={answers}
            keyExtractor={item => item}
            renderItem={({ item, index: answerIndex }) =>
              <SingleChoiceQuestionAnswer onPress={onSelectAnswer} index={answerIndex}
                isGoodAnswer={item === card.qcuGoodAnswer} isSelected={selectedAnswerIndex === answerIndex}
                item={item} isPressed={isPressed} />}
          />
        </View>
      </ScrollView>
      <View style={style.footerContainer}>
        {isPressed && <Text style={style.explanation}>{card.explanation}</Text>}
        <QuestionCardFooter index={index} arrowColor={isPressed ? expectedColors.button : PINK['500']}
          buttonVisible={isPressed} buttonColor={isPressed ? expectedColors.button : GREY['300']} />
      </View>
    </>
  );
};

const styles = (isPressed: boolean, backgroundColor: string, textColor: string) => StyleSheet.create({
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
    ...FIRA_SANS_REGULAR.MD,
    textAlign: 'justify',
    marginHorizontal: MARGIN.LG,
    marginVertical: MARGIN.MD,
    color: textColor,
  },
  footerContainer: {
    backgroundColor: isPressed ? backgroundColor : GREY['100'],
  },
});

const mapStateToProps = (state: StateType) => ({ card: getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(SingleChoiceQuestionCard);
