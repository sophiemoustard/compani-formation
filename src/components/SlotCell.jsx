import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { GREY, WHITE } from '../styles/variables';

const SlotCell = ({ slotsByDay }) => {
  const date = get(slotsByDay, 'date') || '';
  const programName = get(slotsByDay, 'name') || '';
  const programSteps = get(slotsByDay, 'steps') || [];
  let slotsSteps = '';

  for (const slot of slotsByDay.slots) {
    const slotStep = get(slot, 'step.name') || '';
    const slotId = get(slot, 'step._id') || '';
    const indexOfStep = programSteps.indexOf(slotId);
    if (slotStep) slotsSteps += `${slotsSteps ? '\n' : ''}${indexOfStep + 1} - ${slotStep}`;
  }

  return <View style={styles.container}>
    <View style={styles.title}><Text>{date}</Text></View>
    <View style={styles.title}><Text>{programName}</Text></View>
    <View style={styles.title}><Text>{slotsSteps}</Text></View>
  </View>;
};

SlotCell.propTypes = {
  slotsByDay: PropTypes.object,
};

const borderRadius = 10;
const styles = StyleSheet.create({
  container: {
    width: 200,
    borderRadius: borderRadius,
    marginRight: 10,
    borderWidth: 1,
    borderColor: GREY,
  },
  title: {
    padding: 5,
    borderRadius: borderRadius,
    backgroundColor: WHITE,
    height: 50,
  }
});

export default SlotCell;
