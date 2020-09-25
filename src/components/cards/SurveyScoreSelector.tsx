import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GREY, PINK } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';
import { BORDER_WIDTH, ICON, PADDING } from '../../styles/metrics';

interface SurveyScoreSelectorProps {
  onPressScore: (score: string) => void,
  selectedScore: string | null,
}

const SurveyScoreSelector = ({ onPressScore, selectedScore }: SurveyScoreSelectorProps) => {
  const scores = Array.from({ length: 5 }, (_, i) => `${i + 1}`);

  const scoreItem = (score: string) => (
    <TouchableOpacity key={score} style={styles.buttonContainer} onPress={() => onPressScore(score)}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} activeOpacity={1}>
      <View style={styles.button}>
        <View style={ score === selectedScore ? styles.selectedCircle : styles.circle} />
      </View>
      <Text style={ score === selectedScore ? styles.selectedText : styles.text}>{score}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.scoreContainer}>
        {scores.map(score => scoreItem(score))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING.LG,
  },
  line: {
    position: 'relative',
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
    top: ICON.XL / 2 + BORDER_WIDTH,
    marginRight: ICON.XL / 2,
    marginLeft: ICON.XL / 2,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: ICON.XL,
    height: ICON.XL,
    alignItems: 'center',
    marginBottom: PADDING.XL,
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
