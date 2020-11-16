import React from 'react';
import { View } from 'react-native';
import VideoIcon from '../../../../assets/icons/VideoIcon';
import LessonIcon from '../../../../assets/icons/LessonIcon';
import QuizIcon from '../../../../assets/icons/QuizIcon';
import QuestionnaireIcon from '../../../../assets/icons/QuestionnaireIcon';
import SharingExperienceIcon from '../../../../assets/icons/SharingExperienceIcon';
import commonStyle from '../../../styles/common';
import { ActivityType } from '../../../types/ActivityType';
import { SHARING_EXPERIENCE, LESSON, QUIZ, VIDEO, QUESTIONNAIRE } from '../../../core/data/constants';
import Shadow from '../../design/Shadow';
import styles from './styles';

interface ActivityIconProps {
  activity: ActivityType,
  disabled: Boolean,
  borderColor: string,
  backgroundColor: string,
}

interface StylesProps {
  borderColor: string,
  backgroundColor: string,
}

const ActivityIcon = ({ activity, disabled, borderColor, backgroundColor }: ActivityIconProps) => {
  const coloredStyle = styles({ borderColor, backgroundColor });

  const getIcon = () => {
    if (activity.type === SHARING_EXPERIENCE) return <SharingExperienceIcon style={coloredStyle.icon} />;
    if (activity.type === LESSON) return <LessonIcon style={coloredStyle.icon} />;
    if (activity.type === QUIZ) return <QuizIcon style={coloredStyle.icon} />;
    if (activity.type === VIDEO) return <VideoIcon style={coloredStyle.icon} />;
    if (activity.type === QUESTIONNAIRE) return <QuestionnaireIcon style={coloredStyle.icon} />;
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
