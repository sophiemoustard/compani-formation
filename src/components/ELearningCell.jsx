import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { stepTypeOptions } from '../core/data/constants';
import { MARGIN, PADDING, BORDER_WIDTH, BORDER_RADIUS } from '../styles/metrics';
import { GREY, PINK } from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import IconButton from './IconButton';

const ELearningCell = ({step, index}) => {
  return (
    <View style={styles.container}>
      <View style={styles.featherContainer}>
        <Feather name={'play-circle'} size={24} color={PINK[600]} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.stepType}>{`ÉTAPE ${index + 1} - ${stepTypeOptions[step.type]}`}</Text>
        <Text lineBreakMode={'tail'} numberOfLines={2} style={styles.stepName}>{step.name}</Text>
      </View>
      <View style={styles.iconButtonContainer}>
        <IconButton
          iconFamily={'Feather'}
          name={'chevron-down'}
          onPress={() => {}}
          size={18}
          color={GREY[600]}
        />
      </View>
    </View>
  );
};

ELearningCell.propTypes = {
  step: PropTypes.object,
  index: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREY[100],
    marginVertical: MARGIN.XS,
    marginHorizontal: MARGIN.MD,
    padding: PADDING.MD,
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS.XL,
    borderColor: 'transparent',
    flexDirection: 'row',
  },
  featherContainer: {
    width: 38,
    alignSelf: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  iconButtonContainer: {
    width: 28,
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
