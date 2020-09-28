import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { OpenQuestionType } from '../../../types/CardType';
import { ActionType, StateType } from '../../../types/store/StoreType';
import { getCard, getQuestionnaireAnswer } from '../../../store/activities/selectors';
import CardHeader from '../../../components/cards/CardHeader';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { GREY, PINK } from '../../../styles/colors';
import { MARGIN } from '../../../styles/metrics';
import QuestionCardFooter from '../../../components/cards/QuestionCardFooter';
import { OPEN_QUESTION } from '../../../core/data/constants';
import AnswerField from './AnswerField';
import { QuestionnaireAnswerType } from '../../../types/store/ActivityStoreType';
import Actions from '../../../store/activities/actions';

interface OpenQuestionProps {
  card: OpenQuestionType,
  index: number,
  questionnaireAnswer: QuestionnaireAnswerType,
  addQuestionnaireAnswer: (qa: QuestionnaireAnswerType) => void,
}

const OpenQuestion = ({ card, index, questionnaireAnswer, addQuestionnaireAnswer }: OpenQuestionProps) => {
  const [answer, setAnswer] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const isIOS = Platform.OS === 'ios';
  const style = styles(isSelected);

  useEffect(() => {
    if (questionnaireAnswer) setAnswer(questionnaireAnswer.answer);
    else setAnswer('');
  }, [questionnaireAnswer]);

  if (!card || card.template !== OPEN_QUESTION) return null;

  return (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={style.keyboardAvoidingView} >
      {!isSelected && <CardHeader />}
      <ScrollView contentContainerStyle={style.container}>
        <Text style={style.question}>{card.question}</Text>
        <View style={style.inputContainer}>
          <AnswerField onChangeText={(text: string) => setAnswer(text) }
            onSelect={(selected: boolean) => setIsSelected(selected)} answer={answer}/>
        </View>
      </ScrollView>
      <QuestionCardFooter index={index} buttonColor={answer ? PINK[500] : GREY[300]}
        arrowColor={PINK[500]} buttonCaption='Valider' buttonDisabled={!answer}
        validateCard={() => addQuestionnaireAnswer({ card: card._id, answer })} />
    </KeyboardAvoidingView>
  );
};

const styles = (isSelected: boolean) => StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    marginBottom: MARGIN.LG,
  },
  question: {
    ...FIRA_SANS_REGULAR.LG,
    color: GREY[800],
    marginHorizontal: MARGIN.LG,
    marginBottom: MARGIN.XL,
    marginTop: isSelected ? MARGIN.MD : 0,
  },
  inputContainer: {
    flexGrow: 1,
    marginHorizontal: MARGIN.MD,
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

export default connect(mapStateToProps, mapDispatchToProps)(OpenQuestion);
