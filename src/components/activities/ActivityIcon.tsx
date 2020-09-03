import React from 'react';
import { StyleSheet, View } from 'react-native';
import VideoIcon from '../../../assets/icons/VideoIcon';
import LessonIcon from '../../../assets/icons/LessonIcon';
import QuizIcon from '../../../assets/icons/QuizIcon';
import SharingExperienceIcon from '../../../assets/icons/SharingExperienceIcon';
import { BORDER_RADIUS, BORDER_WIDTH, PADDING, MARGIN } from '../../styles/metrics';
import commonStyle from '../../styles/common';
import { YELLOW } from '../../styles/colors';
import { ActivityType } from '../../types/ActivityType';
import { SHARING_EXPERIENCE, LESSON, QUIZ, VIDEO } from '../../core/data/constants';
import Shadow from '../style/Shadow';

interface ActivityIconProps {
  activity: ActivityType,
  disabled: Boolean,
}

interface StylesProps {
  buttonBackgroundColor: string,
  buttonBorderColor: string
}

const ActivityIcon = ({ activity, disabled }: ActivityIconProps) => {
  const buttonBorderColor = YELLOW[500];
  const getColors = () => ({ buttonBackgroundColor: YELLOW[300], buttonBorderColor });
  const coloredStyle = styles(getColors());

  const getIcon = () => {
    if (activity.type === SHARING_EXPERIENCE) return <SharingExperienceIcon style={coloredStyle.icon}/>;
    if (activity.type === LESSON) return <LessonIcon style={coloredStyle.icon}/>;
    if (activity.type === QUIZ) return <QuizIcon style={coloredStyle.icon}/>;
    if (activity.type === VIDEO) return <VideoIcon style={coloredStyle.icon}/>;
    return null;
  };

  return (
    <View style={[coloredStyle.container, disabled && commonStyle.disabled]}>
      <View style={coloredStyle.button}>
        {getIcon()}
      </View>
      <Shadow backgroundColor={buttonBorderColor} borderRadius={BORDER_RADIUS.MD} />
    </View>
  );
};

const styles = ({ buttonBackgroundColor, buttonBorderColor }: StylesProps) => StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: MARGIN.SM,
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
});

export default ActivityIcon;
