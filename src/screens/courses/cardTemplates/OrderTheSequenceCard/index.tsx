import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { OrderedAnswerType, OrderTheSequenceType } from '../../../../types/CardType';
import { StateType } from '../../../../types/store/StoreType';
import Selectors from '../../../../store/activities/selectors';
import Actions from '../../../../store/activities/actions';
import CardHeader from '../../../../components/cards/CardHeader';
import { GREEN, GREY, ORANGE, PINK } from '../../../../styles/colors';
import QuestionCardFooter from '../../../../components/cards/QuestionCardFooter';
import { navigate } from '../../../../navigationRef';
import cardsStyle from '../../../../styles/cards';
import FooterGradient from '../../../../components/design/FooterGradient';
import OrderProposition from '../../../../components/cards/OrderProposition';
import styles from './styles';

interface OrderTheSequenceCardProps {
  card: OrderTheSequenceType,
  index: number,
  incGoodAnswersCount: () => void,
  isLoading: boolean,
}

export interface answerPositionType extends OrderedAnswerType {
  goodPosition: number,
  tempPosition: number,
}

interface footerColorsType {
  buttonsColor: string,
  textColor: string,
  backgroundColor: string,
}

const OrderTheSequenceCard = ({ card, index, incGoodAnswersCount, isLoading }: OrderTheSequenceCardProps) => {
  const [answers, setAnswers] = useState<Array<answerPositionType>>([]);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [isOrderedCorrectly, setIsOrderedCorrectly] = useState<boolean>(false);
  const [footerColors, setFooterColors] = useState<footerColorsType>({
    buttonsColor: PINK[500],
    textColor: GREY[100],
    backgroundColor: GREY[100],
  });

  useEffect(() => {
    if (!isLoading && !isValidated) {
      const shuffledCards = shuffle(card.orderedAnswers
        .map((ans, answerIndex) => ({ label: ans, goodPosition: answerIndex })));
      setAnswers(shuffledCards.map((ans, answerIndex) => ({ ...ans, tempPosition: answerIndex })));
    }
  }, [card, isValidated, isLoading]);

  useEffect(() => {
    if (!isValidated) {
      return setFooterColors({ buttonsColor: PINK[500], textColor: GREY[100], backgroundColor: GREY[100] });
    }

    if (isOrderedCorrectly) {
      return setFooterColors({ buttonsColor: GREEN[600], textColor: GREEN[600], backgroundColor: GREEN[100] });
    }

    return setFooterColors({ buttonsColor: ORANGE[600], textColor: ORANGE[600], backgroundColor: ORANGE[100] });
  }, [isValidated, answers, isOrderedCorrectly]);

  const onPressFooterButton = () => {
    if (!isValidated) {
      const isOrderCorrect = answers.every(answer => (answer.goodPosition === answer.tempPosition));
      setIsOrderedCorrectly(isOrderCorrect);
      if (isOrderCorrect) incGoodAnswersCount();

      return setIsValidated(true);
    }
    return navigate(`card-${index + 1}`);
  };

  const setAnswersArray = ({ data }) => {
    setAnswers(data.map((ans, answerIndex) => ({
      label: ans.label, goodPosition: ans.goodPosition, tempPosition: answerIndex,
    })));
  };

  const renderItem = ({ item, drag }) => <OrderProposition item={item} isValidated={isValidated} drag={drag} />;

  if (isLoading) return null;

  const style = styles(footerColors.textColor, footerColors.backgroundColor);

  return (
    <>
      <CardHeader />
      <View style={style.container}>
        <DraggableFlatList
          contentContainerStyle={style.draggableContainer}
          ListHeaderComponentStyle={style.questionContainer}
          ListHeaderComponent={
            <>
              <Text style={[cardsStyle.question, style.question]}>{card.question}</Text>
              <Text style={cardsStyle.informativeText}>
                Classez les réponses dans le bon ordre : de la meilleure à la moins bonne
              </Text>
            </>
          }
          showsVerticalScrollIndicator={false} data={answers} keyExtractor={(_, answerIndex) => answerIndex.toString()}
          renderItem={renderItem} onDragEnd={setAnswersArray} />
      </View>
      <View style={style.footerContainer}>
        {!isValidated && <FooterGradient /> }
        {isValidated && (
          <View style={[cardsStyle.explanation, style.explanation]}>
            <Text style={style.explanationTitle}>{isOrderedCorrectly ? 'Bonne réponse' : 'Mauvaise réponse'}</Text>
            <Text style={style.explanationText}>{card.explanation}</Text>
          </View>
        )}
        <QuestionCardFooter onPressButton={onPressFooterButton} buttonCaption={isValidated ? 'Continuer' : 'Valider'}
          arrowColor={footerColors.buttonsColor} index={index} buttonDisabled={false}
          buttonColor={footerColors.buttonsColor} />
      </View>
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.activities.cardIndex });
const mapDispatchToProps = dispatch => ({
  incGoodAnswersCount: () => dispatch(Actions.incGoodAnswersCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderTheSequenceCard);
