import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

const Blob = ({ color, style, width }) => {
  return (
    <Svg width={width} height={width} viewBox="0 0 232 249" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Path
        d="M231.5 108.802C231.5 183.636 163.835 248.802 89 248.802C14.1654 248.802 -42.5 207.636 -42.5 132.802C-42.5 57.9669 -28.3346 0.301513 46.5 0.301513C121.335 0.301513 231.5 33.9669 231.5 108.802Z"
        fill={color}
      />
    </Svg>
  );
};

Blob.propTypes = {
  color: PropTypes.string.isRequired,
  style: PropTypes.object,
  width: PropTypes.number,
};
Blob.defaultProps = {
  width: 250,
};

export default Blob;
