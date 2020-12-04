import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { StepType } from '../../types/StepType';
import { ICON } from '../../styles/metrics';
import { GREY } from '../../styles/colors';
import IconButton from '../IconButton';
import StepCellTitle from '../steps/StepCellTitle';
import ActivityCell from '../activities/ActivityCell';
import styles from './styles';
import ProgressPieChart from '../ProgressPieChart';

interface ELearningCellProps {
  step: StepType,
  index: number,
  navigation: { navigate: (path: string, activityId: any) => {} },
  id: string,
}

const ELearningCell = ({ step, index, navigation, id }: ELearningCellProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onPressChevron = () => { setIsOpen(prevState => !prevState); };

  const renderActivityCell = activity => <ActivityCell activity={activity} courseId={id} navigation={navigation} />;

  const renderSeparator = () => <View style={styles.separator} />;

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
      {isOpen &&
        <FlatList horizontal data={step.activities} keyExtractor={item => item._id}
          renderItem={({ item }) => renderActivityCell(item)} ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={styles.activityCellList} showsHorizontalScrollIndicator={false} />}
    </View>
  );
};

export default ELearningCell;
