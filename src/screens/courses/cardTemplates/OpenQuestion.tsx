import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { OpenQuestionType } from '../../../types/CardType';
import { ActionType, StateType } from '../../../types/store/StoreType';
import { getCard, getQuestionnaireAnswer } from '../../../store/activities/selectors';
import CardHeader from '../../../components/cards/CardHeader';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { GREY, PINK } from '../../../styles/colors';
import { IS_LARGE_SCREEN, MARGIN } from '../../../styles/metrics';
import QuestionCardFooter from '../../../components/cards/QuestionCardFooter';
import { OPEN_QUESTION } from '../../../core/data/constants';
import AnswerTextArea from '../../../components/cards/AnswerTextArea';
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
    setAnswer(questionnaireAnswer?.answer ? questionnaireAnswer.answer : '');
  }, [questionnaireAnswer]);

  const validateQuestionnaireAnswer = (id: string, text: string) => {
    Keyboard.dismiss();
    addQuestionnaireAnswer({ card: id, answer: text });
  };

  if (!card || card.template !== OPEN_QUESTION) return null;

  return (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={style.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS} >
      {!isSelected && <CardHeader />}
      <ScrollView contentContainerStyle={style.container}>
        <Text style={style.question}>{card.question}</Text>
        <View style={style.inputContainer}>
          <AnswerTextArea onChangeText={setAnswer}
            onSelect={setIsSelected} answer={answer}/>
        </View>
      </ScrollView>
      <QuestionCardFooter index={index} buttonColor={answer ? PINK[500] : GREY[300]}
        arrowColor={PINK[500]} buttonCaption='Valider' buttonDisabled={!answer} onPressArrow={Keyboard.dismiss}
        validateCard={() => validateQuestionnaireAnswer(card._id, answer)} />
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
