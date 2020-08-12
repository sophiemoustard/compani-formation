import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface blobProps {
  color: string,
  style?: object,
  size?: number,
}

const Blob = ({ color, style, size }: blobProps) => (
  <Svg width={size} height={size} viewBox="0 0 232 249" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={style}>
    <Path
      // eslint-disable-next-line max-len
      d="M231.5 108.802C231.5 183.636 163.835 248.802 89 248.802C14.1654 248.802 -42.5 207.636 -42.5 132.802C-42.5 57.9669 -28.3346 0.301513 46.5 0.301513C121.335 0.301513 231.5 33.9669 231.5 108.802Z"
      fill={color}
    />
  </Svg>
);

Blob.defaultProps = {
  size: 250,
};

export default Blob;
