import React from 'react';
import { Text, View } from 'react-native';
import cardsStyle from '../../../styles/cards';
import styles from './styles';

interface FillTheGapQuestionProps {
  text: string,
  isValidated: boolean,
  renderGap: (index: number) => void,
}

const FillTheGapQuestion = ({ text, isValidated, renderGap }: FillTheGapQuestionProps) => {
  const splittedText = text.replace(/<trou>[^<]*<\/trou>/g, '<trou>').split(' ');

  const formatText = (words) => {
    let i = 0;
    return words.map((word, idx) => {
      if (word === '<trou>') {
        const gapIndex = `<trou${i}>`;
        i += 1;
        return gapIndex;
      }
      if (words[idx - 1] === '<trou>') return ` ${word}`;
      return word;
    });
  };

  return <View style={[cardsStyle.question, styles.questionContainer]} pointerEvents={isValidated ? 'none' : 'auto'}>
    {formatText(splittedText).map((txt, index) => {
      for (let j = 0; j < 2; j += 1) {
        if (txt === `<trou${j}>`) return renderGap(j);
      }
      return <Text style={styles.question} key={`text${index}`}>{`${txt} `}</Text>;
    })
    }
  </View>;
};

export default FillTheGapQuestion;
