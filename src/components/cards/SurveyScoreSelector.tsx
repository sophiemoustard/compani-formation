import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GREY, PINK } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';

interface SurveyScoreSelectorProps {
  onPressScore: (score: number) => void,
  selectedScore: number | null,
}

const SurveyScoreSelector = ({ onPressScore, selectedScore }: SurveyScoreSelectorProps) => {
  const scores = Array.from({ length: 5 }, (_, i) => i + 1);

  const scoreItem = (score: number) => (
    <View key={score.toString()} style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => onPressScore(score)} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        style={styles.button}>
        <View style={ score === selectedScore ? styles.selectedCircle : styles.circle} />
      </TouchableOpacity>
      <Text style={ score === selectedScore ? styles.selectedText : styles.text}>{score}</Text>
    </View>
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
    borderWidth: 1,
    position: 'relative',
    top: 17, // = button's size / 2 + border's size
    borderColor: GREY[200],
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    height: 32,
  },
  button: {
    justifyContent: 'center',
    height: 32,
  },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 16 / 2,
    backgroundColor: GREY[200],
  },
  selectedCircle: {
    height: 32,
    width: 32,
    borderRadius: 32 / 2,
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
