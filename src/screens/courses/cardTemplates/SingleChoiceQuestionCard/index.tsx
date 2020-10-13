import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import { SingleChoiceQuestionType } from '../../../../types/CardType';
import { StateType } from '../../../../types/store/StoreType';
import Selectors from '../../../../store/activities/selectors';
import Actions from '../../../../store/activities/actions';
import CardHeader from '../../../../components/cards/CardHeader';
import { GREY, GREEN, ORANGE, PINK } from '../../../../styles/colors';
import QuestionCardFooter from '../../../../components/cards/QuestionCardFooter';
import QuizProposition from '../../../../components/cards/QuizProposition';
import { SINGLE_CHOICE_QUESTION } from '../../../../core/data/constants';
import cardsStyle from '../../../../styles/cards';
import FooterGradient from '../../../../components/design/FooterGradient';
import styles from './styles';

interface SingleChoiceQuestionCardProps {
  card: SingleChoiceQuestionType,
  index: number,
  incGoodAnswersCount: () => void,
}

const SingleChoiceQuestionCard = ({ card, index, incGoodAnswersCount }: SingleChoiceQuestionCardProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>(-1);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (card && card.template === SINGLE_CHOICE_QUESTION && !isPressed) {
      setAnswers(shuffle([...card.qcuFalsyAnswers, card.qcuGoodAnswer]));
    }
  }, [card, isPressed]);

  const renderItem = (item, answerIndex) => <QuizProposition onPress={onSelectAnswer} index={answerIndex} item={item}
    isValidated={isPressed} isGoodAnswer={item === card.qcuGoodAnswer}
    isSelected={selectedAnswerIndex === answerIndex} />;

  if (!card || card.template !== SINGLE_CHOICE_QUESTION) return null;

  const onSelectAnswer = (selectedIndex) => {
    setIsPressed(true);
    setSelectedAnswerIndex(selectedIndex);
    if (answers[selectedIndex] === card.qcuGoodAnswer) incGoodAnswersCount();
  };

  const expectedColors = answers[selectedAnswerIndex] === card.qcuGoodAnswer
    ? { button: GREEN[600], background: GREEN[100], text: GREEN[800] }
    : { button: ORANGE[600], background: ORANGE[100], text: ORANGE[800] };
  const style = styles(isPressed, expectedColors.background, expectedColors.text);

  return (
    <>
      <CardHeader />
      <ScrollView contentContainerStyle={style.container} showsVerticalScrollIndicator={false}>
        <Text style={cardsStyle.question}>{card.question}</Text>
        <View>
          <FlatList data={answers} keyExtractor={(_, answerIndex) => answerIndex.toString()}
            renderItem={({ item, index: answerIndex }) => renderItem(item, answerIndex)} />
        </View>
      </ScrollView>
      <View style={style.footerContainer}>
        {!isPressed && <FooterGradient /> }
        {isPressed && <Text style={[cardsStyle.explanation, style.explanation]}>{card.explanation}</Text>}
        <QuestionCardFooter index={index} arrowColor={isPressed ? expectedColors.button : PINK[500]}
          buttonVisible={isPressed} buttonColor={isPressed ? expectedColors.button : GREY[300]} />
      </View>
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.activities.cardIndex });

const mapDispatchToProps = dispatch => ({
  incGoodAnswersCount: () => dispatch(Actions.incGoodAnswersCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleChoiceQuestionCard);
