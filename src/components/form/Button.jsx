import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { BORDER_RADIUS, INPUT_HEIGHT, MARGIN } from '../../styles/metrics';
import { ALT_PINK_500, WHITE } from '../../styles/colors';

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
  bgColor: ALT_PINK_500,
  color: WHITE,
};

const styles = StyleSheet.create({
  loading: {
    opacity: 0.6,
  },
  button: {
    borderRadius: BORDER_RADIUS.MD,
    display: 'flex',
    flexDirection: 'row',
    height: INPUT_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  textButton: {
    marginHorizontal: MARGIN.SM,
  }
});


export default NiButton;
