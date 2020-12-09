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
import cardsStyle from '../../../../styles/cards';
import FooterGradient from '../../../../components/design/FooterGradient';
import styles from './styles';

interface SingleChoiceQuestionCardProps {
  card: SingleChoiceQuestionType,
  index: number,
  incGoodAnswersCount: () => void,
  isLoading: boolean,
}

const SingleChoiceQuestionCard = ({ card, index, incGoodAnswersCount, isLoading }: SingleChoiceQuestionCardProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>(-1);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoading && !isPressed) setAnswers(shuffle([...card.qcAnswers.map(a => a.text), card.qcuGoodAnswer]));
  }, [isLoading, card, isPressed]);

  if (isLoading) return null;

  const renderItem = (item, answerIndex) => <QuizProposition onPress={onSelectAnswer} index={answerIndex} item={item}
    isValidated={isPressed} isGoodAnswer={item === card.qcuGoodAnswer}
    isSelected={selectedAnswerIndex === answerIndex} />;

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
          <Text style={cardsStyle.informativeText}>Une seule réponse est possible</Text>
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
