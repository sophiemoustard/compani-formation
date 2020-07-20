import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { WHITE, PRIMARY_COLOR } from '../../styles/variables';

const NiButton = ({ style, caption, onPress, loading, bgColor, color }) => {
  const buttonStyle = {...styles.button, backgroundColor: bgColor, borderColor: bgColor, borderWidth: 1 };

  return (
    <TouchableOpacity style={[styles.container, style, loading ? styles.loading : '', buttonStyle]}
      onPress={onPress} disabled={loading} testID={caption}>
      { !loading && <Text style={{...styles.textButton, color}}>{caption}</Text> }
      { loading && <ActivityIndicator style={styles.loading} color={color} size="small" />}
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
  bgColor: PRIMARY_COLOR,
  color: WHITE,
};

const styles = StyleSheet.create({
  container: {},
  loading: {
    opacity: 0.6,
  },
  button: {
    borderRadius: 16,
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
