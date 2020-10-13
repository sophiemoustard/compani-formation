import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActivityIcon from '../ActivityIcon';
import { ActivityType } from '../../../types/ActivityType';
import { GREEN, WHITE, ORANGE, YELLOW } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import { QUIZ } from '../../../core/data/constants';
import styles from './styles';

interface ActivityCellProps {
  activity: ActivityType,
  onPress: () => void,
}

const ActivityCell = ({ activity, onPress }: ActivityCellProps) => {
  const disabled = !activity.cards.length;
  const isCompleted = !!activity.activityHistories?.length;
  const lastScore = isCompleted ? activity.activityHistories[activity.activityHistories.length - 1].score : 0;
  const quizCount = activity.quizCount || 0;
  const isQuiz = activity.type === QUIZ;
  const isAboveAverage = isQuiz ? lastScore * 2 > quizCount : true;

  type colorsType = { border: string, background: string, check?: string }
  let colors: colorsType = { border: YELLOW[600], background: YELLOW[300] };
  if (isCompleted && isAboveAverage) colors = { border: GREEN[600], background: GREEN[300], check: GREEN[500] };
  else if (isCompleted) colors = { border: ORANGE[600], background: ORANGE[300], check: ORANGE[500] };

  const coloredStyle = styles(colors.check);

  return (
    <View style={coloredStyle.container}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View style={coloredStyle.iconContainer}>
          <ActivityIcon activity={activity} disabled={disabled} backgroundColor={colors.background}
            borderColor={colors.border} />
          {isCompleted && !isQuiz &&
            <Ionicons name='ios-checkmark-circle' size={ICON.MD} color={GREEN[500]} style={coloredStyle.icon}
              backgroundColor={WHITE} />}
          {isCompleted && isQuiz &&
            <View style={coloredStyle.scoreContainer}>
              <Text style={coloredStyle.score}>{lastScore}/{quizCount}</Text>
            </View>}
        </View>
      </TouchableOpacity>
      <Text style={coloredStyle.activityName} lineBreakMode={'tail'} numberOfLines={2}>
        {activity.name}
      </Text>
    </View>
  );
};

export default ActivityCell;
