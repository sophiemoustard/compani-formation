import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { answerFromAPIType, QuestionAnswerType } from '../../../../types/CardType';
import { ActionType, StateType } from '../../../../types/store/StoreType';
import Selectors from '../../../../store/cards/selectors';
import CardHeader from '../../../../components/cards/CardHeader';
import { GREY, PINK } from '../../../../styles/colors';
import QuestionCardFooter from '../../../../components/cards/QuestionCardFooter';
import cardsStyle from '../../../../styles/cards';
import FooterGradient from '../../../../components/design/FooterGradient';
import styles from './styles';
import QuestionAnswerProposition from '../../../../components/cards/QuestionAnswerProposition';
import Actions from '../../../../store/cards/actions';
import { QuestionnaireAnswersType } from '../../../../types/ActivityTypes';

interface QuestionAnswerCardProps {
  card: QuestionAnswerType,
  cardIndex: number,
  questionnaireAnswer: QuestionnaireAnswersType,
  addQuestionnaireAnswer: (qa: QuestionnaireAnswersType) => void,
  removeQuestionnaireAnswer: (card: string) => void,
  isLoading: boolean,
  setIsRightSwipeEnabled: (boolean) => void,
}

export interface answerType extends answerFromAPIType {
  isSelected: boolean,
}

const QuestionAnswerCard = ({
  card,
  cardIndex,
  questionnaireAnswer,
  addQuestionnaireAnswer,
  removeQuestionnaireAnswer,
  isLoading,
  setIsRightSwipeEnabled,
}: QuestionAnswerCardProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<answerType[]>([]);

  useEffect(() => setIsRightSwipeEnabled(false));

  useEffect(() => {
    if (!isLoading) {
      setSelectedAnswers(card.qcAnswers.map(answer =>
        ({ ...answer, isSelected: questionnaireAnswer?.answerList.includes(answer._id) })));
    }
  }, [card, isLoading, questionnaireAnswer]);

  if (isLoading) return null;

  const isAnswerSelected = () => selectedAnswers.some(answer => answer.isSelected);
  const isValidationDisabled = card.isMandatory && !isAnswerSelected();

  const onSelectAnswer = (index: number) => {
    if (!card.isQuestionAnswerMultipleChoiced) {
      setSelectedAnswers(array => array.map((answer, answerIdx) => ((answerIdx === index)
        ? answer
        : { ...answer, isSelected: false })));
    }
    setSelectedAnswers(array => Object.assign([], array,
      { [index]: { ...array[index], isSelected: !array[index].isSelected } }));
  };

  const validateQuestionnaireAnswer = () => {
    const answer = selectedAnswers.filter(sa => sa.isSelected).map(sa => sa._id);
    if (card.isMandatory && !isAnswerSelected()) return;
    if (card.isMandatory || isAnswerSelected()) addQuestionnaireAnswer({ card: card._id, answerList: answer });
    else removeQuestionnaireAnswer(card._id);
  };

  const renderItem = (item, index) => <QuestionAnswerProposition onPress={onSelectAnswer} index={index}
    item={item.text} isSelected={item.isSelected} />;

  return (
    <>
      <CardHeader />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={cardsStyle.question}>{card.question}</Text>
        <View>
          {card.isQuestionAnswerMultipleChoiced
            ? <Text style={cardsStyle.informativeText}>Plusieurs réponses sont possibles</Text>
            : <Text style={cardsStyle.informativeText}>Une seule réponse est possible</Text>
          }
          <FlatList data={selectedAnswers} keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => renderItem(item, index)} />
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <FooterGradient />
        <QuestionCardFooter buttonCaption={'Valider'} arrowColor={PINK[500]} index={cardIndex}
          buttonDisabled={isValidationDisabled} buttonColor={isValidationDisabled ? GREY[300] : PINK[500]}
          validateCard={validateQuestionnaireAnswer}/>
      </View>
    </>
  );
};

const mapStateToProps = (state: StateType) => ({
  card: Selectors.getCard(state),
  cardIndex: state.cards.cardIndex,
  questionnaireAnswer: Selectors.getQuestionnaireAnswer(state),
});

const mapDispatchToProps = (dispatch: ({ type }: ActionType) => void) => ({
  addQuestionnaireAnswer: (qa: QuestionnaireAnswersType) => dispatch(Actions.addQuestionnaireAnswer(qa)),
  removeQuestionnaireAnswer: (card: string) => dispatch(Actions.removeQuestionnaireAnswer(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswerCard);
