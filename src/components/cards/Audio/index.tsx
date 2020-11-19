import React from 'react';
import { View } from 'react-native';
import { ICON } from '../../../styles/metrics';
import IconButton from '../../../components/IconButton';
import { PINK } from '../../../styles/colors';

interface NiAudioProps {
  mediaSource: { uri: string } | undefined,
}

const NiAudio = ({ mediaSource }: NiAudioProps) => {
  const playAudio = () => {

  };

  return (
    <IconButton name='play-circle' size={ICON.XXL} onPress={playAudio} color={PINK[500]}
      style={{ borderWhidth: 1, borderColor: 'red' }} />
  );
};

export default NiAudio;
