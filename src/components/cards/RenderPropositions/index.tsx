import React from 'react';
import { View } from 'react-native';
import { DraxView } from 'react-native-drax';
import { FillTheGapAnswers } from '../../../screens/courses/cardTemplates/FillTheGapCard';
import styles from './styles';

interface renderPropositionsProps {
  isValidated: boolean,
  propositions: Array<FillTheGapAnswers>
  setAnswersAndPropositions: (event: any) => void,
  renderContent: (isVisible, item, text) => JSX.Element,
}

const RenderPropositions = ({
  isValidated,
  propositions,
  setAnswersAndPropositions,
  renderContent,
}: renderPropositionsProps) => <View style={styles.answersContainer} pointerEvents={isValidated ? 'none' : 'auto'}>
  {propositions.map((proposition, idx) =>
    <DraxView style={styles.gapContainer} key={`proposition${idx}`}
      onReceiveDragDrop={event => setAnswersAndPropositions(event)} renderContent={() =>
        renderContent(proposition.visible, proposition, proposition.text)} />)}
</View>;

export default RenderPropositions;
