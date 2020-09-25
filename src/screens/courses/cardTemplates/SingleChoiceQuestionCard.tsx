import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import { SingleChoiceQuestionType } from '../../../types/CardType';
import { StateType } from '../../../types/store/StoreType';
import { getCard } from '../../../store/activities/selectors';
import CardHeader from '../../../components/cards/CardHeader';
import { GREY, GREEN, ORANGE, PINK } from '../../../styles/colors';
import { MARGIN } from '../../../styles/metrics';
import QuestionCardFooter from '../../../components/cards/QuestionCardFooter';
import ChoicesQuestionAnswer from '../../../components/cards/QuizProposition';
import { SINGLE_CHOICE_QUESTION } from '../../../core/data/constants';
import cardsStyle from '../../../styles/cards';

interface SingleChoiceQuestionCardProps {
  card: SingleChoiceQuestionType,
  index: number,
}

const SingleChoiceQuestionCard = ({ card, index }: SingleChoiceQuestionCardProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>(-1);
  const [answers, setAnswers] = useState<string[]>([]);

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
        <Text style={cardsStyle.question}>{card.question}</Text>
        <View>
          <FlatList
            data={answers}
            keyExtractor={(_, answerIndex) => answerIndex.toString()}
            renderItem={({ item, index: answerIndex }) => (
              <ChoicesQuestionAnswer onPress={onSelectAnswer} index={answerIndex}
                isGoodAnswer={item === card.qcuGoodAnswer} isSelected={selectedAnswerIndex === answerIndex}
                item={item} isValidated={isPressed} />
            )}
          />
        </View>
      </ScrollView>
      <View style={style.footerContainer}>
        {isPressed && <Text style={[cardsStyle.explanation, style.explanation]}>{card.explanation}</Text>}
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
  explanation: {
    color: textColor,
  },
  footerContainer: {
    backgroundColor: isPressed ? backgroundColor : GREY['100'],
  },
});

const mapStateToProps = (state: StateType) => ({ card: getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(SingleChoiceQuestionCard);
