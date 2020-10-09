import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { OpenQuestionType } from '../../../../types/CardType';
import { ActionType, StateType } from '../../../../types/store/StoreType';
import { getCard, getQuestionnaireAnswer } from '../../../../store/activities/selectors';
import CardHeader from '../../../../components/cards/CardHeader';
import { GREY, PINK } from '../../../../styles/colors';
import { IS_LARGE_SCREEN, MARGIN } from '../../../../styles/metrics';
import QuestionCardFooter from '../../../../components/cards/QuestionCardFooter';
import { OPEN_QUESTION } from '../../../../core/data/constants';
import AnswerTextArea from '../../../../components/cards/AnswerTextArea';
import { QuestionnaireAnswerType } from '../../../../types/store/ActivityStoreType';
import Actions from '../../../../store/activities/actions';
import styles from './style';

interface OpenQuestionCardProps {
  card: OpenQuestionType,
  index: number,
  questionnaireAnswer: QuestionnaireAnswerType,
  addQuestionnaireAnswer: (qa: QuestionnaireAnswerType) => void,
}

const OpenQuestionCard = ({ card, index, questionnaireAnswer, addQuestionnaireAnswer }: OpenQuestionCardProps) => {
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

  const scrollRef = useRef<ScrollView>(null);

  const onFocusTextInput = (contentHeight) => {
    scrollRef.current?.scrollTo({
      y: contentHeight,
      animated: true,
    });
  };

  const onBlurTextInput = () => {
    setIsSelected(false);
    Keyboard.dismiss();
  };

  if (!card || card.template !== OPEN_QUESTION) return null;

  return (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={style.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS} >
      {!isSelected && <CardHeader />}
      <ScrollView contentContainerStyle={style.container} ref={scrollRef} showsVerticalScrollIndicator={false}>
        <Text style={style.question}>{card.question}</Text>
        <View style={style.inputContainer}>
          <AnswerTextArea onChangeText={setAnswer} scrollTo={onFocusTextInput}
            onSelect={setIsSelected} answer={answer}/>
        </View>
      </ScrollView>
      <QuestionCardFooter index={index} buttonColor={answer ? PINK[500] : GREY[300]}
        arrowColor={PINK[500]} buttonCaption='Valider' buttonDisabled={!answer} onPressArrow={onBlurTextInput}
        validateCard={() => validateQuestionnaireAnswer(card._id, answer)} />
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: StateType) => ({
  card: getCard(state),
  index: state.activities.cardIndex,
  questionnaireAnswer: getQuestionnaireAnswer(state),
});

const mapDispatchToProps = (dispatch: ({ type }: ActionType) => void) => ({
  addQuestionnaireAnswer: (qa: QuestionnaireAnswerType) => dispatch(Actions.addQuestionnaireAnswer(qa)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenQuestionCard);
