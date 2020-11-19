import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { ICON } from '../../../styles/metrics';
import IconButton from '../../../components/IconButton';
import { PINK } from '../../../styles/colors';

interface NiAudioProps {
  mediaSource: { uri: string } | undefined,
}

const NiAudio = ({ mediaSource }: NiAudioProps) => {
  const [soundObject, setSoundObject] = useState(new Audio.Sound()); // state needed because of the useEffect

  useEffect(() => {
    async function loadAudio() {
      try {
        const status = await soundObject.getStatusAsync();
        if (mediaSource && !status.isLoaded) await soundObject.loadAsync(mediaSource);
      } catch (e) {
        console.error(e);
      }
    }

    async function unloadAudio() {
      try {
        const status = await soundObject.getStatusAsync();
        if (status.isLoaded) await soundObject.unloadAsync();
      } catch (e) {
        console.error(e);
      }
    }

    loadAudio();
    return () => { unloadAudio(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playAudio = async () => {
    try {
      const status = await soundObject.getStatusAsync();
      if (mediaSource && status.isLoaded) await soundObject.playFromPositionAsync(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <IconButton name='play-circle' size={ICON.XXL} onPress={playAudio} color={PINK[500]}
      style={{ borderWhidth: 1, borderColor: 'red' }} />
  );
};

export default NiAudio;
