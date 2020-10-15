import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SurveyType } from '../../../../types/CardType';
import CardHeader from '../../../../components/cards/CardHeader';
import { GREY, PINK } from '../../../../styles/colors';
import QuestionCardFooter from '../../../../components/cards/QuestionCardFooter';
import { StateType, ActionType } from '../../../../types/store/StoreType';
import Selectors from '../../../../store/activities/selectors';
import Actions from '../../../../store/activities/actions';
import SurveyScoreSelector from '../../../../components/cards/SurveyScoreSelector';
import { QuestionnaireAnswerType } from '../../../../types/store/ActivityStoreType';
import styles from './styles';

interface SurveyCard {
  card: SurveyType,
  index: number,
  questionnaireAnswer: QuestionnaireAnswerType,
  addQuestionnaireAnswer: (qa: QuestionnaireAnswerType) => void,
  isFocused: boolean,
}

const SurveyCard = ({ card, index, questionnaireAnswer, addQuestionnaireAnswer, isFocused }: SurveyCard) => {
  const [selectedScore, setSelectedScore] = useState<string>('');

  useEffect(() => {
    setSelectedScore(questionnaireAnswer ? questionnaireAnswer.answer : '');
  }, [questionnaireAnswer]);

  if (!isFocused) return null;

  return (
    <>
      <CardHeader />
      <View style={styles.container}>
        <Text style={styles.question}>{card.question}</Text>
        <View style={styles.surveyScoreContainer}>
          <SurveyScoreSelector onPressScore={setSelectedScore} selectedScore={selectedScore} />
          <View style={styles.labelContainer}>
            {card.label?.left && card.label?.right && (
              <>
                <Text style={{ ...styles.text, ...styles.textLeft }}>{card.label.left}</Text>
                <Text style={{ ...styles.text, ...styles.textRight }}>{card.label.right}</Text>
              </>
            )}
          </View>
        </View>
      </View>
      <QuestionCardFooter index={index} buttonColor={selectedScore ? PINK[500] : GREY[300]}
        arrowColor={PINK[500]} buttonCaption='Valider' buttonDisabled={!selectedScore}
        validateCard={() => addQuestionnaireAnswer({ card: card._id, answer: selectedScore })} />
    </>
  );
};

const mapStateToProps = (state: StateType) => ({
  card: Selectors.getCard(state),
  index: state.activities.cardIndex,
  questionnaireAnswer: Selectors.getQuestionnaireAnswer(state),
});

const mapDispatchToProps = (dispatch: ({ type }: ActionType) => void) => ({
  addQuestionnaireAnswer: (qa: QuestionnaireAnswerType) => dispatch(Actions.addQuestionnaireAnswer(qa)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyCard);
