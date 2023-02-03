import { View, FlatList } from 'react-native';
import { ActivityType } from '../../../types/ActivityTypes';
import { CourseModeType } from '../../../types/CourseTypes';
import ActivityCell from '../ActivityCell';
import styles from './styles';

type ActivityListProps = {
  activities: ActivityType[],
  profileId: string,
  mode: CourseModeType,
}

const ActivityList = ({ activities, profileId, mode }: ActivityListProps) => {
  const renderActivityCell = (activity: ActivityType) => (
    <ActivityCell activity={activity} profileId={profileId} mode={mode} />
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList horizontal data={activities} keyExtractor={item => item._id}
      renderItem={({ item }) => renderActivityCell(item)} ItemSeparatorComponent={renderSeparator}
      contentContainerStyle={styles.cell} showsHorizontalScrollIndicator={false} />
  );
};

export default ActivityList;
