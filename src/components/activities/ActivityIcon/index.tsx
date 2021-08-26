import React from 'react';
import { View } from 'react-native';
import VideoIcon from '../../../../assets/icons/VideoIcon';
import LessonIcon from '../../../../assets/icons/LessonIcon';
import QuizIcon from '../../../../assets/icons/QuizIcon';
import SharingExperienceIcon from '../../../../assets/icons/SharingExperienceIcon';
import commonStyle from '../../../styles/common';
import { ActivityType } from '../../../types/ActivityTypes';
import { SHARING_EXPERIENCE, LESSON, QUIZ, VIDEO } from '../../../core/data/constants';
import Shadow from '../../design/Shadow';
import styles from './styles';

interface ActivityIconProps {
  activity: ActivityType,
  disabled: Boolean,
  borderColor: string,
  backgroundColor: string,
}

const ActivityIcon = ({ activity, disabled, borderColor, backgroundColor }: ActivityIconProps) => {
  const coloredStyle = styles({ borderColor, backgroundColor });

  const getIcon = () => {
    switch (activity.type) {
      case SHARING_EXPERIENCE:
        return <SharingExperienceIcon style={coloredStyle.icon} />;
      case LESSON:
        return <LessonIcon style={coloredStyle.icon} />;
      case QUIZ:
        return <QuizIcon style={coloredStyle.icon} />;
      case VIDEO:
        return <VideoIcon style={coloredStyle.icon} />;
      default:
        return null;
    }
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
