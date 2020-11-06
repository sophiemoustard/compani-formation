import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ProgressCircle } from 'react-native-svg-charts';
import styles from './styles';
import { BORDER_RADIUS, ICON } from '../../styles/metrics';
import { PINK, WHITE, YELLOW } from '../../styles/colors';
import { StepType } from '../../types/StepType';

interface ProgressPieChartProps {
  step: StepType,
}

const ProgressPieChart = ({ step }: ProgressPieChartProps) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setProgress(step.progress || 0);
  }, [step]);

  return (
    <View style={styles.container}>
      {!progress &&
        <View style={styles.unstartedContainer}>
          <Feather name='play-circle' size={ICON.MD} color={PINK[500]} />
        </View>}
      {!!progress && progress < 1 &&
        <View style={styles.progressContainer}>
          <ProgressCircle style={styles.progress} progress={progress}
            progressColor={YELLOW[500]} backgroundColor='transparent' strokeWidth={4} cornerRadius={BORDER_RADIUS.LG}/>
        </View>}
      {progress === 1 &&
        <View style={styles.finishedContainer}>
          <Feather name='check' size={ICON.XS} color={WHITE} />
        </View>}
    </View>
  );
};

export default ProgressPieChart;
