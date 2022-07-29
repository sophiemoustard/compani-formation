/* eslint-disable max-len */
import Svg, { Path, Rect } from 'react-native-svg';
import { GREY } from '../../src/styles/colors';
import { ICON } from '../../src/styles/metrics';

type LessonIconProps = {
  color?: string,
  style?: object,
  size?: number,
}

const LessonIcon = ({ color = GREY[700], style, size = ICON.XL }: LessonIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <Path d="M1 3H8.5L16 5.5L23.5 3H31V26H1V3Z" fill="white"/>
    <Rect x="1" y="24" width="30" height="7" fill="#C8BCC3"/>
    <Path d="M1 3H10C11.5913 3 13.1174 3.5619 14.2426 4.5621C15.3679 5.56229 16 6.91885 16 8.33333V27C16 25.9391 15.5259 24.9217 14.682 24.1716C13.8381 23.4214 12.6935 23 11.5 23H1V3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M31 3H22C20.4087 3 18.8826 3.5619 17.7574 4.5621C16.6321 5.56229 16 6.91885 16 8.33333V27C16 25.9391 16.4741 24.9217 17.318 24.1716C18.1619 23.4214 19.3065 23 20.5 23H31V3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M1 23V27M31 23V27M1 27V31H16M1 27H16M16 27V31M16 27H31M16 31H31V27" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M5 9H11" stroke="#C8BCC3" strokeWidth="2" strokeLinecap="round"/>
    <Path d="M21 9H27" stroke="#C8BCC3" strokeWidth="2" strokeLinecap="round"/>
    <Path d="M5 13H11" stroke="#C8BCC3" strokeWidth="2" strokeLinecap="round"/>
    <Path d="M21 13H27" stroke="#C8BCC3" strokeWidth="2" strokeLinecap="round"/>
    <Path d="M5 17H11" stroke="#C8BCC3" strokeWidth="2" strokeLinecap="round"/>
    <Path d="M21 17H27" stroke="#C8BCC3" strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

export default LessonIcon;
