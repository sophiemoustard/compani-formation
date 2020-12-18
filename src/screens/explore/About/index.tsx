import React, { useContext, useEffect } from 'react';
import { Image, Text, View, ScrollView, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { CommonActions, StackActions, StackActionType } from '@react-navigation/native';
import get from 'lodash/get';
import { Context as AuthContext } from '../../../context/AuthContext';
import styles from './styles';
import { WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import Button from '../../../components/form/Button';
import IconButton from '../../../components/IconButton';
import Courses from '../../../api/courses';
import { getLoggedUserId } from '../../../store/main/selectors';
import CoursesActions from '../../../store/courses/actions';
import { ActionWithoutPayloadType } from '../../../types/store/StoreType';

interface AboutProps {
  route: { params: { program } },
  navigation: {
    navigate: (path: string, params?: object) => {},
    dispatch: (action: CommonActions.Action | StackActionType) => {}},
  loggedUserId: string,
  setIsCourse: (value: boolean) => void,
}

const About = ({ route, navigation, loggedUserId, setIsCourse }: AboutProps) => {
  const defaultImg = require('../../../../assets/images/authentication_background_image.jpg');
  const { signOut } = useContext(AuthContext);
  const { program } = route.params;
  const programImage = get(program, 'image.link') || '';
  const source = programImage ? { uri: programImage } : defaultImg;
  const subProgram = program.subPrograms ? program.subPrograms[0] : null;
  const incompleteSteps = subProgram?.steps?.length && subProgram.steps[0].activities?.length
    ? subProgram.steps.map(st => ({ ...st, activities: st.activities.filter(ac => !ac.activityHistories?.length) }))
      .filter(st => st.activities.length)
    : [];
  const nextActivityId = incompleteSteps.length ? incompleteSteps[0].activities[0]._id : '';
  const course = subProgram && subProgram.courses ? subProgram.courses[0] : {};
  const courseId = course._id;
  const hasAlreadySubscribed = course.trainees.includes(loggedUserId);

  const hardwareBackPress = () => {
    goBack();
    return true;
  };

  useEffect(() => { BackHandler.addEventListener('hardwareBackPress', hardwareBackPress); });

  const goBack = () => navigation.navigate('Home', { screen: 'Explore', params: { screen: 'Catalog' } });

  const goToCourse = () => navigation.navigate('CourseProfile', { courseId });

  const goToNextActivity = () => {
    navigation.dispatch(StackActions.push('CourseProfile', { courseId }));
    navigation.navigate('CardContainer', { activityId: nextActivityId, profileId: courseId });
  };

  const subscribeAndGoToCourseProfile = async () => {
    try {
      if (!hasAlreadySubscribed) await Courses.registerToELearningCourse(courseId);
      setIsCourse(true);
      if (nextActivityId) goToNextActivity();
      else goToCourse();
    } catch (e) {
      if (e.status === 401) signOut();
    }
  };

  const buttonCaption = hasAlreadySubscribed ? 'Continuer' : 'Commencer';

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.header} />
      <View style={styles.content}>
        <IconButton name='arrow-left' onPress={goBack} size={ICON.MD} color={WHITE} />
        <View style={styles.titleContainer}>
          <Text style={styles.aboutTitle}>A PROPOS</Text>
          <Text style={styles.programTitle}>{program.name}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={source} />
        </View>
        <View style={styles.description}>
          <Text>{program.description}</Text>
        </View>
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
