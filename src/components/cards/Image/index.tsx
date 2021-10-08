import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import cardsStyle from '../../../styles/cards';
import styles from './styles';
import Spinner from '../../Spinner';

interface NiImageProps {
  source: { uri: string },
  imgHeight: number,
  onPress: () => void,
}

const NiImage = ({ source, imgHeight, onPress }: NiImageProps) => {
  const [isMediaLoading, setIsMediaLoading] = useState(false);

  const style = styles(imgHeight, isMediaLoading);

  return (
    <>
      {isMediaLoading && <Spinner />}
      <TouchableOpacity onPress={onPress}>
        <Image source={source} style={[cardsStyle.media, style.media]}
          onLoadStart={() => setIsMediaLoading(true)} onLoadEnd={() => setIsMediaLoading(false)} />
      </TouchableOpacity>
    </>
  );
};

export default NiImage;
