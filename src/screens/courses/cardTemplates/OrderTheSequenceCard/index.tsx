import { useState, useEffect, Dispatch } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useNavigation } from '@react-navigation/native';
import { footerColorsType, OrderTheSequenceType } from '../../../../types/CardType';
import { StateType } from '../../../../types/store/StoreType';
import Selectors from '../../../../store/cards/selectors';
import Actions from '../../../../store/cards/actions';
import CardHeader from '../../../../components/cards/CardHeader';
import { GREEN, GREY, ORANGE, PINK } from '../../../../styles/colors';
import QuizCardFooter from '../../../../components/cards/QuizCardFooter';
import cardsStyle from '../../../../styles/cards';
import FooterGradient from '../../../../components/design/FooterGradient';
import OrderProposition from '../../../../components/cards/OrderProposition';
import { quizJingle } from '../../../../core/helpers/utils';
import styles from './styles';
import { ActionType } from '../../../../context/types';

interface OrderTheSequenceCardProps {
  card: OrderTheSequenceType,
  index: number | null,
  incGoodAnswersCount: () => void,
  isLoading: boolean,
  setIsRightSwipeEnabled: (boolean: boolean) => void,
}

export type AnswerPositionType = {
  goodPosition: number,
  tempPosition: number,
  label: string
}

const OrderTheSequenceCard = ({
  card,
  index,
  incGoodAnswersCount,
  isLoading,
  setIsRightSwipeEnabled,
}: OrderTheSequenceCardProps) => {
  const [answers, setAnswers] = useState<AnswerPositionType[]>([]);
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
    return index !== null ? navigation.navigate(`card-${index + 1}`) : null;
  };

  const setAnswersArray = ({ data }: { data: AnswerPositionType[] }) => {
    setAnswers(data.map((ans: AnswerPositionType, answerIndex: number) => ({
      label: ans.label,
      goodPosition: ans.goodPosition,
      tempPosition: answerIndex,
    })));
  };

  const renderItem = ({ item, drag }: { item: AnswerPositionType, drag: () => void}) =>
    <OrderProposition item={item} isValidated={isValidated} drag={drag} />;

  const renderInformativeText = () => (
    <Text style={cardsStyle.informativeText}>
      Classez les réponses dans le bon ordre : de la meilleure à la moins bonne
    </Text>
  );

  if (isLoading) return null;

  const style = styles(footerColors.background);

  return (
    <SafeAreaView style={style.safeArea} edges={['top']}>
      <CardHeader />
      <Text style={[cardsStyle.question, style.question]}>{card.question}</Text>
      <View style={style.container}>
        <DraggableFlatList showsVerticalScrollIndicator={false} data={answers} onDragEnd={setAnswersArray}
          keyExtractor={item => item.label} renderItem={renderItem} ListHeaderComponent={renderInformativeText} />
      </View>
      <View style={style.footerContainer}>
        {!isValidated && <FooterGradient /> }
        <QuizCardFooter isValidated={isValidated} isValid={isOrderedCorrectly} cardIndex={index}
          buttonDisabled={false} footerColors={footerColors} explanation={card.explanation}
          onPressFooterButton={onPressFooterButton} />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.cards.cardIndex });

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  incGoodAnswersCount: () => dispatch(Actions.incGoodAnswersCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderTheSequenceCard);
