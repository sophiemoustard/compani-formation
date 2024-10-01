import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import shuffle from 'lodash/shuffle';
import { useNavigation } from '@react-navigation/native';
import CardHeader from '../../../../components/cards/CardHeader';
import QuizCardFooter from '../../../../components/cards/QuizCardFooter';
import FooterGradient from '../../../../components/design/FooterGradient';
import OrderProposition from '../../../../components/cards/OrderProposition';
import { quizJingle } from '../../../../core/helpers/utils';
import {
  useAddQuizzAnswer,
  useGetCard,
  useGetCardIndex,
  useGetQuizzAnswer,
  useIncGoodAnswersCount,
} from '../../../../store/cards/hooks';
import cardsStyle from '../../../../styles/cards';
import { GREEN, GREY, ORANGE, PINK } from '../../../../styles/colors';
import { footerColorsType, OrderTheSequenceType, AnswerPositionType } from '../../../../types/CardType';
import styles from './styles';

interface OrderTheSequenceCardProps {
  isLoading: boolean,
  setIsRightSwipeEnabled: (boolean: boolean) => void,
}

const OrderTheSequenceCard = ({ isLoading, setIsRightSwipeEnabled }: OrderTheSequenceCardProps) => {
  const card: OrderTheSequenceType = useGetCard();
  const cardIndex = useGetCardIndex();
  const incGoodAnswersCount = useIncGoodAnswersCount();
  const quizzAnswer = useGetQuizzAnswer();
  const addQuizzAnswer = useAddQuizzAnswer();
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
      if (quizzAnswer?.answerList.length) {
        setAnswers(quizzAnswer.answerList as AnswerPositionType[]);
        setIsValidated(true);
        const isOrderCorrect = (quizzAnswer.answerList as AnswerPositionType[])
          .every(answer => (answer.goodPosition === answer.tempPosition));
        setIsOrderedCorrectly(isOrderCorrect);
      } else {
        const shuffledCards = shuffle(card.orderedAnswers
          .map((ans, answerIndex) => ({ label: ans.text, goodPosition: answerIndex, _id: ans._id })));
        setAnswers(shuffledCards.map((ans, answerIndex) => ({ ...ans, tempPosition: answerIndex })));
      }
    }
    setIsRightSwipeEnabled(isValidated || false);
  }, [card, isValidated, isLoading, setIsRightSwipeEnabled, quizzAnswer]);

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
      addQuizzAnswer({ card: card._id, answerList: answers });

      return setIsValidated(true);
    }
    return cardIndex !== null ? navigation.navigate(`card-${cardIndex + 1}`) : null;
  };

  const onDragUp = (index: number, positionCount: number) => {
    let newPosition = 0;
    if (index === 1) newPosition = 0;
    if (index === 2) newPosition = index - positionCount;
    const newAnswers = answers.map((ans: AnswerPositionType, answerIndex: number) => {
      let tmpPosition = answerIndex;
      if (answerIndex === newPosition) tmpPosition = index;
      if (answerIndex === index) tmpPosition = newPosition;
      return {
        label: ans.label,
        goodPosition: ans.goodPosition,
        tempPosition: tmpPosition,
        _id: ans._id,
      };
    });
    // .sort((a, b) => a.tempPosition - b.tempPosition);
    setAnswers(newAnswers);
  };

  const onDragDown = (index: number, positionCount: number) => {
    let newPosition = 2;
    if (index === 0) newPosition = index + positionCount;
    if (index === 1) newPosition = 2;

    const newAnswers = answers.map((ans: AnswerPositionType, answerIndex: number) => {
      let tmpPosition = answerIndex;
      if (answerIndex === newPosition) tmpPosition = index;
      if (answerIndex === index) tmpPosition = newPosition;
      return {
        label: ans.label,
        goodPosition: ans.goodPosition,
        tempPosition: tmpPosition,
        _id: ans._id,
      };
    });
    // .sort((a, b) => a.tempPosition - b.tempPosition);
    setAnswers(newAnswers);
  };

  const onMoveUp = (index: number, indexToMove: number) => {
    if (index === indexToMove + 1) console.log(`${indexToMove} goes to ${index}`);
    if (index === indexToMove + 2) {
      console.log(`${indexToMove} goes to ${indexToMove + 1} and ${indexToMove + 1} goes to ${index}`);
    }
  };
  const onMoveDown = (index: number, indexToMove: number) => {
    if (index === indexToMove - 1) console.log(`${indexToMove} goes to ${index}`);
    if (index === indexToMove - 2) {
      console.log(`${indexToMove} goes to ${indexToMove - 1} and ${indexToMove - 1} goes to ${index}`);
    }
  };

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
        {renderInformativeText()}
        {answers.map((item, index) =>
          <OrderProposition key={index} item={item} index={index} isValidated={isValidated} onDragUp={onDragUp}
            onDragDown={onDragDown} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />)}
      </View>
      <View style={style.footerContainer}>
        {!isValidated && <FooterGradient />}
        <QuizCardFooter isValidated={isValidated} isValid={isOrderedCorrectly} cardIndex={cardIndex}
          buttonDisabled={false} footerColors={footerColors} explanation={card.explanation}
          onPressFooterButton={onPressFooterButton} />
      </View>
    </SafeAreaView>
  );
};

export default OrderTheSequenceCard;
