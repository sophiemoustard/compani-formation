import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ActivityIcon from '../ActivityIcon';
import { ActivityType } from '../../../types/ActivityType';
import { GREEN, WHITE, ORANGE, YELLOW } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import { QUIZ } from '../../../core/data/constants';
import Actions from '../../../store/activities/actions';
import styles from './styles';
import { ActivityHistoryType } from '../../../types/ActivityHistoryType';

interface ActivityCellProps {
  activity: ActivityType,
  profileId: string,
  setActivityHistories: (activityHistories: Array<ActivityHistoryType>) => void,
}

const ActivityCell = ({ activity, profileId, setActivityHistories }: ActivityCellProps) => {
  const disabled = !activity.cards.length;
  const isCompleted = !!activity.activityHistories?.length;
  const lastScore = isCompleted ? activity.activityHistories[activity.activityHistories.length - 1].score : 0;
  const quizCount = activity.quizCount || 0;
  const isQuiz = activity.type === QUIZ;
  const isAboveAverage = isQuiz ? lastScore * 2 > quizCount : true;
  const navigation = useNavigation();

  type colorsType = { border: string, background: string, check?: string }
  let colors: colorsType = { border: YELLOW[600], background: YELLOW[300] };
  if (isCompleted && isAboveAverage) colors = { border: GREEN[600], background: GREEN[300], check: GREEN[500] };
  else if (isCompleted) colors = { border: ORANGE[600], background: ORANGE[300], check: ORANGE[500] };

  const coloredStyle = styles(colors.check);

  const onPress = () => {
    setActivityHistories(activity.activityHistories);
    navigation.navigate('CardContainer', { activityId: activity._id, profileId });
  };

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

const mapDispatchToProps = dispatch => ({
  setActivityHistories: activityHistories => dispatch(Actions.setActivityHistories(activityHistories)),
});

export default connect(null, mapDispatchToProps)(ActivityCell);
