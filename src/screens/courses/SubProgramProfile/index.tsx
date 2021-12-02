import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  ScrollView,
  StyleProp,
  ViewStyle,
  LogBox,
  BackHandler,
  ImageSourcePropType,
} from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused, CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import get from 'lodash/get';
import { LinearGradient } from 'expo-linear-gradient';
import SubPrograms from '../../../api/subPrograms';
import { WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import ELearningCell from '../../../components/ELearningCell';
import FeatherButton from '../../../components/icons/FeatherButton';
import { E_LEARNING } from '../../../core/data/constants';
import commonStyles from '../../../styles/common';
import styles from './styles';
import MainActions from '../../../store/main/actions';
import CoursesActions from '../../../store/courses/actions';
import { RootStackParamList, RootBottomTabParamList } from '../../../types/NavigationType';
import { SubProgramType } from '../../../types/CourseTypes';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

interface SubProgramProfileProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'SubProgramProfile'>,
StackScreenProps<RootBottomTabParamList>
> {
  setStatusBarVisible: (boolean) => void,
  resetCourseReducer: () => void,
}

const SubProgramProfile = ({ route, navigation, setStatusBarVisible, resetCourseReducer }: SubProgramProfileProps) => {
  const [subProgram, setSubProgram] = useState<SubProgramType | null>(null);
  const [source, setSource] =
    useState<ImageSourcePropType>(require('../../../../assets/images/authentication_background_image.jpg'));
  const [programName, setProgramName] = useState<string>('');

  useEffect(() => {
    setProgramName(get(subProgram, 'program.name') || '');

    const programImage = get(subProgram, 'program.image.link') || '';
    if (programImage) setSource({ uri: programImage });
    else setSource(require('../../../../assets/images/authentication_background_image.jpg'));
  }, [subProgram]);

  const getSubProgram = useCallback(async () => {
    try {
      const fetchedSubProgram = await SubPrograms.getSubProgram(route.params.subProgramId);
      setSubProgram(fetchedSubProgram);
    } catch (e: any) {
      setSubProgram(null);
    }
  }, [route.params.subProgramId]);

  useEffect(() => { getSubProgram(); }, [getSubProgram]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setStatusBarVisible(true);
      getSubProgram();
    }
  }, [getSubProgram, isFocused, setStatusBarVisible]);

  const goBack = useCallback(() => {
    resetCourseReducer();
    navigation.navigate('Courses');
  }, [navigation, resetCourseReducer]);

  const hardwareBackPress = useCallback(() => {
    goBack();
    return true;
  }, [goBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  const renderCells = ({ item, index }) => {
    if (item.type === E_LEARNING) {
      return <ELearningCell step={item} index={index} profileId={route.params.subProgramId} />;
    }

    return null;
  };

  const renderSeparator = () => <View style={styles.separator} />;

  return subProgram && subProgram.steps && (
    <ScrollView style={commonStyles.container} nestedScrollEnabled={false} showsVerticalScrollIndicator={false}>
      <ImageBackground source={source} imageStyle={styles.image}
        style={{ resizeMode: 'cover' } as StyleProp<ViewStyle>}>
        <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.4)']} style={styles.gradient} />
        <View style={styles.header}>
          <FeatherButton style={styles.arrow} onPress={goBack} name="arrow-left" color={WHITE} size={ICON.MD}
            iconStyle={styles.arrowShadow} />
          <Text style={styles.title}>{programName}</Text>
        </View>
      </ImageBackground>
      <FlatList style={styles.flatList} data={subProgram.steps} keyExtractor={item => item._id}
        renderItem={renderCells} ItemSeparatorComponent={renderSeparator} />
    </ScrollView>
  );
};

const mapDispatchToProps = dispatch => ({
  setStatusBarVisible: statusBarVisible => dispatch(MainActions.setStatusBarVisible(statusBarVisible)),
  resetCourseReducer: () => dispatch(CoursesActions.resetCourseReducer()),
});

export default connect(null, mapDispatchToProps)(SubProgramProfile);
