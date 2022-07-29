import { View } from 'react-native';
import styles from './styles';

interface ProgressBarProps {
  progress: number,
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const style = styles(progress);

  return (
    <View style={style.container}>
      <View style={style.content} />
    </View>
  );
};

export default ProgressBar;
