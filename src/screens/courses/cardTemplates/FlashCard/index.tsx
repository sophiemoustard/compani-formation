import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { StateType } from '../../../../types/store/StoreType';
import Selectors from '../../../../store/activities/selectors';
import { FlashCardType } from '../../../../types/CardType';
import CardHeader from '../../../../components/cards/CardHeader';
import CardFooter from '../../../../components/cards/CardFooter';
import AnimatedShadow from '../../../../components/design/AnimatedShadow';
import styles from './styles';

interface FlashCardProps {
  card: FlashCardType,
  index: number,
  isLoading: boolean,
  setIsRightSwipeEnabled: (boolean) => void,
}

// eslint-disable-next-line no-shadow
export enum ClickOnCard {
  UNCLICKED_CARD = 'unclicked',
  CLICKED_ONCE_CARD = 'clickedOnce',
  CLICKED_MORE_THAN_ONCE_CARD = 'clickedMoreThanOnce',
}

const FlashCard = ({ card, index, isLoading, setIsRightSwipeEnabled }: FlashCardProps) => {
  const [timesHasBeenClicked, setTimesHasBeenClicked] = useState<ClickOnCard>(ClickOnCard.UNCLICKED_CARD);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animatedValue = new Animated.Value(0);
  const hasBeenClicked = useRef(false);
  let rotationValue = 0;
  animatedValue.addListener(({ value }) => { rotationValue = value; });

  useEffect(() => {
    setIsRightSwipeEnabled(timesHasBeenClicked !== ClickOnCard.UNCLICKED_CARD);
    if (timesHasBeenClicked === ClickOnCard.CLICKED_ONCE_CARD && !hasBeenClicked.current) {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
      hasBeenClicked.current = true;
    } else if (hasBeenClicked.current) {
      setTimesHasBeenClicked(ClickOnCard.CLICKED_MORE_THAN_ONCE_CARD);
    }
  }, [timesHasBeenClicked, hasBeenClicked, animatedValue, rotationValue, setIsRightSwipeEnabled]);

  if (isLoading) return null;

  const flipCard = () => {
    if (timesHasBeenClicked === ClickOnCard.UNCLICKED_CARD) {
      setTimesHasBeenClicked(ClickOnCard.CLICKED_ONCE_CARD);
    } if (rotationValue >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  const frontInterpolate = animatedValue.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '180deg'] });
  const backInterpolate = animatedValue.interpolate({ inputRange: [0, 180], outputRange: ['180deg', '360deg'] });
  const frontAnimatedStyle = { transform: [{ rotateY: frontInterpolate }] };
  const backAnimatedStyle = { transform: [{ rotateY: backInterpolate }] };

  return (
    <>
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
      <CardFooter index={index} removeRight={timesHasBeenClicked === ClickOnCard.UNCLICKED_CARD} />
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.cards.cardIndex });

export default connect(mapStateToProps)(FlashCard);
