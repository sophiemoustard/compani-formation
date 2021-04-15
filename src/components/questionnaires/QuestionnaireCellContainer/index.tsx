import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { QuestionnaireType } from '../../../types/QuestionnaireType';
import QuestionnaireCell from '../QuestionnaireCell';

import styles from './styles';

interface QuestionnaireCellContainerProps {
  questionnaires: Array<QuestionnaireType>,
}

const QuestionnaireCellContainer = ({ questionnaires }: QuestionnaireCellContainerProps) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>
        Vous avez <Text style={styles.questionnairesCount}>{questionnaires.length}</Text> formulaire
        {questionnaires.length > 1 ? 's' : ''} à compléter avant le début de la formation
      </Text>
    </View>
    <FlatList horizontal data={questionnaires} keyExtractor={item => item._id}
      renderItem={({ item }) => <QuestionnaireCell questionnaire={item} />} showsHorizontalScrollIndicator={false} />
  </View>
);

export default QuestionnaireCellContainer;
