import React from 'react';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

const IconButton = ({ iconFamily, onPress, name, color, size, style }) => {
  if (iconFamily === 'Feather'){
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

export default IconButton;
