import React from 'react';
import { StyleSheet, View } from 'react-native';
import VideoIcon from '../../assets/icons/VideoIcon';
import LessonIcon from '../../assets/icons/LessonIcon';
import QuizIcon from '../../assets/icons/QuizIcon';
import SharingExperienceIcon from '../../assets/icons/SharingExperienceIcon';
import { BORDER_RADIUS, BORDER_WIDTH, PADDING } from '../styles/metrics';
import { YELLOW } from '../styles/colors';
import { ActivityType } from '../types/ActivityType';
import { SHARING_EXPERIENCE, LESSON, QUIZ, VIDEO } from '../core/data/constants';

interface ActivityIconProps {
  activity: ActivityType,
}

interface StylesProps {
  buttonBackgroundColor: string,
  buttonBorderColor: string
}

const ActivityIcon = ({ activity } : ActivityIconProps) => {
  const getColors = () => ({ buttonBackgroundColor: YELLOW[300], buttonBorderColor: YELLOW[500] });
  const coloredStyle = styles(getColors());

  const getIcon = () => {
    if (activity.type === SHARING_EXPERIENCE) return (<SharingExperienceIcon style={coloredStyle.icon}/>);
    if (activity.type === LESSON) return (<LessonIcon style={coloredStyle.icon}/>);
    if (activity.type === QUIZ) return (<QuizIcon style={coloredStyle.icon}/>);
    if (activity.type === VIDEO) return (<VideoIcon style={coloredStyle.icon}/>);
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

const styles = ({ buttonBackgroundColor, buttonBorderColor }: StylesProps) => StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  button: {
    backgroundColor: buttonBackgroundColor,
    borderRadius: BORDER_RADIUS.MD,
    borderColor: buttonBorderColor,
    borderWidth: BORDER_WIDTH,
    padding: PADDING.LG,
  },
  icon: {
    alignSelf: 'center',
  },
  shadow: {
    height: BORDER_RADIUS.MD + 25,
    top: -BORDER_RADIUS.MD - 22,
    marginBottom: -25,
    backgroundColor: buttonBorderColor,
    zIndex: -1,
    borderBottomRightRadius: BORDER_RADIUS.MD,
    borderBottomLeftRadius: BORDER_RADIUS.MD,
  },
});

export default ActivityIcon;
