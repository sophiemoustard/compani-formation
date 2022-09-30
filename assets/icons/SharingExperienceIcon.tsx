/* eslint-disable max-len */
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { GREY } from '../../src/styles/colors';
import { ICON } from '../../src/styles/metrics';

type SharingExperienceIconProps = {
  color?: string,
  style?: object,
  size?: number,
}

const SharingExperienceIcon = ({ color = GREY[700], style, size = ICON.XL }: SharingExperienceIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 33 33" fill="none" style={style}>
    <Circle cx="23" cy="23" r="10" fill="#C8BCC3"/>
    <Rect x="15" y="25" width="16" height="8" rx="4" fill="white"/>
    <Circle cx="23" cy="17" r="4" fill="white"/>
    <Path d="M23 22C21.6739 22 20.4021 21.4732 19.4645 20.5355C18.5268 19.5979 18 18.3261 18 17C18 15.6739 18.5268 14.4021 19.4645 13.4645C20.4021 12.5268 21.6739 12 23 12C24.3261 12 25.5979 12.5268 26.5355 13.4645C27.4732 14.4021 28 15.6739 28 17C28 18.3261 27.4732 19.5979 26.5355 20.5355C25.5979 21.4732 24.3261 22 23 22ZM23 20C23.394 20 23.7841 19.9224 24.1481 19.7716C24.512 19.6209 24.8427 19.3999 25.1213 19.1213C25.3999 18.8427 25.6209 18.512 25.7716 18.1481C25.9224 17.7841 26 17.394 26 17C26 16.606 25.9224 16.2159 25.7716 15.8519C25.6209 15.488 25.3999 15.1573 25.1213 14.8787C24.8427 14.6001 24.512 14.3791 24.1481 14.2284C23.7841 14.0776 23.394 14 23 14C22.2044 14 21.4413 14.3161 20.8787 14.8787C20.3161 15.4413 20 16.2044 20 17C20 17.7956 20.3161 18.5587 20.8787 19.1213C21.4413 19.6839 22.2044 20 23 20ZM32 31C32 31.2652 31.8946 31.5196 31.7071 31.7071C31.5196 31.8946 31.2652 32 31 32C30.7348 32 30.4804 31.8946 30.2929 31.7071C30.1054 31.5196 30 31.2652 30 31V29C30 28.2044 29.6839 27.4413 29.1213 26.8787C28.5587 26.3161 27.7956 26 27 26H19C18.2044 26 17.4413 26.3161 16.8787 26.8787C16.3161 27.4413 16 28.2044 16 29V31C16 31.2652 15.8946 31.5196 15.7071 31.7071C15.5196 31.8946 15.2652 32 15 32C14.7348 32 14.4804 31.8946 14.2929 31.7071C14.1054 31.5196 14 31.2652 14 31V29C14 27.6739 14.5268 26.4021 15.4645 25.4645C16.4021 24.5268 17.6739 24 19 24H27C28.3261 24 29.5979 24.5268 30.5355 25.4645C31.4732 26.4021 32 27.6739 32 29V31Z" fill={color}/>
    <Path d="M1 6C1 3.23858 3.23858 1 6 1H18C20.7614 1 23 3.23858 23 6C23 8.76142 20.7614 11 18 11H16.381C15.6183 11 15 11.6183 15 12.381V16.7962L8.76953 11.3446L8.11102 12.0971L8.76952 11.3446C8.51566 11.1224 8.18981 11 7.85248 11H6C3.23858 11 1 8.76142 1 6Z" fill="white" stroke={color} strokeWidth="2"/>
    <Path d="M6 6L18 6" stroke="#C8BCC3" strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

export default SharingExperienceIcon;
