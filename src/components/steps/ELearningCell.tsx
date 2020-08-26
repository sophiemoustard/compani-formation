import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StepType } from '../../types/StepType';
import { MARGIN, PADDING, BORDER_WIDTH, BORDER_RADIUS, ICON } from '../../styles/metrics';
import { GREY, PINK } from '../../styles/colors';
import IconButton from '../IconButton';
import StepCellTitle from './StepCellTitle';
import ActivityCell from '../ActivityCell';

interface ELearningCellProps {
  step: StepType,
  index: number,
}

const ELearningCell = ({ step, index }: ELearningCellProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onPressChevron = () => { setIsOpen(prevState => !prevState); };

  const renderActivityCell = activity => <ActivityCell onPress={() => null} activity={activity}/>;

  const renderSeparator = () => <View style={styles.separator} />;

  const iconButtonStyle = isOpen
    ? { ...styles.iconButtonContainer, ...styles.openedIconButtonContainer }
    : styles.iconButtonContainer;

  return (
    <View style={isOpen ? { ...styles.container, ...styles.openedContainer } : styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={onPressChevron} style={styles.textContainer}>
        <View style={styles.topContainer}>
          <View style={styles.featherContainer}>
            <Feather name='play-circle' size={ICON.LG} color={PINK[500]} />
          </View>
          <StepCellTitle index={index} step={step} />
          <View style={iconButtonStyle}>
            <IconButton name={isOpen ? 'chevron-up' : 'chevron-down' } onPress={onPressChevron} size={ICON.MD}
              color={GREY[500]} />
          </View>
        </View>
      </TouchableOpacity>
      {isOpen &&
        <FlatList horizontal data={step.activities} keyExtractor={item => item._id}
          renderItem={({ item }) => renderActivityCell(item)} ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={styles.activityCellList} showsHorizontalScrollIndicator={false} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: GREY[100],
    marginHorizontal: MARGIN.MD,
    paddingVertical: PADDING.LG,
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS.XL,
    borderColor: GREY[200],
  },
  openedContainer: {
    marginRight: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  topContainer: {
    paddingHorizontal: PADDING.MD,
    flexDirection: 'row',
  },
  featherContainer: {
    width: 40,
    alignSelf: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  iconButtonContainer: {
    width: 40,
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
  openedIconButtonContainer: {
    marginRight: MARGIN.MD,
  },
  activityCellList: {
    marginTop: MARGIN.MD,
    paddingHorizontal: PADDING.MD,
  },
  separator: {
    marginHorizontal: MARGIN.XS,
  },
});

export default ELearningCell;
