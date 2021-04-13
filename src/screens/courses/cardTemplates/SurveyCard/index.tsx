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

interface SurveyCardProps {
  card: SurveyType,
  index: number,
  questionnaireAnswer: QuestionnaireAnswerType,
  isLoading: boolean,
  addQuestionnaireAnswer: (qa: QuestionnaireAnswerType) => void,
  removeQuestionnaireAnswer: (card: string) => void,
  setIsRightSwipeEnabled: (boolean) => void,
}

const SurveyCard = ({
  card,
  index,
  questionnaireAnswer,
  isLoading,
  addQuestionnaireAnswer,
  removeQuestionnaireAnswer,
  setIsRightSwipeEnabled,
}: SurveyCardProps) => {
  const [selectedScore, setSelectedScore] = useState<string>('');

  useEffect(() => setIsRightSwipeEnabled(false));

  useEffect(() => {
    setSelectedScore(questionnaireAnswer ? questionnaireAnswer.answerList[0] : '');
  }, [questionnaireAnswer]);

  if (isLoading) return null;

  const isValidationDisabled = card.isMandatory && !selectedScore;

  const onPressScore = (score: string) => setSelectedScore(previousValue => (previousValue === score ? '' : score));

  const validateSurvey = () => {
    if (!selectedScore && card.isMandatory) return;
    if (card.isMandatory || selectedScore !== '') {
      addQuestionnaireAnswer({ card: card._id, answerList: [selectedScore] });
    } else removeQuestionnaireAnswer(card._id);
  };

  return (
    <>
      <CardHeader />
      <View style={styles.container}>
        <Text style={styles.question}>{card.question}</Text>
        <View style={styles.surveyScoreContainer}>
          <SurveyScoreSelector onPressScore={onPressScore} selectedScore={selectedScore} />
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
      <QuestionCardFooter index={index} buttonColor={isValidationDisabled ? GREY[300] : PINK[500]}
        arrowColor={PINK[500]} buttonCaption='Valider' buttonDisabled={isValidationDisabled}
        validateCard={validateSurvey} />
    </>
  );
};

const mapStateToProps = (state: StateType) => ({
  card: Selectors.getCard(state),
  index: state.cards.cardIndex,
  questionnaireAnswer: Selectors.getQuestionnaireAnswer(state),
});

const mapDispatchToProps = (dispatch: ({ type }: ActionType) => void) => ({
  addQuestionnaireAnswer: (qa: QuestionnaireAnswerType) => dispatch(Actions.addQuestionnaireAnswer(qa)),
  removeQuestionnaireAnswer: (card: string) => dispatch(Actions.removeQuestionnaireAnswer(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyCard);
