import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native';
import { MARGIN } from '../styles/metrics';
import { RED } from '../styles/colors';

const NiErrorMessage = ({ style, message, show }) => {
  return (
    <View style={style}>
      { show && <Text style={styles.message}>{message}</Text> }
    </View>
  );
};

NiErrorMessage.propTypes = {
  style: PropTypes.object,
  message: PropTypes.string,
  show: PropTypes.bool,
};

const styles = StyleSheet.create({
  message: {
    marginBottom: MARGIN.SM,
    color: RED,
  },
});


export default NiErrorMessage;
