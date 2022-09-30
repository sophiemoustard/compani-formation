import { View, FlatList } from 'react-native';
import { ActivityType } from '../../../types/ActivityTypes';
import ActivityCell from '../ActivityCell';
import styles from './styles';

type ActivityListProps = {
  activities: ActivityType[],
  profileId: string,
}

const ActivityList = ({ activities, profileId }: ActivityListProps) => {
  const renderActivityCell = activity => (
    <ActivityCell activity={activity} profileId={profileId} />
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList horizontal data={activities} keyExtractor={item => item._id}
      renderItem={({ item }) => renderActivityCell(item)} ItemSeparatorComponent={renderSeparator}
      contentContainerStyle={styles.cell} showsHorizontalScrollIndicator={false} />
  );
};

export default ActivityList;
