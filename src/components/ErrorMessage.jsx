import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native';

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
    marginBottom: 10,
    color: '#f00'
  },
});


export default NiErrorMessage;
