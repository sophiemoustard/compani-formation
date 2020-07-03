import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const NiButton = ({ style, caption, onPress, disabled }) => {
  return (
    <View style={[styles.container, style, disabled ? styles.disabled : '']}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.textButton}>{caption}</Text>
      </TouchableOpacity>
    </View>
  );
};

NiButton.propTypes = {
  style: PropTypes.object,
  caption: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {},
  disabled: {
    opacity: 0.6,
  },
  button: {
    backgroundColor: variables.PRIMARY_COLOR,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    marginHorizontal: 10,
  }
});


export default NiButton;
