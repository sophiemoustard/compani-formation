import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import moment from '../core/helpers/moment';
import CalendarIcon from './CalendarIcon';
import { GREY_LIGHT, BLACK } from '../styles/variables';
import { stepTypeOptions } from '../core/data/constants';

const OnSiteCell = ({ step, slots, index}) => {
  const slotsFiltered = slots.filter(slot => slot.step === step._id).sort((a,b) => moment(a).isBefore(b) );
  let startDate, endDate;
  let toPlan = true;
  const stepTypeLabel = stepTypeOptions[step.type];

  const stepTypeText = `ÉTAPE ${index + 1} - ${stepTypeLabel}`;

  if (slotsFiltered.length) {
    startDate = slotsFiltered[0].startDate;
    endDate = slotsFiltered[slotsFiltered.length - 1].endDate;
    toPlan = false;
  }

  return <View style={styles.container}>
    { !toPlan && <CalendarIcon date={moment(startDate)} /> }
    <View style={styles.textContainer}>
      <Text style={styles.stepType}>{stepTypeText}</Text>
      <Text style={styles.stepName}>{step.name}</Text>
    </View>
  </View>;
};

OnSiteCell.propTypes = {
  step: PropTypes.object,
  slots: PropTypes.array,
  index: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: GREY_LIGHT,
    marginBottom: 5,
    marginTop: 5,
    flexDirection: 'row',
    padding: 10
  },
  textContainer: {
    marginLeft: 15,
    width: '70%',
  },
  stepType: {
    color: '#766570',
    fontSize: 12,
  },
  stepName: {
    color: BLACK,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OnSiteCell;
