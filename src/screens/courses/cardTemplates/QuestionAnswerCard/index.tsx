import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { answerType, QuestionAnswerType } from '../../../../types/CardType';
import { StateType } from '../../../../types/store/StoreType';
import Selectors from '../../../../store/activities/selectors';
import CardHeader from '../../../../components/cards/CardHeader';
import { GREY, PINK } from '../../../../styles/colors';
import QuestionCardFooter from '../../../../components/cards/QuestionCardFooter';
import { navigate } from '../../../../navigationRef';
import cardsStyle from '../../../../styles/cards';
import FooterGradient from '../../../../components/design/FooterGradient';
import styles from './styles';
import QuestionAnswerProposition from '../../../../components/cards/QuestionAnswerProposition';

interface QuestionAnswerCardProps {
  card: QuestionAnswerType,
  cardIndex: number,
  isFocused: boolean,
}

export interface answer extends answerType {
  isSelected: boolean,
}

const QuestionAnswerCard = ({ card, cardIndex, isFocused }: QuestionAnswerCardProps) => {
  const [answers, setAnswers] = useState<Array<answer>>([]);

  useEffect(() => {
    if (isFocused) {
      setAnswers(card.questionAnswers.map(answer => ({ ...answer, isSelected: false })));
    }
  }, [card, isFocused]);

  if (!isFocused) return null;

  const isAnswerSelected = () => answers.some(answer => answer.isSelected);

  const onSelectAnswer = (index: number) => {
    if (!card.isQuestionAnswerMultipleChoiced) {
      setAnswers(array => array.map(el => Object.assign([], el, { isSelected: false })));
    }
    setAnswers(array => Object.assign([], array,
      { [index]: { ...array[index], isSelected: !array[index].isSelected } }));
  };

  const onPressFooterButton = () => {
    if (!isAnswerSelected()) return null;

    return navigate(`card-${cardIndex + 1}`);
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
          <FlatList data={answers} keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => renderItem(item, index)} />
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <FooterGradient />
        <QuestionCardFooter onPressButton={onPressFooterButton} buttonCaption={'Valider'}
          arrowColor={PINK[500]} index={cardIndex} buttonDisabled={!isAnswerSelected()}
          buttonColor={isAnswerSelected() ? PINK[500] : GREY[300]} />
      </View>
    </>
  );
};

const mapStateToProps = (state: StateType) => ({
  card: Selectors.getCard(state),
  cardIndex: state.activities.cardIndex,
});

export default connect(mapStateToProps)(QuestionAnswerCard);
