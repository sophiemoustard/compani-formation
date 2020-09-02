import React from 'react';
import Button from '../../../components/form/Button';
import { navigate } from '../../../navigationRef';

interface EndCardTemplateProps {
  courseId: String,
}

const EndCardTemplate = ({ courseId }: EndCardTemplateProps) => (
  <Button caption="Terminer"
    onPress={() => navigate('Home', { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId } } })}/>
);

export default EndCardTemplate;
