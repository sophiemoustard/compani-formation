import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardHeader from '../../../../components/cards/CardHeader';
import CardFooter from '../../../../components/cards/CardFooter';
import AnimatedShadow from '../../../../components/design/AnimatedShadow';
import {
  useGetCard,
  useGetCardIndex,
  useSetViewedFlashCards,
  useGetViewedFlashCards,
} from '../../../../store/cards/hooks';
import { IS_WEB } from '../../../../core/data/constants';
import { FlashCardType } from '../../../../types/CardType';
import styles from './styles';

interface FlashCardProps {
  isLoading: boolean,
  setIsRightSwipeEnabled: (boolean: boolean) => void,
}

// eslint-disable-next-line no-shadow
export enum ClickOnCard {
  UNCLICKED_CARD = 'unclicked',
  CLICKED_ONCE_CARD = 'clickedOnce',
  CLICKED_MORE_THAN_ONCE_CARD = 'clickedMoreThanOnce',
}

const FlashCard = ({ isLoading, setIsRightSwipeEnabled }: FlashCardProps) => {
  const card: FlashCardType = useGetCard();
  const index = useGetCardIndex();
  const viewedFlashCards = useGetViewedFlashCards();
  const hasCardBeenViewed = viewedFlashCards.includes(card._id);
  const setViewedFlashCards = useSetViewedFlashCards();
  const [timesHasBeenClicked, setTimesHasBeenClicked] = useState<ClickOnCard>(ClickOnCard.UNCLICKED_CARD);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [hasBeenClicked, setHasBeenClicked] = useState<boolean>(false);
  let rotationValue = 0;
  animatedValue.addListener(({ value }) => { rotationValue = value; });

  useEffect(() => {
    setHasBeenClicked(hasCardBeenViewed);
    setIsRightSwipeEnabled(hasCardBeenViewed);
  }, [hasCardBeenViewed, setIsRightSwipeEnabled]);

  if (isLoading) return null;

  const flipCard = () => {
    if (timesHasBeenClicked === ClickOnCard.UNCLICKED_CARD) {
      setTimesHasBeenClicked(ClickOnCard.CLICKED_ONCE_CARD);
      if (!hasCardBeenViewed) setViewedFlashCards(card._id);
    }
    Animated.spring(animatedValue, {
      toValue: rotationValue >= 90 ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: !IS_WEB,
    }).start();
  };

  const frontInterpolate = animatedValue.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '180deg'] });
  const backInterpolate = animatedValue.interpolate({ inputRange: [0, 180], outputRange: ['180deg', '360deg'] });
  const frontAnimatedStyle = { transform: [{ rotateY: frontInterpolate }] };
  const backAnimatedStyle = { transform: [{ rotateY: backInterpolate }] };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <CardHeader />
      <View style={styles.container}>
        <TouchableOpacity style={styles.contentContainer} onPress={flipCard}>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={styles.questionWatermark}>?</Text>
            <Text style={styles.question}>{card.text}</Text>
          </Animated.View>
          <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
            <Text style={styles.answerWatermark}>!</Text>
            <Text style={styles.answer}>{card.backText}</Text>
          </Animated.View>
          <AnimatedShadow customStyle={[styles.shadow, frontAnimatedStyle]} />
        </TouchableOpacity>
      </View>
      <CardFooter index={index} removeRight={!hasBeenClicked} />
    </SafeAreaView>
  );
};

export default FlashCard;
