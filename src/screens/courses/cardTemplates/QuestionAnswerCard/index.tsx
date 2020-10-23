import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { answerFromAPIType, QuestionAnswerType } from '../../../../types/CardType';
import { ActionType, StateType } from '../../../../types/store/StoreType';
import Selectors from '../../../../store/activities/selectors';
import CardHeader from '../../../../components/cards/CardHeader';
import { GREY, PINK } from '../../../../styles/colors';
import QuestionCardFooter from '../../../../components/cards/QuestionCardFooter';
import cardsStyle from '../../../../styles/cards';
import FooterGradient from '../../../../components/design/FooterGradient';
import styles from './styles';
import QuestionAnswerProposition from '../../../../components/cards/QuestionAnswerProposition';
import Actions from '../../../../store/activities/actions';
import { QuestionnaireAnswerType } from '../../../../types/store/ActivityStoreType';

interface QuestionAnswerCardProps {
  card: QuestionAnswerType,
  cardIndex: number,
  isFocused: boolean,
  questionnaireAnswer: QuestionnaireAnswerType,
  addQuestionnaireAnswer: (qa: QuestionnaireAnswerType) => void,
}

export interface answerType extends answerFromAPIType {
  isSelected: boolean,
}

const QuestionAnswerCard = ({
  card,
  cardIndex,
  isFocused,
  questionnaireAnswer,
  addQuestionnaireAnswer,
}: QuestionAnswerCardProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Array<answerType>>([]);

  useEffect(() => {
    if (isFocused) {
      setSelectedAnswers(card.questionAnswers.map(answer =>
        ({ ...answer, isSelected: questionnaireAnswer?.answerList.includes(answer._id) })));
    }
  }, [card, isFocused, questionnaireAnswer]);

  if (!isFocused) return null;

  const isAnswerSelected = () => selectedAnswers.some(answer => answer.isSelected);

  const onSelectAnswer = (index: number) => {
    if (!card.isQuestionAnswerMultipleChoiced) {
      setSelectedAnswers(array => array.map(answer => Object.assign([], answer, { isSelected: false })));
    }
    setSelectedAnswers(array => Object.assign([], array,
      { [index]: { ...array[index], isSelected: !array[index].isSelected } }));
  };

  const validateQuestionnaireAnswer = (id: string) => {
    const answer = selectedAnswers.filter(sa => sa.isSelected).map(sa => sa._id);
    addQuestionnaireAnswer({ card: id, answerList: answer });
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
          buttonDisabled={!isAnswerSelected()} buttonColor={isAnswerSelected() ? PINK[500] : GREY[300]}
          validateCard={() => validateQuestionnaireAnswer(card._id)}/>
      </View>
    </>
  );
};

const mapStateToProps = (state: StateType) => ({
  card: Selectors.getCard(state),
  cardIndex: state.activities.cardIndex,
  questionnaireAnswer: Selectors.getQuestionnaireAnswer(state),
});

const mapDispatchToProps = (dispatch: ({ type }: ActionType) => void) => ({
  addQuestionnaireAnswer: (qa: QuestionnaireAnswerType) => dispatch(Actions.addQuestionnaireAnswer(qa)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswerCard);
