import React from 'react';
import { StyleSheet, View } from 'react-native';
import VideoIcon from '../../assets/icons/VideoIcon';
import LessonIcon from '../../assets/icons/LessonIcon';
import QuizIcon from '../../assets/icons/QuizIcon';
import SharingExperienceIcon from '../../assets/icons/SharingExperienceIcon';
import { BORDER_RADIUS, BORDER_WIDTH, PADDING, ICON } from '../styles/metrics';
import { GREY, YELLOW } from '../styles/colors';
import { ActivityType } from '../types/ActivityType';

interface ActivityIconProps {
  activity: ActivityType,
}

const ActivityIcon = ({ activity } : ActivityIconProps) => {
  const getColors = () => ({ buttonBackgroundColor: YELLOW[300], buttonborderColor: YELLOW[500] });
  const coloredStyle = styles(getColors());

  const getIcon = () => {
    if (activity.type === 'sharing_experience') {
      return (<SharingExperienceIcon size={ICON.XL} color={GREY[700]} style={coloredStyle.videoIcon}/>);
    }
    if (activity.type === 'lesson') {
      return (<LessonIcon size={ICON.XL} color={GREY[700]} style={coloredStyle.videoIcon}/>);
    }
    if (activity.type === 'quiz') {
      return (<QuizIcon size={ICON.XL} color={GREY[700]} style={coloredStyle.videoIcon}/>);
    }
    if (activity.type === 'video') {
      return (<VideoIcon size={ICON.XL} color={GREY[700]} style={coloredStyle.videoIcon}/>);
    }
    return null;
  };

  return (
    <View style={coloredStyle.container}>
      <View style={coloredStyle.button}>
        {getIcon()}
      </View>
      <View style={coloredStyle.shadow} />
    </View>
  );
};

const styles = ({ buttonBackgroundColor, buttonborderColor }) => StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  button: {
    backgroundColor: buttonBackgroundColor,
    borderRadius: BORDER_RADIUS.SM,
    borderColor: buttonborderColor,
    borderWidth: BORDER_WIDTH,
    padding: PADDING.LG,
  },
  videoIcon: {
    alignSelf: 'center',
  },
  shadow: {
    height: BORDER_RADIUS.SM + 3,
    backgroundColor: buttonborderColor,
    top: -BORDER_RADIUS.SM,
    zIndex: -1,
    borderBottomLeftRadius: BORDER_RADIUS.SM,
    borderBottomRightRadius: BORDER_RADIUS.SM,
  },
});

export default ActivityIcon;
