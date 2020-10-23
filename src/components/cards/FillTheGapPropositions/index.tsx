import React from 'react';
import { View } from 'react-native';
import { DraxView } from 'react-native-drax';
import { FillTheGapAnswers } from '../../../screens/courses/cardTemplates/FillTheGapCard';
import styles from './styles';

interface FillTheGapPropositionsProps {
  isValidated: boolean,
  propositions: Array<FillTheGapAnswers>
  setProposition: (event: any) => void,
  renderContent: (isVisible, item, text) => JSX.Element,
}

const FillTheGapPropositions = ({
  isValidated,
  propositions,
  setProposition,
  renderContent,
}: FillTheGapPropositionsProps) => (
  <View style={styles.answersContainer} pointerEvents={isValidated ? 'none' : 'auto'}>
    {propositions.map((proposition, idx) =>
      <DraxView style={styles.gapContainer} key={`proposition${idx}`}
        onReceiveDragDrop={event => setProposition(event)}
        renderContent={() => renderContent(proposition.visible, proposition, proposition.text)} />)}
  </View>
);

export default FillTheGapPropositions;
