import { View, Text } from 'react-native';
import { QuestionnaireType } from '../../../types/QuestionnaireType';
import QuestionnaireCell from '../QuestionnaireCell';
import styles from './styles';

interface QuestionnairesContainerProps {
  questionnaires: QuestionnaireType[],
  profileId: string,
}

const QuestionnairesContainer = ({ questionnaires, profileId }: QuestionnairesContainerProps) => (
  <View style={styles.container}>
    <Text style={styles.header}>
      <Text style={styles.headerText}>Vous avez un formulaire à compléter.</Text>
    </Text>
    <QuestionnaireCell questionnaires={questionnaires} profileId={profileId} />
  </View>
);

export default QuestionnairesContainer;
