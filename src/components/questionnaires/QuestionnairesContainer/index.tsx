import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { QuestionnaireType } from '../../../types/QuestionnaireType';
import QuestionnaireCell from '../QuestionnaireCell';
import { formatWordToPlural } from '../../../core/helpers/utils';

import styles from './styles';

interface QuestionnairesContainerProps {
  questionnaires: Array<QuestionnaireType>,
  profileId: string,
}

const QuestionnairesContainer = ({ questionnaires, profileId }: QuestionnairesContainerProps) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>
        Vous avez <Text style={styles.questionnairesCount}>{questionnaires.length} </Text>
        {formatWordToPlural(questionnaires, 'formulaire')} à compléter avant le début de la formation
      </Text>
    </View>
    <FlatList horizontal data={questionnaires} keyExtractor={item => item._id} showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <QuestionnaireCell questionnaire={item} profileId={profileId} />} />
  </View>
);

export default QuestionnairesContainer;
