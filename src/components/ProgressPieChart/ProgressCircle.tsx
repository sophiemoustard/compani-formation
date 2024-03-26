import Svg, { Circle } from 'react-native-svg';
import { YELLOW } from '../../styles/colors';

interface ProgressCircleProps {
  progress: number,
  strokeWidth: number,
  size: number,
}

const ProgressCircle = ({ progress, strokeWidth, size }: ProgressCircleProps) => {
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 1 - progress;

  return (
    <>
      <Svg width={size} height={size}>
        <Circle stroke={'transparent'} fill="none" cx={size / 2} cy={size / 2} r={radius} {...{ strokeWidth }} />
        <Circle stroke={YELLOW[500]} fill="none" cx={size / 2} cy={size / 2} r={radius}
          strokeDasharray={`${circum} ${circum}`} strokeDashoffset={radius * Math.PI * 2 * (svgProgress)}
          strokeLinecap="round" transform={`rotate(-90, ${size / 2}, ${size / 2})`} {...{ strokeWidth }} />
      </Svg>
    </>
  );
};

export default ProgressCircle;
