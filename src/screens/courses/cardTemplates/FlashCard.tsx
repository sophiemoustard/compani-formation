import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { StateType } from '../../../types/store/StoreType';
import { getCard } from '../../../store/activities/selectors';
import { FlashCardType } from '../../../types/CardType';
import CardHeader from '../../../components/cards/CardHeader';
import { FIRA_SANS_BOLD, NUNITO_LIGHT } from '../../../styles/fonts';
import { GREY, PINK, WHITE } from '../../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, IS_LARGE_SCREEN, MARGIN, PADDING } from '../../../styles/metrics';
import CardFooter from '../../../components/cards/CardFooter';
import { FLASHCARD } from '../../../core/data/constants';
import AnimatedShadow from '../../../components/style/AnimatedShadow';

interface FlashCard {
  card: FlashCardType,
  index: number
}

const FlashCard = ({ card, index }: FlashCard) => {
  const [timesHasBeenClicked, setTimesHasBeenClicked] = useState('unclicked');
  const isFocused = useIsFocused();
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

  if (!card || card.template !== FLASHCARD || !isFocused) return null;

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

const styles = StyleSheet.create({
  container: {
    marginHorizontal: MARGIN.LG,
    marginVertical: IS_LARGE_SCREEN ? MARGIN.XXL : MARGIN.LG,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  contentContainer: {
    width: '100%',
    flexGrow: 1,
  },
  flipCard: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: PADDING.LG,
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
    borderRadius: BORDER_RADIUS.MD,
    backgroundColor: WHITE,
    backfaceVisibility: 'hidden',
  },
  question: {
    ...FIRA_SANS_BOLD.LG,
    color: GREY[800],
    textAlign: 'center',
    alignSelf: 'center',
  },
  questionWatermark: {
    ...NUNITO_LIGHT.XXXL,
    alignSelf: 'center',
    position: 'absolute',
    color: PINK[100],
  },
  flipCardBack: {
    backgroundColor: PINK[400],
    borderColor: PINK[500],
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
  },
  answer: {
    ...FIRA_SANS_BOLD.LG,
    color: WHITE,
    textAlign: 'center',
  },
  answerWatermark: {
    ...NUNITO_LIGHT.XXXL,
    alignSelf: 'center',
    position: 'absolute',
    color: PINK[500],
  },
  shadow: {
    backgroundColor: GREY[200],
    borderRadius: BORDER_RADIUS.LG,
  },

});

const mapStateToProps = (state: StateType) => ({ card: getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(FlashCard);
