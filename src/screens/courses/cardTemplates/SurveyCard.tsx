import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SurveyType } from '../../../types/CardType';
import CardHeader from '../../../components/cards/CardHeader';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { GREY, PINK } from '../../../styles/colors';
import { MARGIN, PADDING } from '../../../styles/metrics';
import QuestionCardFooter from '../../../components/cards/QuestionCardFooter';
import { StateType, ActionType } from '../../../types/store/StoreType';
import { getCard, getQuestionnaireAnswer } from '../../../store/activities/selectors';
import Actions from '../../../store/activities/actions';
import SurveyScoreSelector from '../../../components/cards/SurveyScoreSelector';
import { SURVEY } from '../../../core/data/constants';
import { QuestionnaireAnswerType } from '../../../types/store/ActivityStoreType';

interface SurveyCard {
  card: SurveyType,
  index: number,
  questionnaireAnswer: QuestionnaireAnswerType,
  addQuestionnaireAnswer: (qa: QuestionnaireAnswerType) => void,
}

const SurveyCard = ({ card, index, questionnaireAnswer, addQuestionnaireAnswer }: SurveyCard) => {
  const [selectedScore, setSelectedScore] = useState<string>('');

  useEffect(() => {
    if (questionnaireAnswer) setSelectedScore(questionnaireAnswer.answer);
    else setSelectedScore('');
  }, [questionnaireAnswer]);

  if (!card || card.template !== SURVEY) return null;

  return (
    <>
      <CardHeader />
      <View style={styles.container}>
        <Text style={styles.question}>{card.question}</Text>
        <View style={styles.surveyScoreContainer}>
          <SurveyScoreSelector onPressScore={score => setSelectedScore(score)} selectedScore={selectedScore} />
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
      <QuestionCardFooter index={index} buttonColor={selectedScore ? PINK['500'] : GREY['300']}
        arrowColor={PINK['500']} buttonCaption='Valider' buttonDisabled={!selectedScore}
        validateCard={() => addQuestionnaireAnswer({ card: card._id, answer: selectedScore })} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: MARGIN.LG,
  },
  surveyScoreContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  question: {
    ...FIRA_SANS_REGULAR.LG,
    color: GREY['800'],
    justifyContent: 'flex-start',
  },
  labelContainer: {
    paddingTop: PADDING.XL,
    paddingHorizontal: PADDING.LG,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    width: 88,
    color: PINK[500],
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
});

const mapStateToProps = (state: StateType) => ({
  card: getCard(state),
  index: state.activities.cardIndex,
  questionnaireAnswer: getQuestionnaireAnswer(state),
});

const mapDispatchToProps = (dispatch: ({ type }: ActionType) => void) => ({
  addQuestionnaireAnswer: (qa: QuestionnaireAnswerType) => dispatch(Actions.addQuestionnaireAnswer(qa)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyCard);
