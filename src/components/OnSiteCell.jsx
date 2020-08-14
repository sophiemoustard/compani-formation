import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import moment from '../core/helpers/moment';
import CalendarIcon from './CalendarIcon';
import { stepTypeOptions } from '../core/data/constants';
import { MARGIN, PADDING, BORDER_WIDTH } from '../styles/metrics';
import { GREY } from '../styles/colors';
import { NUNITO_SEMI, FIRA_SANS_MEDIUM } from '../styles/fonts';

const OnSiteCell = ({ step, slots, index }) => {
  const stepSlots = slots.filter(slot => slot.step === step._id);
  const dates = stepSlots.length
    ? stepSlots.map(stepSlot => stepSlot.startDate).sort((a, b) => moment(a).diff(b, 'days'))
    : [];

  return (
    <View style={styles.container}>
      <CalendarIcon dates={dates} />
      <View style={styles.textContainer}>
        <Text style={styles.stepType}>{`ÉTAPE ${index + 1} - ${stepTypeOptions[step.type]}`}</Text>
        <Text lineBreakMode={'tail'} numberOfLines={2} style={styles.stepName}>{step.name}</Text>
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
    backgroundColor: GREY[100],
    flexDirection: 'row',
    padding: PADDING.LG,
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
  },
  textContainer: {
    marginLeft: MARGIN.MD,
    width: '70%',
  },
  stepType: {
    ...NUNITO_SEMI.XS,
    color: GREY[600],
  },
  stepName: {
    ...FIRA_SANS_MEDIUM.MD,
    color: GREY[800],
  },
});

export default OnSiteCell;
