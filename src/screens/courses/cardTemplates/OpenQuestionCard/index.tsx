import { useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { OpenQuestionType } from '../../../../types/CardType';
import { ActionType, StateType } from '../../../../types/store/StoreType';
import Selectors from '../../../../store/cards/selectors';
import CardHeader from '../../../../components/cards/CardHeader';
import { GREY, PINK } from '../../../../styles/colors';
import { IS_LARGE_SCREEN, MARGIN } from '../../../../styles/metrics';
import QuestionCardFooter from '../../../../components/cards/QuestionCardFooter';
import AnswerTextArea from '../../../../components/cards/AnswerTextArea';
import { QuestionnaireAnswersType } from '../../../../types/ActivityTypes';
import Actions from '../../../../store/cards/actions';
import styles from './styles';
import { IS_IOS } from '../../../../core/data/constants';

interface OpenQuestionCardProps {
  card: OpenQuestionType,
  index: number | null,
  questionnaireAnswer: QuestionnaireAnswersType | null,
  isLoading: boolean,
  addQuestionnaireAnswer: (qa: QuestionnaireAnswersType) => void,
  removeQuestionnaireAnswer: (card: string) => void,
  setIsRightSwipeEnabled: (boolean: boolean) => void,
}

const OpenQuestionCard = ({
  card,
  index,
  questionnaireAnswer,
  isLoading,
  addQuestionnaireAnswer,
  removeQuestionnaireAnswer,
  setIsRightSwipeEnabled,
}: OpenQuestionCardProps) => {
  const [answer, setAnswer] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const scrollRef = useRef<ScrollView>(null);

  const style = styles(isSelected);

  useEffect(() => setIsRightSwipeEnabled(false));

  useEffect(() => {
    setAnswer(questionnaireAnswer?.answerList ? questionnaireAnswer.answerList[0] : '');
  }, [questionnaireAnswer]);

  if (isLoading) return null;

  const isValidationDisabled = card.isMandatory && !answer;

  const validateQuestionnaireAnswer = () => {
    if (!answer && card.isMandatory) return;
    if (answer) addQuestionnaireAnswer({ card: card._id, answerList: [answer] });
    else removeQuestionnaireAnswer(card._id);
    setIsSelected(false);
  };

  const onFocusTextInput = (contentHeight: number) => scrollRef.current?.scrollTo({ y: contentHeight, animated: true });

  return (
    <SafeAreaView style={style.safeArea} edges={['top']}>
      <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'} style={style.keyboardAvoidingView}
        keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS}>
        {!isSelected && <CardHeader />}
        <ScrollView contentContainerStyle={style.container} ref={scrollRef} showsVerticalScrollIndicator={false}>
          <Text style={style.question}>{card.question}</Text>
          <View style={style.inputContainer}>
            <AnswerTextArea onChangeText={setAnswer} scrollTo={onFocusTextInput}
              onSelect={setIsSelected} answer={answer}/>
          </View>
        </ScrollView>
        <QuestionCardFooter index={index} buttonColor={isValidationDisabled ? GREY[300] : PINK[500]}
          arrowColor={PINK[500]} buttonCaption='Valider' buttonDisabled={isValidationDisabled}
          onPressArrow={() => setIsSelected(false)} validateCard={validateQuestionnaireAnswer} />
      </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapDispatchToProps)(OpenQuestionCard);
