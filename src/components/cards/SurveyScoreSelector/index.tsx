import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

interface SurveyScoreSelectorProps {
  onPressScore: (score: string) => void,
  selectedScore: string,
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

export default SurveyScoreSelector;
