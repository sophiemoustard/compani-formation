import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useNavigation } from '@react-navigation/native';
import { footerColorsType, OrderedAnswerType, OrderTheSequenceType } from '../../../../types/CardType';
import { StateType } from '../../../../types/store/StoreType';
import Selectors from '../../../../store/cards/selectors';
import Actions from '../../../../store/activities/actions';
import CardHeader from '../../../../components/cards/CardHeader';
import { GREEN, GREY, ORANGE, PINK } from '../../../../styles/colors';
import QuizCardFooter from '../../../../components/cards/QuizCardFooter';
import cardsStyle from '../../../../styles/cards';
import FooterGradient from '../../../../components/design/FooterGradient';
import OrderProposition from '../../../../components/cards/OrderProposition';
import { quizJingle } from '../../../../core/helpers/utils';
import { SCROLL_SENSIBILITY_WHEN_SWIPE_ENABLED } from '../../../../core/data/constants';
import styles from './styles';

interface OrderTheSequenceCardProps {
  card: OrderTheSequenceType,
  index: number,
  incGoodAnswersCount: () => void,
  isLoading: boolean,
  setIsRightSwipeEnabled: (boolean) => void,
}

export interface answerPositionType extends OrderedAnswerType {
  goodPosition: number,
  tempPosition: number,
}

const OrderTheSequenceCard = ({
  card,
  index,
  incGoodAnswersCount,
  isLoading,
  setIsRightSwipeEnabled,
}: OrderTheSequenceCardProps) => {
  const [answers, setAnswers] = useState<Array<answerPositionType>>([]);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [isOrderedCorrectly, setIsOrderedCorrectly] = useState<boolean>(false);
  const [footerColors, setFooterColors] = useState<footerColorsType>({
    buttons: PINK[500],
    text: GREY[100],
    background: GREY[100],
  });
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoading && !isValidated) {
      const shuffledCards = shuffle(card.orderedAnswers
        .map((ans, answerIndex) => ({ label: ans.text, goodPosition: answerIndex })));
      setAnswers(shuffledCards.map((ans, answerIndex) => ({ ...ans, tempPosition: answerIndex })));
    }
    setIsRightSwipeEnabled(isValidated || false);
  }, [card, isValidated, isLoading, setIsRightSwipeEnabled]);

  useEffect(() => {
    if (!isValidated) {
      return setFooterColors({ buttons: PINK[500], text: GREY[100], background: GREY[100] });
    }

    if (isOrderedCorrectly) {
      return setFooterColors({ buttons: GREEN[600], text: GREEN[600], background: GREEN[100] });
    }

    return setFooterColors({ buttons: ORANGE[600], text: ORANGE[600], background: ORANGE[100] });
  }, [isValidated, answers, isOrderedCorrectly]);

  const onPressFooterButton = () => {
    if (!isValidated) {
      const isOrderCorrect = answers.every(answer => (answer.goodPosition === answer.tempPosition));

      quizJingle(isOrderCorrect);
      setIsOrderedCorrectly(isOrderCorrect);
      if (isOrderCorrect) incGoodAnswersCount();

      return setIsValidated(true);
    }
    return navigation.navigate(`card-${index + 1}`);
  };

  const setAnswersArray = ({ data }) => {
    setAnswers(data.map((ans, answerIndex) => ({
      label: ans.label, goodPosition: ans.goodPosition, tempPosition: answerIndex,
    })));
  };

  const renderListHeaderComponent = () => <>
    <Text style={[cardsStyle.question, style.question]}>{card.question}</Text>
    <Text style={cardsStyle.informativeText}>
      Classez les réponses dans le bon ordre : de la meilleure à la moins bonne
    </Text>
  </>;
  const renderItem = ({ item, drag }) => <OrderProposition item={item} isValidated={isValidated} drag={drag} />;

  if (isLoading) return null;

  const style = styles(footerColors.background);

  return (
    <>
      <CardHeader />
      <View style={style.container}>
        <DraggableFlatList contentContainerStyle={style.draggableContainer} showsVerticalScrollIndicator={false}
          data={answers} ListHeaderComponentStyle={style.questionContainer} onDragEnd={setAnswersArray}
          ListHeaderComponent={renderListHeaderComponent} keyExtractor={(_, answerIndex) => answerIndex.toString()}
          renderItem={renderItem} activationDistance={SCROLL_SENSIBILITY_WHEN_SWIPE_ENABLED} />
      </View>
      <View style={style.footerContainer}>
        {!isValidated && <FooterGradient /> }
        <QuizCardFooter isValidated={isValidated} isValid={isOrderedCorrectly} cardIndex={index}
          buttonDisabled={false} footerColors={footerColors} explanation={card.explanation}
          onPressFooterButton={onPressFooterButton} />
      </View>
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.cards.cardIndex });
const mapDispatchToProps = dispatch => ({
  incGoodAnswersCount: () => dispatch(Actions.incGoodAnswersCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderTheSequenceCard);
