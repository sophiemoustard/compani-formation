import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native';

const NiErrorMessage = ({ style, message, show }) => {
  return (
    <View style={{...styles.container, ...style}}>
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
  container: {
    marginBottom: 10,
  },
  message: {
    color: '#f00'
  },
});


export default NiErrorMessage;
