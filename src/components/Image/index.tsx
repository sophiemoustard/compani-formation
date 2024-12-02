import { useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import cardsStyle from '../../styles/cards';
import Spinner from '../Spinner';
import styles from './styles';

interface NiImageProps {
  source: { uri: string },
  imgHeight: number,
  onPress: () => void,
}

const NiImage = ({ source, imgHeight, onPress }: NiImageProps) => {
  const [isMediaLoading, setIsMediaLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const style = styles(imgHeight, isMediaLoading);

  const loadImage = () => {
    setIsMediaLoading(true);
    setIsFirstLoad(false);
  };

  return (
    <>
      {isMediaLoading && <View style={style.spinnerContainer}>
        <Spinner />
      </View>}
      <TouchableOpacity onPress={onPress}>
        <Image source={source} style={[cardsStyle.media, style.media]}
          onLoadStart={() => isFirstLoad && loadImage()} onLoad={() => setIsMediaLoading(false)}
          onError={() => setIsMediaLoading(false)} />
      </TouchableOpacity>
    </>
  );
};

export default NiImage;
