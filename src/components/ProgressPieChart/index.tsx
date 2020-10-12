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
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const progress = step.activities?.filter(activity => activity.activityHistories.length > 0).length || 0;
  const maxProgress = step.activities?.length || 0;

  useEffect(() => {
    if (maxProgress && progress) setProgressPercentage(progress / maxProgress);
  }, [progress, maxProgress]);

  return (
    <View style={styles.container}>
      {!progressPercentage && <View style={styles.unstartedContainer}>
        <Feather name='play-circle' size={ICON.MD} color={PINK[500]} />
      </View>}
      {!!progressPercentage && progressPercentage < 1 && <View style={styles.inProgressContainer}>
        <ProgressCircle style={{ height: ICON.XS, width: ICON.XS }} progress={progressPercentage}
          progressColor={YELLOW[500]} backgroundColor='transparent' strokeWidth={4} cornerRadius={BORDER_RADIUS.LG}/>
      </View>}
      {progressPercentage === 1 && <View style={styles.finishedContainer}>
        <Feather name='check' size={ICON.XS} color={WHITE} />
      </View>}
    </View>
  );
};

export default ProgressPieChart;
