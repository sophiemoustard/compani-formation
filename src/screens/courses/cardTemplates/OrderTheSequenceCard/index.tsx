import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import shuffle from 'lodash/shuffle';
import Animated, { useAnimatedStyle, useSharedValue, runOnJS } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
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
import { ORDERED_ANSWER_MIN_HEIGHT } from '../../../../styles/metrics';

interface OrderTheSequenceCardProps {
  isLoading: boolean,
  setIsRightSwipeEnabled: (boolean: boolean) => void,
}

const DraggableItem = ({ item, index, isValidated, goUp, goDown }) => {
  const translate = useSharedValue({ x: 0, y: 0 });
  const zIndex = useSharedValue(0);

  const gesture = Gesture
    .Pan()
    .onBegin(() => {
      zIndex.value = 100;
    })
    .onUpdate((event) => {
      if (isValidated) return;
      translate.value = {
        x: 0,
        y: event.translationY,
      };
    })
    .onEnd(() => {
      if (isValidated) return;
      const move = Math.round((translate.value.y) / ORDERED_ANSWER_MIN_HEIGHT);
      if (Math.abs(move)) {
        if (move < 0) runOnJS(goUp)(index, Math.abs(move));
        if (move > 0) runOnJS(goDown)(index, Math.abs(move));
      }
      translate.value = { x: 0, y: 0 };
      zIndex.value = 0;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translate.value.x }, { translateY: translate.value.y }],
    zIndex: zIndex.value,
  }));

  return <GestureDetector gesture={gesture}>
    <Animated.View style={[animatedStyle]}>
      <OrderProposition item={item} isValidated={isValidated} />
    </Animated.View>
  </GestureDetector>;
};

const OrderTheSequenceCard = ({ isLoading, setIsRightSwipeEnabled }: OrderTheSequenceCardProps) => {
  const card: OrderTheSequenceType = useGetCard();
  const index = useGetCardIndex();
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
    return index !== null ? navigation.navigate(`card-${index + 1}`) : null;
  };

  const goUp = (i: number, increment: number) => {
    let newPosition = 0;
    if (i === 1) newPosition = 0;
    if (i === 2) newPosition = i - increment;
    const truc = answers.map((ans: AnswerPositionType, answerIndex: number) => {
      let test = answerIndex;
      if (answerIndex === newPosition) test = i;
      if (answerIndex === i) test = newPosition;
      return {
        label: ans.label,
        goodPosition: ans.goodPosition,
        tempPosition: test,
        _id: ans._id,
      };
    }).sort((a, b) => a.tempPosition - b.tempPosition);
    setAnswers(truc);
  };

  const goDown = (i: number, decrement: number) => {
    let newPosition = 2;
    if (i === 0) newPosition = i + decrement;
    if (i === 1) newPosition = 2;

    const truc = answers.map((ans: AnswerPositionType, answerIndex: number) => {
      let test = answerIndex;
      if (answerIndex === newPosition) test = i;
      if (answerIndex === i) test = newPosition;
      return {
        label: ans.label,
        goodPosition: ans.goodPosition,
        tempPosition: test,
        _id: ans._id,
      };
    }).sort((a, b) => a.tempPosition - b.tempPosition);
    setAnswers(truc);
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
        {answers.map((item, i) =>
          <DraggableItem key={i} item={item} index={i} isValidated={isValidated} goUp={goUp} goDown={goDown}/>)}
      </View>
      <View style={style.footerContainer}>
        {!isValidated && <FooterGradient />}
        <QuizCardFooter isValidated={isValidated} isValid={isOrderedCorrectly} cardIndex={index}
          buttonDisabled={false} footerColors={footerColors} explanation={card.explanation}
          onPressFooterButton={onPressFooterButton} />
      </View>
    </SafeAreaView>
  );
};

export default OrderTheSequenceCard;
