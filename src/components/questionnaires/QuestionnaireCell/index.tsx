import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import QuestionnaireIcon from '../../../../assets/icons/QuestionnaireIcon';
import { capitalizeFirstLetter } from '../../../core/helpers/utils';
import { getQuestionnaireTitle } from '../../../core/helpers/courses';
import { QuestionnaireType } from '../../../types/QuestionnaireType';
import Shadow from '../../design/Shadow';

interface QuestionnaireCellProps {
  questionnaires: QuestionnaireType[],
  profileId: string,
}

const QuestionnaireCell = ({ questionnaires, profileId }: QuestionnaireCellProps) => {
  const navigation = useNavigation();
  const types = questionnaires.map(q => q.type);

  const onPress = () => {
    navigation.navigate('QuestionnaireCardContainer', { profileId });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.iconContainer}>
          <QuestionnaireIcon />
          <Shadow customStyle={styles.shadow} />
        </View>
      </TouchableOpacity>
      <Text style={styles.questionaireName} lineBreakMode={'tail'} numberOfLines={2}>
        {capitalizeFirstLetter(getQuestionnaireTitle(types))}
      </Text>
    </View>
  );
};

export default QuestionnaireCell;
