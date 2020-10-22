import React from 'react';
import { Text, View } from 'react-native';
import cardsStyle from '../../../styles/cards';
import styles from './styles';

interface renderQuestionProps {
  text: string,
  isValidated: boolean,
  renderGap: (index: number) => void,
}

const RenderQuestion = ({ text, isValidated, renderGap }: renderQuestionProps) => {
  const splittedText = text.split(/<trou>[^<]*<\/trou>/g);
  return <View style={[cardsStyle.question, styles.questionContainer]} pointerEvents={isValidated ? 'none' : 'auto'}>
    {
      splittedText.map((txt, index) => {
        if (index === 0 && txt === '') return renderGap(index);
        if (index === splittedText.length - 1 && txt === '') return null;
        if (index < splittedText.length - 1) {
          return <View key={`text${index}`} style={styles.textAndGapContainer}>
            <Text style={styles.question} >{txt}</Text>
            {renderGap(index)}
          </View>;
        }
        return <Text style={styles.question} key={`text${index}`}>{txt}</Text>;
      })
    }
  </View>;
};

export default RenderQuestion;
