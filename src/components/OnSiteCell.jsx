import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const OnSiteCell = ({ step, slots }) => {
  return <View><Text>{step.name}</Text></View>;
};

OnSiteCell.propTypes = {
  step: PropTypes.object,
  slots: PropTypes.array,
};

const styles = StyleSheet.create({
});

export default OnSiteCell;
