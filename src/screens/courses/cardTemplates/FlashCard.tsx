import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { StateType } from '../../../types/store/StoreType';
import { getCard } from '../../../store/activities/selectors';
import { FlashType } from '../../../types/CardType';
import CardHeader from '../../../components/cards/CardHeader';
import { FIRA_SANS_BOLD } from '../../../styles/fonts';
import { GREY, PINK, WHITE } from '../../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN } from '../../../styles/metrics';
import CardFooter from '../../../components/cards/CardFooter';
import { FLASHCARD } from '../../../core/data/constants';
import Shadow from '../../../components/style/Shadow';

interface FlashCard {
  card: FlashType,
  index: number
}

const FlashCard = ({ card, index }: FlashCard) => {
  if (!card || card.template !== FLASHCARD) return null;

  const animatedValue = new Animated.Value(0);
  let value1 = 0;
  animatedValue.addListener(({ value }) => { value1 = value; });
  const flipCard = () => {
    if (value1 >= 90) {
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
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [
      { rotateY: frontInterpolate },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      { rotateY: backInterpolate },
    ],
  };
  return (
    <>
      <CardHeader />
      <View style={styles.container}>
        <TouchableOpacity style= {styles.contentContainer} onPress= {flipCard}>
          <Animated.View style= {[styles.flipCard, frontAnimatedStyle]}>
            <Text style={styles.question}>{card.text}</Text>
          </Animated.View>
          <Animated.View style= {[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
            <Text style={styles.answer}>{card.backText}</Text>
          </Animated.View>
        </TouchableOpacity>
<<<<<<< HEAD
        {/* <Animated.View style={[frontAnimatedStyle, styles.shadow]}> */}
        <Shadow backgroundColor={GREY['200']} borderRadius={BORDER_RADIUS.LG}/>
        {/* </Animated.View> */}
=======
        <Animated.View style={[frontAnimatedStyle, styles.shadow]}>
          <Shadow backgroundColor={GREY['200']} borderRadius={BORDER_RADIUS.LG}/>
        </Animated.View>
>>>>>>> COM-1503: fix container size
      </View>
      <CardFooter index={index} template={card.template}/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: MARGIN.LG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    height: 360,
    width: 312,
    flexGrow: 1,
  },
  flipCard: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderWidth: BORDER_WIDTH,
    borderColor: GREY['200'],
    borderRadius: BORDER_RADIUS.MD,
    backgroundColor: WHITE,
    backfaceVisibility: 'hidden',
  },
  question: {
    ...FIRA_SANS_BOLD.LG,
    color: GREY['800'],
    textAlign: 'center',
  },
  flipCardBack: {
    backgroundColor: PINK['400'],
    borderColor: PINK['500'],
    position: 'absolute',
    top: 0,
  },
  shadow: {
    position: 'absolute',
    top: 0,
    bottom: -3,
    left: 0,
    right: 0,
    backgroundColor: GREY['200'],
    zIndex: -1,
    borderRadius: BORDER_RADIUS.LG,

  },
  answer: {
    ...FIRA_SANS_BOLD.LG,
    color: WHITE,
    textAlign: 'center',
  },

});

const mapStateToProps = (state: StateType) => ({ card: getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(FlashCard);
