/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Button from '../../../components/form/Button';
import { navigate } from '../../../navigationRef';

interface StartCardProps {
  allowSwipe: (isAllowed: boolean) => void,
}

const StartCard = ({ allowSwipe }: StartCardProps) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    async function onFocus() { allowSwipe(false); }
    onFocus();
  }, []);

  useEffect(() => {
    async function onFocus() { allowSwipe(false); }
    if (isFocused) onFocus();
  }, [isFocused]);

  return (<Button caption="Démarrer" onPress={() => navigate('card-0')} />);
};

export default StartCard;
