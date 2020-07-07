import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import variables from '../../styles/variables';

const NiButton = ({ style, caption, onPress, loading, bgColor, color }) => {
  const buttonStyle = {...styles.button, backgroundColor: bgColor, borderColor: color, borderWidth: 1 };

  return (
    <TouchableOpacity style={[styles.container, style, loading ? styles.loading : '', buttonStyle]}
      onPress={onPress} disabled={loading}>
      { !loading && <Text style={{...styles.textButton, color}}>{caption}</Text> }
      { loading && <ActivityIndicator style={styles.loading} color={variables.white} size="small" />}
    </TouchableOpacity>
  );
};

NiButton.propTypes = {
  style: PropTypes.object,
  caption: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  bgColor: PropTypes.string,
  color: PropTypes.string,
};

NiButton.defaultProps = {
  loading: false,
  bgColor: variables.PRIMARY_COLOR,
  color: variables.WHITE,
};

const styles = StyleSheet.create({
  container: {},
  loading: {
    opacity: 0.6,
  },
  button: {
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  textButton: {
    marginHorizontal: 10,
  }
});


export default NiButton;
