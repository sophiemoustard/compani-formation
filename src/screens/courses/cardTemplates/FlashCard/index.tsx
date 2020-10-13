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

interface FlashCard {
  card: FlashCardType,
  index: number,
  isFocused: boolean,
}

const FlashCard = ({ card, index, isFocused }: FlashCard) => {
  const [timesHasBeenClicked, setTimesHasBeenClicked] = useState('unclicked');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animatedValue = new Animated.Value(0);
  const hasBeenClicked = useRef(false);
  let rotationValue = 0;
  animatedValue.addListener(({ value }) => { rotationValue = value; });

  useEffect(() => {
    if (timesHasBeenClicked === 'clickedOnce' && !hasBeenClicked.current) {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
      hasBeenClicked.current = true;
    } else if (hasBeenClicked.current) {
      setTimesHasBeenClicked('clickedMoreThanOnce');
    }
  }, [timesHasBeenClicked, hasBeenClicked, animatedValue, rotationValue]);

  if (!isFocused) return null;

  const flipCard = () => {
    if (timesHasBeenClicked === 'unclicked') {
      setTimesHasBeenClicked('clickedOnce');
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
      <CardFooter index={index} template={card.template} removeRight={timesHasBeenClicked === 'unclicked'} />
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(FlashCard);
