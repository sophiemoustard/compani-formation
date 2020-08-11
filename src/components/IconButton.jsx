import React from 'react';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FEATHER } from '../core/data/constants';

const IconButton = ({ iconFamily, onPress, name, color, size, style }) => {
  if (iconFamily === FEATHER) {
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        <Feather name={name} size={size} color={color} />
      </TouchableOpacity>
    );
  }

  return null;
};

IconButton.propTypes = {
  iconFamily: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object,
};

IconButton.defaultProps = {
  iconFamily: FEATHER,
};

export default IconButton;
