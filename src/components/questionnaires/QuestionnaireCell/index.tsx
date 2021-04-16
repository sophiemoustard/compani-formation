import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import QuestionnaireIcon from '../../../../assets/icons/QuestionnaireIcon';
import { QuestionnaireType } from '../../../types/QuestionnaireType';
import Shadow from '../../design/Shadow';

interface QuestionnaireCellProps {
  questionnaire: QuestionnaireType,
}

const QuestionnaireCell = ({ questionnaire }: QuestionnaireCellProps) => (
  <View style={styles.container}>
    <TouchableOpacity>
      <View style={styles.iconContainer}>
        <QuestionnaireIcon />
        <Shadow customStyle={styles.shadow} />
      </View>
    </TouchableOpacity>
    <Text style={styles.questionaireName} lineBreakMode={'tail'} numberOfLines={2}>{questionnaire.title}</Text>
  </View>
);

export default QuestionnaireCell;
