import React from 'react';
import { View } from 'react-native';
import VideoIcon from '../../../../assets/icons/VideoIcon';
import LessonIcon from '../../../../assets/icons/LessonIcon';
import QuizIcon from '../../../../assets/icons/QuizIcon';
import SharingExperienceIcon from '../../../../assets/icons/SharingExperienceIcon';
import commonStyle from '../../../styles/common';
import { ActivityType } from '../../../types/ActivityType';
import { SHARING_EXPERIENCE, LESSON, QUIZ, VIDEO } from '../../../core/data/constants';
import Shadow from '../../design/Shadow';
import styles from './styles';

interface ActivityIconProps {
  activity: ActivityType,
  disabled: Boolean,
  buttonBorderColor: string,
  buttonBackgroundColor: string,
}

interface StylesProps {
  buttonBorderColor: string,
  buttonBackgroundColor: string,
}

const ActivityIcon = ({ activity, disabled, buttonBorderColor, buttonBackgroundColor }: ActivityIconProps) => {
  const getColors = () => ({ buttonBorderColor, buttonBackgroundColor });
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
      <Shadow customStyle={coloredStyle.shadow} />
    </View>
  );
};

export default ActivityIcon;
