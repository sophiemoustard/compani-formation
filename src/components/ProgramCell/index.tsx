import { Text, View, ImageBackground, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import get from 'lodash/get';
import { ProgramType } from '../../types/CourseTypes';
import styles from './styles';
import ProgressPieChart from '../ProgressPieChart';
import { formatDuration } from '../../core/helpers/utils';

interface ProgramCellProps {
  program: ProgramType,
  theoreticalHours: number,
  progress?: number | null,
  misc?: string | null,
  onPress: () => void,
}

const ProgramCell = ({ program, theoreticalHours, progress = null, misc = '', onPress }: ProgramCellProps) => {
  const programName = program.name || '';
  const programImage = get(program, 'image.link') || '';
  const programDescription = program.description || '';
  const source = programImage
    ? { uri: programImage }
    : require('../../../assets/images/authentication_background_image.jpg');

  const progressStyle = () => {
    switch (progress) {
      case 0: return styles.unstartedContainer;
      case 1: return styles.finishedContainer;
      default: return styles.progressContainer;
    }
  };

  return (
    <TouchableOpacity style={styles.courseContainer} onPress={onPress}>
      <View style={styles.imageContainer}>
        <ImageBackground source={source} imageStyle={styles.image}
          style={{ resizeMode: 'contain' } as StyleProp<ViewStyle>}>
          {progress !== null &&
            <View style={progressStyle()}>
              <ProgressPieChart progress={progress} />
            </View>}
        </ImageBackground>
      </View>
      <Text style={styles.title} lineBreakMode={'tail'} numberOfLines={2}>
        {programName}{misc ? ` - ${misc}` : ''}
      </Text>
      <Text style={styles.description} lineBreakMode={'tail'} numberOfLines={3}>{programDescription}</Text>
      {!!theoreticalHours &&
        <View>
          <Text style={styles.eLearning}>E-LEARNING</Text>
          <Text style={styles.theoreticalHours}>{formatDuration(theoreticalHours)}</Text>
        </View>}
    </TouchableOpacity>
  );
};

export default ProgramCell;
