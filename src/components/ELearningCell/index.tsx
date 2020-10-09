import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StepType } from '../../types/StepType';
import { ICON } from '../../styles/metrics';
import { GREY, PINK } from '../../styles/colors';
import IconButton from '../IconButton';
import StepCellTitle from '../steps/StepCellTitle';
import ActivityCell from '../activities/ActivityCell';
import styles from './style';

interface ELearningCellProps {
  step: StepType,
  index: number,
  navigation: { navigate: (path: string, activityId: any) => {} },
  courseId: string,
}

const ELearningCell = ({ step, index, navigation, courseId }: ELearningCellProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onPressChevron = () => { setIsOpen(prevState => !prevState); };

  const renderActivityCell = activity => <ActivityCell activity={activity}
    onPress={() => navigation.navigate('CardContainer', { activityId: activity._id, courseId })}/>;

  const renderSeparator = () => <View style={styles.separator} />;

  const iconButtonStyle = isOpen
    ? { ...styles.iconButtonContainer, ...styles.openedIconButtonContainer }
    : styles.iconButtonContainer;

  return (
    <View style={[styles.container, isOpen && styles.openedContainer]}>
      <TouchableOpacity activeOpacity={1} onPress={onPressChevron} style={styles.textContainer}>
        <View style={styles.topContainer}>
          <View style={styles.featherContainer}>
            <Feather name='play-circle' size={ICON.LG} color={PINK[500]} />
          </View>
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
