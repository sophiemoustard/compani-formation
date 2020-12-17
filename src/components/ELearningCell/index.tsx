import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { StepType } from '../../types/StepType';
import { ICON } from '../../styles/metrics';
import { GREY } from '../../styles/colors';
import IconButton from '../IconButton';
import StepCellTitle from '../steps/StepCellTitle';
import ActivityList from '../activities/ActivityList';
import styles from './styles';
import ProgressPieChart from '../ProgressPieChart';

interface ELearningCellProps {
  step: StepType,
  index: number,
  navigation: { navigate: (path: string, activityId: any) => {} },
  profileId: string,
}

const ELearningCell = ({ step, index, navigation, profileId }: ELearningCellProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onPressChevron = () => { setIsOpen(prevState => !prevState); };

  const iconButtonStyle = isOpen
    ? { ...styles.iconButtonContainer, ...styles.openedIconButtonContainer }
    : styles.iconButtonContainer;

  return (
    <View style={[styles.container, isOpen && styles.openedContainer]}>
      <TouchableOpacity activeOpacity={1} onPress={onPressChevron} style={styles.textContainer}>
        <View style={styles.topContainer}>
          <ProgressPieChart step={step} />
          <StepCellTitle index={index} step={step} />
          <IconButton name={isOpen ? 'chevron-up' : 'chevron-down' } onPress={onPressChevron} size={ICON.MD}
            color={GREY[500]} style={iconButtonStyle} />
        </View>
      </TouchableOpacity>
      {isOpen && <ActivityList step={step} profileId={profileId} navigation={navigation} />}
    </View>
  );
};

export default ELearningCell;
