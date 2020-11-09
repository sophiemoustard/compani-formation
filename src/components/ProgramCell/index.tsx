import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import { Feather } from '@expo/vector-icons';
import get from 'lodash/get';
import { ProgramType } from '../../types/ProgramType';
import styles from './styles';
import { BORDER_RADIUS, ICON } from '../../styles/metrics';
import { PINK, WHITE, YELLOW } from '../../styles/colors';

interface ProgramCellProps {
  program: ProgramType,
  progress?: number | undefined;
  onPress: () => void;
}

const ProgramCell = ({ program, progress = undefined, onPress }: ProgramCellProps) => {
  const programName = program.name || '';
  const programImage = get(program, 'image.link') || '';
  const source = programImage
    ? { uri: programImage }
    : require('../../../assets/images/authentication_background_image.jpg');

  const renderProgress = () => {
    if (progress === 0) {
      return (
        <View style={styles.unstartedContainer}>
          <Feather name='play-circle' size={ICON.MD} color={PINK[500]} />
        </View>
      );
    } if (progress && progress < 1) {
      return (
        <View style={styles.progressContainer}>
          <ProgressCircle style={styles.progress} progress={progress} progressColor={YELLOW[500]}
            strokeWidth={4} cornerRadius={BORDER_RADIUS.LG} backgroundColor={WHITE} />
        </View>
      );
    } if (progress === 1) {
      return (
        <View style={styles.finishedContainer}>
          <Feather name='check' size={ICON.XS} color={WHITE} />
        </View>
      );
    }
    return null;
  };

  return (
    <TouchableOpacity style={styles.courseContainer} onPress={onPress}>
      <View style={styles.imageContainer}>
        <ImageBackground source={source} imageStyle={styles.image}
          style={{ resizeMode: 'contain' } as StyleProp<ViewStyle>}>
          {renderProgress()}
        </ImageBackground>
      </View>
      <View style={styles.title}>
        <Text lineBreakMode={'tail'} numberOfLines={2}>{programName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProgramCell;
