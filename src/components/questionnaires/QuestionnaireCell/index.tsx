import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import QuestionnaireIcon from '../../../../assets/icons/QuestionnaireIcon';
import { QuestionnaireType } from '../../../types/QuestionnaireType';

interface QuestionnaireCellProps {
  questionnaire: QuestionnaireType,
}

const QuestionnaireCell = ({ questionnaire }: QuestionnaireCellProps) => (
  <View style={styles.container}>
    <TouchableOpacity>
      <QuestionnaireIcon style={{ container: styles.iconContainer, shadow: styles.shadow }}/>
    </TouchableOpacity>
    <Text style={styles.questionaireName} lineBreakMode={'tail'} numberOfLines={2}>{questionnaire.title}</Text>
  </View>
);

export default QuestionnaireCell;
