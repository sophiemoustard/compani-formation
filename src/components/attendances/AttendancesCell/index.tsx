import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import QuestionnaireIcon from '../../../../assets/icons/QuestionnaireIcon';
import Shadow from '../../design/Shadow';

interface AttendanceCellProps {
  slots: any[],
  profileId: string,
}

const AttendanceCell = ({ slots, profileId }: AttendanceCellProps) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('AttendanceSignatureContainer', { profileId, slots });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.iconContainer}>
          <QuestionnaireIcon />
          <Shadow customStyle={styles.shadow} />
        </View>
      </TouchableOpacity>
      <Text style={styles.attendanceName} lineBreakMode={'tail'} numberOfLines={2}>
        Signatures
      </Text>
    </View>
  );
};

export default AttendanceCell;
