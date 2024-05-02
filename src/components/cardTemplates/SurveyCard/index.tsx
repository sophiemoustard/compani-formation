import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { SurveyType } from '@/types/CardType';
import CardHeader from '@/components/cards/CardHeader';
import { GREY, PINK } from '@/styles/colors';
import QuestionCardFooter from '@/components/cards/QuestionCardFooter';
import { StateType, ActionType } from '@/types/store/StoreType';
import Selectors from '@/store/cards/selectors';
import Actions from '@/store/cards/actions';
import SurveyScoreSelector from '@/components/cards/SurveyScoreSelector';
import { QuestionnaireAnswersType } from '@/types/ActivityTypes';
import styles from './styles';

interface SurveyCardProps {
  card: SurveyType,
  index: number | null,
  questionnaireAnswer: QuestionnaireAnswersType | null,
  isLoading: boolean,
  addQuestionnaireAnswer: (qa: QuestionnaireAnswersType) => void,
  removeQuestionnaireAnswer: (card: string) => void,
  setIsRightSwipeEnabled: (boolean: boolean) => void,
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
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <CardHeader />
      <View style={styles.container}>
        <Text style={styles.question}>{card.question}</Text>
        <View style={styles.surveyScoreContainer}>
          <SurveyScoreSelector onPressScore={onPressScore} selectedScore={selectedScore} />
          <View style={styles.labelContainer}>
            {card.labels && card.labels[1] && card.labels[5] && (
              <>
                <Text style={{ ...styles.text, ...styles.textLeft }}>{card.labels[1]}</Text>
                <Text style={{ ...styles.text, ...styles.textRight }}>{card.labels[5]}</Text>
              </>
            )}
          </View>
        </View>
      </View>
      <QuestionCardFooter index={index} buttonColor={isValidationDisabled ? GREY[300] : PINK[500]}
        arrowColor={PINK[500]} buttonCaption='Valider' buttonDisabled={isValidationDisabled}
        validateCard={validateSurvey} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StateType) => ({
  card: Selectors.getCard(state),
  index: state.cards.cardIndex,
  questionnaireAnswer: Selectors.getQuestionnaireAnswer(state),
});

const mapDispatchToProps = (dispatch: ({ type }: ActionType) => void) => ({
  addQuestionnaireAnswer: (qa: QuestionnaireAnswersType) => dispatch(Actions.addQuestionnaireAnswer(qa)),
  removeQuestionnaireAnswer: (card: string) => dispatch(Actions.removeQuestionnaireAnswer(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyCard);
