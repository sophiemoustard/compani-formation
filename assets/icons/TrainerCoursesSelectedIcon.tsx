/* eslint-disable max-len */
import Svg, { Ellipse, Path, Rect } from 'react-native-svg';
import { ICON } from '../../src/styles/metrics';

type TrainerCoursesSelectedIconProps = {
  style?: object,
  size?: number,
}

const TrainerCoursesSelectedIcon = ({ style, size = ICON.MD }: TrainerCoursesSelectedIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 25 24" fill="none" style={style}>
    <Ellipse cx="11.6866" cy="9.6184" rx="6" ry="7.38002" transform="rotate(-9.37606 11.6866 9.6184)" fill="#FBB8D2"/>
    <Rect x="11.667" y="4" width="9" height="11" fill="#FBB8D2"/>
    <Path fill="#C12862" stroke="#C12862" strokeWidth="0.8" d="M21.067 4V3.6H20.667H11.0483C11.0098 3.18819 10.9123 2.78424 10.7615 2.4H20.667C21.0913 2.4 21.4983 2.56857 21.7984 2.86863C22.0984 3.16869 22.267 3.57565 22.267 4V15C22.267 15.4243 22.0984 15.8313 21.7984 16.1314C21.4983 16.4314 21.0913 16.6 20.667 16.6H12.067V15.4H20.667H21.067V15V4ZM3.66699 13.6H2.56699V9C2.56699 8.57565 2.73556 8.16869 3.03562 7.86863C3.33568 7.56857 3.74265 7.4 4.16699 7.4H15.267V8.6H9.66699H9.26699V9V21.6H8.06699V16V15.6H7.66699H5.66699H5.26699V16V21.6H4.06699V14V13.6H3.66699ZM8.26699 4C8.26699 4.42435 8.09842 4.83131 7.79836 5.13137C7.4983 5.43143 7.09134 5.6 6.66699 5.6C6.24265 5.6 5.83568 5.43143 5.53562 5.13137C5.23556 4.83131 5.06699 4.42435 5.06699 4C5.06699 3.57565 5.23556 3.16869 5.53562 2.86863C5.83568 2.56857 6.24265 2.4 6.66699 2.4C7.09134 2.4 7.4983 2.56857 7.79836 2.86863C8.09842 3.16869 8.26699 3.57565 8.26699 4Z" />
  </Svg>
);

export default TrainerCoursesSelectedIcon;
