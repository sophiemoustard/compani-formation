import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ActivityIcon from '../ActivityIcon';
import { ActivityType } from '../../../types/ActivityType';
import styles from './styles';

interface ActivityCellProps {
  activity: ActivityType,
  onPress: () => void,
}

const ActivityCell = ({ activity, onPress }: ActivityCellProps) => {
  const disabled = !activity.cards.length;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <ActivityIcon activity={activity} disabled={disabled} isCompleted={!!activity.activityHistories?.length} />
      </TouchableOpacity>
      <Text style={styles.activityName} lineBreakMode={'tail'} numberOfLines={2}>
        {activity.name}
      </Text>
    </View>
  );
};

export default ActivityCell;
