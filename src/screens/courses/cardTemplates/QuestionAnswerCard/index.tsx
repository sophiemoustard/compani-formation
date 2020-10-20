import React, { useState } from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { QuestionAnswerType } from '../../../../types/CardType';
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

export interface answerType {
  answer: string,
  isSelected: boolean,
}

const QuestionAnswerCard = ({
  card,
  cardIndex,
  isFocused,
}: QuestionAnswerCardProps) => {
  const [answers, setAnswers] = useState<Array<answerType>>(
    card.questionAnswers.map(answer => ({ answer, isSelected: false }))
  );
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const footerColors = {
    buttonsColor: PINK[500],
    textColor: GREY[100],
    backgroundColor: GREY[100],
  };

  if (!isFocused) return null;

  const isOneAnswerSelected = () => answers.some(answer => answer.isSelected);

  const onSelectAnswer = (index: number) => {
    setAnswers((prevState: answerType[]) => {
      const newState = [...prevState];
      newState[index].isSelected = !newState[index].isSelected;
      return newState;
    });
  };

  const onPressFooterButton = () => {
    if (!isOneAnswerSelected()) return null;

    if (!isValidated) return setIsValidated(true);

    return navigate(`card-${cardIndex + 1}`);
  };

  const renderItem = (item, index) => <QuestionAnswerProposition onPress={onSelectAnswer} index={index}
    item={item.answer} isValidated={isValidated} isSelected={item.isSelected}
    disabled={isValidated || (!card.isQuestionAnswerMultipleChoiced &&
      answers.some(answer => answer.isSelected) && !item.isSelected)} />;

  const style = styles(footerColors.textColor, footerColors.backgroundColor);

  return (
    <>
      <CardHeader />
      <ScrollView contentContainerStyle={style.container} showsVerticalScrollIndicator={false}>
        <Text style={cardsStyle.question}>{card.question}</Text>
        <View>
          {card.isQuestionAnswerMultipleChoiced &&
          <Text style={cardsStyle.informativeText}>Plusieurs réponses sont possibles</Text>
          }
          {!card.isQuestionAnswerMultipleChoiced &&
          <Text style={cardsStyle.informativeText}>Une seule réponse est possible</Text>
          }
          <FlatList data={answers} keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => renderItem(item, index)} />
        </View>
      </ScrollView>
      <View style={style.footerContainer}>
        {!isValidated && <FooterGradient /> }
        <QuestionCardFooter onPressButton={onPressFooterButton} buttonCaption={isValidated ? 'Continuer' : 'Valider'}
          arrowColor={footerColors.buttonsColor} index={cardIndex} buttonDisabled={!isOneAnswerSelected()}
          buttonColor={isOneAnswerSelected() ? footerColors.buttonsColor : GREY[300]} />
      </View>
    </>
  );
};

const mapStateToProps = (state: StateType) => ({
  card: Selectors.getCard(state),
  cardIndex: state.activities.cardIndex,
});

export default connect(mapStateToProps)(QuestionAnswerCard);
