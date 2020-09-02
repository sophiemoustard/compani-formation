import React from 'react';
import Button from '../../../components/form/Button';
import { navigate } from '../../../navigationRef';

interface EndActivityTemplateProps {
  courseId: String,
}

const EndActivityTemplate = ({ courseId }: EndActivityTemplateProps) => (
  <Button caption="Terminer"
    onPress={() => navigate('Home', { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId } } })}/>
);

export default EndActivityTemplate;
