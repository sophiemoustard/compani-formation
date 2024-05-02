import { Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles';
import QuestionnaireIcon from '../../../../assets/icons/QuestionnaireIcon';
import { QuestionnaireType } from '../../../types/QuestionnaireType';
import Shadow from '../../design/Shadow';

interface QuestionnaireCellProps {
  questionnaire: QuestionnaireType,
  profileId: string,
}

const QuestionnaireCell = ({ questionnaire, profileId }: QuestionnaireCellProps) => {
  const router = useRouter();

  const onPress = () => {
    router.navigate({
      pathname: 'Courses/QuestionnaireCardContainer',
      params: { questionnaireId: questionnaire._id, profileId },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.iconContainer}>
          <QuestionnaireIcon />
          <Shadow customStyle={styles.shadow} />
        </View>
      </TouchableOpacity>
      <Text style={styles.questionaireName} lineBreakMode={'tail'} numberOfLines={2}>{questionnaire.name}</Text>
    </View>
  );
};

export default QuestionnaireCell;
