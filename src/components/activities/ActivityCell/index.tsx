import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActivityIcon from '../ActivityIcon';
import { ActivityType } from '../../../types/ActivityType';
import { GREEN, WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import styles from './styles';

interface ActivityCellProps {
  activity: ActivityType,
  onPress: () => void,
}

const ActivityCell = ({ activity, onPress }: ActivityCellProps) => {
  const disabled = !activity.cards.length;
  const isCompleted = !!activity.activityHistories?.length;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View style={styles.iconContainer}>
          <ActivityIcon activity={activity} disabled={disabled} isCompleted={isCompleted} />
          {isCompleted && <Ionicons name='ios-checkmark-circle' size={ICON.MD} color={GREEN[500]} style={styles.icon}
            backgroundColor={WHITE} />}
        </View>
      </TouchableOpacity>
      <Text style={styles.activityName} lineBreakMode={'tail'} numberOfLines={2}>
        {activity.name}
      </Text>
    </View>
  );
};

export default ActivityCell;
