import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GREY, PINK } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';
import { BORDER_WIDTH, ICON } from '../../styles/metrics';

interface SurveyScoreSelectorProps {
  onPressScore: (score: number) => void,
  selectedScore: number | null,
}

const SurveyScoreSelector = ({ onPressScore, selectedScore }: SurveyScoreSelectorProps) => {
  const scores = Array.from({ length: 5 }, (_, i) => i + 1);

  const scoreItem = (score: number) => (
    <TouchableOpacity key={score.toString()} style={styles.buttonContainer} onPress={() => onPressScore(score)}
      hitSlop={{ top: 20, bottom: 40, left: 20, right: 20 }}>
      <View style={styles.button}>
        <View style={ score === selectedScore ? styles.selectedCircle : styles.circle} />
      </View>
      <Text style={ score === selectedScore ? styles.selectedText : styles.text}>{score}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.line} />
      <View style={styles.container}>
        {scores.map(score => scoreItem(score))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    borderWidth: BORDER_WIDTH,
    position: 'relative',
    top: ICON.XL / 2 + BORDER_WIDTH,
    borderColor: GREY[200],
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    height: ICON.XL,
  },
  button: {
    justifyContent: 'center',
    height: ICON.XL,
  },
  circle: {
    height: ICON.XS,
    width: ICON.XS,
    borderRadius: ICON.XS / 2,
    backgroundColor: GREY[200],
  },
  selectedCircle: {
    height: ICON.XL,
    width: ICON.XL,
    borderRadius: ICON.XL / 2,
    backgroundColor: PINK[300],
    borderWidth: 2,
    borderColor: PINK[500],
  },
  text: {
    ...FIRA_SANS_REGULAR.MD,
    textAlign: 'center',
  },
  selectedText: {
    ...FIRA_SANS_REGULAR.XL,
    textAlign: 'center',
    color: PINK[600],
  },
});

export default SurveyScoreSelector;
