import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GREY, PINK } from '../../styles/colors';

interface SurveyScoreSelectorProps {
  onPressScore: (score: number) => void,
  selectedScore: number | null,
}

const SurveyScoreSelector = ({ onPressScore, selectedScore }: SurveyScoreSelectorProps) => {
  const scores = Array.from({ length: 5 }, (_, i) => i + 1);

  const scoreItem = (score: number) => (
    <TouchableOpacity onPress={() => onPressScore(score)} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      style={{ alignItems: 'center', justifyContent: 'center', width: 32, height: 32 }}>
      <View style={ score === selectedScore ? styles.selectedCircle : styles.circle} />
      <Text>{score}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ }}>
      <View style={styles.container}>
        {scores.map(score => scoreItem(score))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circleContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
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
});

export default SurveyScoreSelector;
