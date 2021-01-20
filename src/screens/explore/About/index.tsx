import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View, ScrollView, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import Markdown from 'react-native-markdown-display';
import { CommonActions, StackActions, StackActionType } from '@react-navigation/native';
import get from 'lodash/get';
import { Context as AuthContext } from '../../../context/AuthContext';
import styles from './styles';
import { markdownStyle } from '../../../styles/common';
import { WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import Button from '../../../components/form/Button';
import FeatherButton from '../../../components/icons/FeatherButton';
import Courses from '../../../api/courses';
import { getLoggedUserId } from '../../../store/main/selectors';
import CoursesActions from '../../../store/courses/actions';
import { ActionWithoutPayloadType } from '../../../types/store/StoreType';

interface AboutProps {
  route: { params: { program?, course?, isFromCourses? } },
  navigation: {
    navigate: (path: string, params?: object) => {},
    dispatch: (action: CommonActions.Action | StackActionType) => {}},
  loggedUserId: string,
  setIsCourse: (value: boolean) => void,
}

interface DataProps {
  name,
  source,
  description,
  learningGoals,
  nextActivityId,
  courseId,
  hasAlreadySubscribed,
}

const About = ({ route, navigation, loggedUserId, setIsCourse }: AboutProps) => {
  const { signOut } = useContext(AuthContext);
  const [data, setData] = useState<DataProps>();
  const { isFromCourses } = route.params;

  const hardwareBackPress = () => {
    goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const program = route.params.program || route.params.course.subProgram.program;

    const defaultImg = require('../../../../assets/images/authentication_background_image.jpg');
    const programImage = get(program, 'image.link') || '';
    const source = programImage ? { uri: programImage } : defaultImg;
    const subProgram = program.subPrograms ? program.subPrograms[0] : null;
    const incompleteSteps = subProgram?.steps?.length && subProgram.steps[0].activities?.length
      ? subProgram.steps
        .map(st => ({ ...st, activities: st.activities?.filter(ac => !ac.activityHistories?.length) }))
        .filter(st => st.activities?.length)
      : [];
    const nextActivityId = incompleteSteps.length && incompleteSteps[0].activities
      ? incompleteSteps[0].activities[0]._id : '';

    let course;
    if (route.params.course) course = route.params.course;
    if (route.params.program) course = subProgram && subProgram.courses ? subProgram.courses[0] : {};

    const courseId = course._id;
    const hasAlreadySubscribed = true;
    const { name, description, learningGoals } = program;
    setData({ name, source, description, learningGoals, nextActivityId, courseId, hasAlreadySubscribed });
  }, [route.params, loggedUserId]);

  const goBack = () => {
    if (isFromCourses) goToCourse();
    else navigation.navigate('Home', { screen: 'Explore', params: { screen: 'Catalog' } });
  };

  const goToCourse = () => navigation.navigate('CourseProfile', { courseId: data?.courseId });

  const goToNextActivity = () => {
    navigation.dispatch(StackActions.push('CourseProfile', { courseId: data?.courseId }));
    navigation.navigate('CardContainer', { activityId: data?.nextActivityId, profileId: data?.courseId });
  };

  const subscribeAndGoToCourseProfile = async () => {
    try {
      if (!data?.hasAlreadySubscribed) await Courses.registerToELearningCourse(data?.courseId);
      setIsCourse(true);
      if (data?.nextActivityId && !isFromCourses) goToNextActivity();
      else goToCourse();
    } catch (e) {
      if (e.status === 401) signOut();
    }
  };

  const buttonCaption = data?.hasAlreadySubscribed ? 'Continuer' : 'Commencer';

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.header} />
      <View style={styles.content}>
        <FeatherButton name='arrow-left' onPress={goBack} size={ICON.MD} color={WHITE} />
        <View style={styles.titleContainer}>
          <Text style={styles.aboutTitle}>A PROPOS</Text>
          <Text style={styles.programTitle}>{data?.name}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={data?.source} />
        </View>
        {data?.description &&
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionContent}>{data.description}</Text>
          </View>
        }
        {data?.learningGoals &&
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Objectifs pédagogiques</Text>
            <Markdown style={markdownStyle(styles.sectionContent)}>{data.learningGoals}</Markdown>
          </View>
        }
      </View>
      <Button style={styles.footer} caption={buttonCaption} onPress={subscribeAndGoToCourseProfile} />
    </ScrollView>
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

const mapDispatchToProps = (dispatch: ({ type }: ActionWithoutPayloadType) => void) => ({
  setIsCourse: (isCourse: boolean) => dispatch(CoursesActions.setIsCourse(isCourse)),
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
