import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import { footerColorsType, SingleChoiceQuestionType } from '../../../../types/CardType';
import { StateType } from '../../../../types/store/StoreType';
import Selectors from '../../../../store/activities/selectors';
import Actions from '../../../../store/activities/actions';
import CardHeader from '../../../../components/cards/CardHeader';
import { GREY, GREEN, ORANGE, PINK } from '../../../../styles/colors';
import QuizCardFooter from '../../../../components/cards/QuizCardFooter';
import QuizProposition from '../../../../components/cards/QuizProposition';
import cardsStyle from '../../../../styles/cards';
import FooterGradient from '../../../../components/design/FooterGradient';
import styles from './styles';
import { quizJingle } from '../../../../core/helpers/utils';

interface SingleChoiceQuestionCardProps {
  card: SingleChoiceQuestionType,
  index: number,
  incGoodAnswersCount: () => void,
  isLoading: boolean,
  setIsSwipeEnabled: (boolean) => void,
}

const SingleChoiceQuestionCard = ({
  card,
  index,
  incGoodAnswersCount,
  isLoading,
  setIsSwipeEnabled,
}: SingleChoiceQuestionCardProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>(-1);
  const [answers, setAnswers] = useState<string[]>([]);
  const [footerColors, setFooterColors] = useState<footerColorsType>({
    buttons: PINK[500],
    text: GREY[100],
    background: GREY[100],
  });

  useEffect(() => {
    if (!isLoading && !isPressed) setAnswers(shuffle([...card.qcAnswers.map(a => a.text), card.qcuGoodAnswer]));
    setIsSwipeEnabled(isPressed);
  }, [isLoading, card, isPressed, setIsSwipeEnabled]);

  useEffect(() => {
    if (!isPressed) {
      return setFooterColors({ buttons: PINK[500], text: GREY[100], background: GREY[100] });
    }

    if (card && answers[selectedAnswerIndex] === card.qcuGoodAnswer) {
      return setFooterColors({ buttons: GREEN[600], text: GREEN[600], background: GREEN[100] });
    }

    return setFooterColors({ buttons: ORANGE[600], text: ORANGE[600], background: ORANGE[100] });
  }, [answers, card, isPressed, selectedAnswerIndex]);

  if (isLoading) return null;

  const renderItem = (item, answerIndex) => <QuizProposition onPress={onSelectAnswer} index={answerIndex} item={item}
    isValidated={isPressed} isGoodAnswer={item === card.qcuGoodAnswer}
    isSelected={selectedAnswerIndex === answerIndex} />;

  const onSelectAnswer = (selectedIndex) => {
    setIsPressed(true);
    setSelectedAnswerIndex(selectedIndex);
    quizJingle(answers[selectedIndex] === card.qcuGoodAnswer);
    if (answers[selectedIndex] === card.qcuGoodAnswer) incGoodAnswersCount();
  };

  const style = styles(isPressed, footerColors.background);

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
        <QuizCardFooter isValidated={isPressed} isValid={answers[selectedAnswerIndex] === card.qcuGoodAnswer}
          cardIndex={index} footerColors={footerColors} explanation={card.explanation}
          buttonDisabled={!isPressed} />
      </View>
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.activities.cardIndex });

const mapDispatchToProps = dispatch => ({
  incGoodAnswersCount: () => dispatch(Actions.incGoodAnswersCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleChoiceQuestionCard);
