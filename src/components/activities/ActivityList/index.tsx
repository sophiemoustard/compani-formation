import React from 'react';
import { View, FlatList } from 'react-native';
import { StepType } from '../../../types/StepType';
import ActivityCell from '../ActivityCell';
import styles from './styles';

interface ActivityListProps {
  step: StepType,
  profileId: string,
}

const ActivityList = ({ step, profileId }: ActivityListProps) => {
  const renderActivityCell = activity => (
    <ActivityCell activity={activity} profileId={profileId} />
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList horizontal data={step.activities} keyExtractor={item => item._id}
      renderItem={({ item }) => renderActivityCell(item)} ItemSeparatorComponent={renderSeparator}
      contentContainerStyle={styles.cell} showsHorizontalScrollIndicator={false} />
  );
};

export default ActivityList;
