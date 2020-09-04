/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Button from '../../../components/form/Button';
import { navigate } from '../../../navigationRef';

interface EndCardProps {
  courseId: String,
  allowSwipe: (isAllowed: boolean) => void,
}

const EndCard = ({ courseId, allowSwipe }: EndCardProps) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    async function onFocus() { allowSwipe(false); }
    onFocus();
  }, []);

  useEffect(() => {
    async function onFocus() { allowSwipe(false); }
    if (isFocused) onFocus();
  }, [isFocused]);

  return (
    <Button caption="Terminer"
      onPress={
        () => navigate('Home', { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId } } })
      }/>
  );
};
export default EndCard;
