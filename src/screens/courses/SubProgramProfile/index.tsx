import React, { useState, useEffect, useContext } from 'react';
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
} from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import get from 'lodash/get';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationType } from '../../../types/NavigationType';
import SubPrograms from '../../../api/subPrograms';
import { WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import ELearningCell from '../../../components/ELearningCell';
import { Context as AuthContext } from '../../../context/AuthContext';
import { E_LEARNING } from '../../../core/data/constants';
import commonStyles from '../../../styles/common';
import styles from './styles';
import MainActions from '../../../store/main/actions';
import CoursesActions from '../../../store/courses/actions';
import { SubProgramType } from '../../../types/CourseType';
import FeatherButton from '../../../components/icons/FeatherButton';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

interface SubProgramProfileProps {
  route: { params: { subProgramId: string } },
  navigation: NavigationType,
  setStatusBarVisible: (boolean) => void,
  resetCourseReducer: () => void,
}

const SubProgramProfile = ({ route, navigation, setStatusBarVisible, resetCourseReducer }: SubProgramProfileProps) => {
  const [subProgram, setSubProgram] = useState<SubProgramType | null>(null);
  const { signOut } = useContext(AuthContext);

  const getSubProgram = async () => {
    try {
      const fetchedSubProgram = await SubPrograms.getSubProgram(route.params.subProgramId);
      setSubProgram(fetchedSubProgram);
    } catch (e) {
      if (e.response.status === 401) signOut();
      setSubProgram(null);
    }
  };

  useEffect(() => {
    async function fetchData() { await getSubProgram(); }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetchData() { await getSubProgram(); }
    if (isFocused) {
      setStatusBarVisible(true);
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const hardwareBackPress = () => {
    goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const programImage = get(subProgram, 'program.image.link') || '';
  const programName = get(subProgram, 'program.name') || '';
  const source = programImage
    ? { uri: programImage }
    : require('../../../../assets/images/authentication_background_image.jpg');

  const goBack = () => {
    resetCourseReducer();
    navigation.navigate('Home', { screen: 'Courses', params: { screen: 'CourseList' } });
  };

  const renderCells = ({ item, index }) => {
    if (item.type === E_LEARNING) {
      return <ELearningCell step={item} index={index} profileId={route.params.subProgramId} />;
    }

    return null;
  };

  const renderSeparator = () => <View style={styles.separator} />;

  return subProgram && (
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
      <FlatList style={styles.flatList} data={subProgram?.steps} keyExtractor={item => item._id}
        renderItem={renderCells} ItemSeparatorComponent={renderSeparator} />
    </ScrollView>
  );
};

const mapDispatchToProps = dispatch => ({
  setStatusBarVisible: statusBarVisible => dispatch(MainActions.setStatusBarVisible(statusBarVisible)),
  resetCourseReducer: () => dispatch(CoursesActions.resetCourseReducer()),
});

export default connect(null, mapDispatchToProps)(SubProgramProfile);
