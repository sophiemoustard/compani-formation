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

  let buttonBorderColor;
  let buttonBackgroundColor;
  let checkBackgroundColor;
  if (isCompleted && isAboveAverage) {
    buttonBackgroundColor = GREEN[300];
    buttonBorderColor = GREEN[600];
    checkBackgroundColor = GREEN[500];
  } else if (isCompleted) {
    buttonBackgroundColor = ORANGE[300];
    buttonBorderColor = ORANGE[600];
    checkBackgroundColor = ORANGE[500];
  } else {
    buttonBackgroundColor = YELLOW[300];
    buttonBorderColor = YELLOW[500];
  }

  const styleColored = styles(checkBackgroundColor);

  return (
    <View style={styleColored.container}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View style={styleColored.iconContainer}>
          <ActivityIcon activity={activity} disabled={disabled} buttonBackgroundColor={buttonBackgroundColor}
            buttonBorderColor={buttonBorderColor} />
          {isCompleted && !isQuiz &&
            <Ionicons name='ios-checkmark-circle' size={ICON.MD} color={GREEN[500]} style={styleColored.icon}
              backgroundColor={WHITE} />
          }
          {isCompleted && isQuiz &&
            <View style={styleColored.scoreContainer}>
              <Text style={styleColored.score}>{lastScore}/{quizCount}</Text>
            </View>
          }
        </View>
      </TouchableOpacity>
      <Text style={styleColored.activityName} lineBreakMode={'tail'} numberOfLines={2}>
        {activity.name}
      </Text>
    </View>
  );
};

export default ActivityCell;
