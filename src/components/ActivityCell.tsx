import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ActivityIcon from './ActivityIcon';
import { ActivityType } from '../types/ActivityType';
import { FIRA_SANS_REGULAR } from '../styles/fonts';

interface ActivityCellProps {
  activity: ActivityType,
  onPress: () => void,
}

const ActivityCell = ({ activity, onPress }: ActivityCellProps) => {
  const disabled = !activity.cards.length;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <ActivityIcon activity={activity} disabled={disabled} />
      </TouchableOpacity>
      <Text style={styles.activityName} lineBreakMode={'tail'} numberOfLines={2}>
        {activity.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: 128,
    alignItems: 'center',
  },
  activityName: {
    ...FIRA_SANS_REGULAR.MD,
    textAlign: 'center',
  },
});

export default ActivityCell;
