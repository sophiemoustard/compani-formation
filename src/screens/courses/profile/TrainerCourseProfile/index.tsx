import { useState, useEffect, useCallback } from 'react';
import { View, FlatList, ScrollView, LogBox, BackHandler, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { useIsFocused, CompositeScreenProps } from '@react-navigation/native';
import get from 'lodash/get';
import has from 'lodash/has';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, RootBottomTabParamList } from '../../../../types/NavigationType';
import Courses from '../../../../api/courses';
import { WHITE, GREY } from '../../../../styles/colors';
import commonStyles from '../../../../styles/common';
import { CourseType, BlendedCourseType } from '../../../../types/CourseTypes';
import styles from '../styles';
import MainActions from '../../../../store/main/actions';
import NiSecondaryButton from '../../../../components/form/SecondaryButton';
import { getLoggedUserId } from '../../../../store/main/selectors';
import CourseProfileHeader from '../../../../components/CourseProfileHeader';
import { FIRA_SANS_MEDIUM } from '../../../../styles/fonts';
import { renderStepCell, renderSeparator, getTitle } from '../helper';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

interface TrainerCourseProfileProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'TrainerCourseProfile'>,
StackScreenProps<RootBottomTabParamList>
> {
  userId: string,
  setStatusBarVisible: (boolean) => void,
}

const TrainerCourseProfile = ({
  route,
  navigation,
  setStatusBarVisible,
}: TrainerCourseProfileProps) => {
  const [course, setCourse] = useState<CourseType | null>(null);
  const [source, setSource] =
    useState<ImageSourcePropType>(require('../../../../../assets/images/authentication_background_image.jpg'));
  const [title, setTitle] = useState<string>('');

  const isFocused = useIsFocused();
  useEffect(() => {
    const getCourse = async () => {
      try {
        const fetchedCourse = await Courses.getCourse(route.params.courseId);
        setCourse(fetchedCourse);
        setTitle(getTitle(fetchedCourse));

        const programImage = get(fetchedCourse, 'subProgram.program.image.link') || '';
        if (programImage) setSource({ uri: programImage });
      } catch (e: any) {
        console.error(e);
        setCourse(null);
      }
    };

    if (isFocused) {
      setStatusBarVisible(true);
      getCourse();
    }
  }, [isFocused, route.params.courseId, setStatusBarVisible]);

  const goBack = useCallback(() => {
    navigation.navigate('TrainerCourses');
  }, [navigation]);

  const hardwareBackPress = useCallback(() => {
    goBack();
    return true;
  }, [goBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  const renderCells = item => renderStepCell(item, course, route);

  const goToAbout = () => {
    if (!course) return;
    navigation.navigate('BlendedAbout', { course: course as BlendedCourseType });
  };

  return course && has(course, 'subProgram.program') && (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView nestedScrollEnabled={false} showsVerticalScrollIndicator={false}>
        <CourseProfileHeader source={source} goBack={goBack} title={title} />
        <View style={styles.aboutContainer}>
          <NiSecondaryButton caption='A propos' onPress={goToAbout} icon='info' borderColor={GREY[200]}
            bgColor={WHITE} font={FIRA_SANS_MEDIUM.LG} />
        </View>
        <FlatList style={styles.flatList} data={course.subProgram.steps} keyExtractor={item => item._id}
          renderItem={renderCells} ItemSeparatorComponent={renderSeparator} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({ userId: getLoggedUserId(state) });

const mapDispatchToProps = dispatch => ({
  setStatusBarVisible: statusBarVisible => dispatch(MainActions.setStatusBarVisible(statusBarVisible)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainerCourseProfile);