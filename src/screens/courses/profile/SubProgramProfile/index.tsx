import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleProp,
  ViewStyle,
  BackHandler,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import get from 'lodash/get';
import { LinearGradient } from 'expo-linear-gradient';
import SubPrograms from '../../../../api/subPrograms';
import { WHITE } from '../../../../styles/colors';
import { ICON } from '../../../../styles/metrics';
import FeatherButton from '../../../../components/icons/FeatherButton';
import { TESTER } from '../../../../core/data/constants';
import commonStyles from '../../../../styles/common';
import styles from './styles';
import { useAppDispatch } from '../../../../store/hooks';
import { setStatusBarVisible } from '../../../../store/main/slice';
import { RootStackParamList, RootBottomTabParamList } from '../../../../types/NavigationType';
import { SubProgramType } from '../../../../types/CourseTypes';
import { renderStepList } from '../helper';

interface SubProgramProfileProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'SubProgramProfile'>,
StackScreenProps<RootBottomTabParamList>
> {
}

const SubProgramProfile = ({ route, navigation }: SubProgramProfileProps) => {
  const dispatch = useAppDispatch();

  const [subProgram, setSubProgram] = useState<SubProgramType | null>(null);
  const [source, setSource] =
    useState<ImageSourcePropType>(require('../../../../../assets/images/authentication_background_image.webp'));
  const [programName, setProgramName] = useState<string>('');

  useEffect(() => {
    setProgramName(get(subProgram, 'program.name') || '');

    const programImage = get(subProgram, 'program.image.link') || '';
    if (programImage) setSource({ uri: programImage });
    else setSource(require('../../../../../assets/images/authentication_background_image.webp'));
  }, [subProgram]);

  const getSubProgram = useCallback(async () => {
    try {
      const fetchedSubProgram = await SubPrograms.getSubProgram(route.params.subProgramId);
      setSubProgram(fetchedSubProgram);
    } catch (e: any) {
      console.error(e);
      setSubProgram(null);
    }
  }, [route.params.subProgramId]);

  useEffect(() => { getSubProgram(); }, [getSubProgram]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(setStatusBarVisible(true));
      getSubProgram();
    }
  }, [getSubProgram, isFocused, dispatch]);

  const goBack = useCallback(() => {
    navigation.navigate('LearnerCourses');
  }, [navigation]);

  const hardwareBackPress = useCallback(() => {
    goBack();
    return true;
  }, [goBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  return subProgram && subProgram.steps && (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView nestedScrollEnabled={false} showsVerticalScrollIndicator={false}>
        <ImageBackground source={source} imageStyle={styles.image}
          style={{ resizeMode: 'cover' } as StyleProp<ViewStyle>}>
          <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.4)']} style={styles.gradient} />
          <View style={styles.header}>
            <FeatherButton style={styles.arrow} onPress={goBack} name="arrow-left" color={WHITE} size={ICON.MD}
              iconStyle={styles.arrowShadow} />
            <Text style={styles.title}>{programName}</Text>
          </View>
        </ImageBackground>
        {renderStepList({ subProgram }, TESTER, route)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubProgramProfile;
