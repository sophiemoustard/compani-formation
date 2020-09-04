import React from 'react';
import Button from '../../../components/form/Button';
import { navigate } from '../../../navigationRef';

interface EndCardProps {
  courseId: String,
}

const EndCard = ({ courseId }: EndCardProps) => (
  <Button caption="Terminer"
    onPress={() => navigate('Home', { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId } } })}/>
);

export default EndCard;
