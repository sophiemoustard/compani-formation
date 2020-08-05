import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import moment from '../core/helpers/moment';
import CalendarIcon from './CalendarIcon';
import { GREY_LIGHT, BLACK } from '../styles/variables';
import { stepTypeOptions } from '../core/data/constants';
import { MARGIN, PADDING } from '../styles/metrics';

const OnSiteCell = ({ step, slots, index}) => {
  const stepSlots = slots.filter(slot => slot.step === step._id).sort((a,b) => moment(a).isBefore(b));
  const startDate = stepSlots.length ? stepSlots[0].startDate : null;

  return (
    <View style={styles.container}>
      <CalendarIcon date={startDate} />
      <View style={styles.textContainer}>
        <Text style={styles.stepType}>{`ÉTAPE ${index + 1} - ${stepTypeOptions[step.type]}`}</Text>
        <Text style={styles.stepName}>{step.name}</Text>
      </View>
    </View>
  );
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
    marginVertical: MARGIN.XS,
    flexDirection: 'row',
    padding: PADDING.MD,
  },
  textContainer: {
    marginLeft: MARGIN.MD,
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
