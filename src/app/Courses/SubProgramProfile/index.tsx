import { useState, useEffect, useCallback, Dispatch } from 'react';
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
import { connect } from 'react-redux';
import { useIsFocused, CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useLocalSearchParams, useRouter } from 'expo-router';
import get from 'lodash/get';
import { LinearGradient } from 'expo-linear-gradient';
import SubPrograms from '@/api/subPrograms';
import { WHITE } from '@/styles/colors';
import { ICON } from '@/styles/metrics';
import FeatherButton from '@/components/icons/FeatherButton';
import { TESTER } from '@/core/data/constants';
import commonStyles from '@/styles/common';
import styles from './styles';
import MainActions from '@/store/main/actions';
import { RootStackParamList, RootBottomTabParamList } from '@/types/NavigationType';
import { SubProgramType } from '@/types/CourseTypes';
import { ActionType } from '@/context/types';
import { renderStepList } from '@/core/helpers/courseProfile/helper';

interface SubProgramProfileProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'SubProgramProfile'>,
StackScreenProps<RootBottomTabParamList>
> {
  setStatusBarVisible: (boolean: boolean) => void,
}

const SubProgramProfile = ({ setStatusBarVisible }: SubProgramProfileProps) => {
  const router = useRouter();
  const { subProgramId } = useLocalSearchParams<{subProgramId: string}>();
  const params = useLocalSearchParams<{subProgramId: string}>();
  const [subProgram, setSubProgram] = useState<SubProgramType | null>(null);
  const [source, setSource] =
    useState<ImageSourcePropType>(require('../../../../assets/images/authentication_background_image.webp'));
  const [programName, setProgramName] = useState<string>('');

  useEffect(() => {
    setProgramName(get(subProgram, 'program.name') || '');

    const programImage = get(subProgram, 'program.image.link') || '';
    if (programImage) setSource({ uri: programImage });
    else setSource(require('../../../../assets/images/authentication_background_image.webp'));
  }, [subProgram]);

  const getSubProgram = useCallback(async () => {
    try {
      const fetchedSubProgram = await SubPrograms.getSubProgram(subProgramId || '');
      setSubProgram(fetchedSubProgram);
    } catch (e: any) {
      console.error(e);
      setSubProgram(null);
    }
  }, [subProgramId]);

  useEffect(() => { getSubProgram(); }, [getSubProgram]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setStatusBarVisible(true);
      getSubProgram();
    }
  }, [getSubProgram, isFocused, setStatusBarVisible]);

  const goBack = useCallback(() => {
    router.navigate('/Home/LearnerCourses');
  }, [router]);

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
        {renderStepList({ subProgram }, TESTER, params)}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  setStatusBarVisible: (statusBarVisible: boolean) => dispatch(MainActions.setStatusBarVisible(statusBarVisible)),
});

export default connect(null, mapDispatchToProps)(SubProgramProfile);
