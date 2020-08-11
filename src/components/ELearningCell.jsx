import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { stepTypeOptions } from '../core/data/constants';
import { MARGIN, PADDING, BORDER_WIDTH, BORDER_RADIUS, ICON } from '../styles/metrics';
import { GREY, PINK } from '../styles/colors';
import IconButton from './IconButton';

const ELearningCell = ({ step, index }) => (
  <View style={styles.container}>
    <View style={styles.featherContainer}>
      <Feather name='play-circle' size={ICON.LG} color={PINK[500]} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.stepType}>{`ÉTAPE ${index + 1} - ${stepTypeOptions[step.type]}`}</Text>
      <Text lineBreakMode='tail' numberOfLines={2} style={styles.stepName}>{step.name}</Text>
    </View>
    <View style={styles.iconButtonContainer}>
      <IconButton name='chevron-down' onPress={() => {}} size={ICON.SM} color={GREY[600]} />
    </View>
  </View>
);

ELearningCell.propTypes = {
  step: PropTypes.object,
  index: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREY[100],
    marginHorizontal: MARGIN.MD,
    paddingHorizontal: PADDING.MD,
    paddingVertical: PADDING.LG,
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS.XL,
    borderColor: GREY[200],
    flexDirection: 'row',
  },
  featherContainer: {
    width: 40,
    alignSelf: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: MARGIN.SM,
  },
  iconButtonContainer: {
    width: 40,
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
  stepType: {
    color: GREY[600],
    fontSize: 14,
  },
  stepName: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: GREY[800],
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ELearningCell;
