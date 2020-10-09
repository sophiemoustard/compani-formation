import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActivityIcon from '../ActivityIcon';
import { ActivityType } from '../../../types/ActivityType';
import { GREEN, WHITE } from '../../../styles/colors';
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
  const isQuiz = activity.type === QUIZ;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View style={styles.iconContainer}>
          <ActivityIcon activity={activity} disabled={disabled} isCompleted={isCompleted} />
          {isCompleted && !isQuiz &&
            <Ionicons name='ios-checkmark-circle' size={ICON.MD} color={GREEN[500]} style={styles.icon}
              backgroundColor={WHITE} />
          }
          {isCompleted && isQuiz &&
            <View style={styles.scoreContainer}>
              <Text style={styles.score}>{lastScore}/{activity.quizCount}</Text>
            </View>
          }
        </View>
      </TouchableOpacity>
      <Text style={styles.activityName} lineBreakMode={'tail'} numberOfLines={2}>
        {activity.name}
      </Text>
    </View>
  );
};

export default ActivityCell;
