import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, ScrollView, ImageSourcePropType, BackHandler } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { CommonActions, StackActions, StackActionType, useIsFocused } from '@react-navigation/native';
import get from 'lodash/get';
import { navigate } from '../../../navigationRef';
import { Context as AuthContext } from '../../../context/AuthContext';
import styles from './styles';
import { WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import Button from '../../../components/form/Button';
import Courses from '../../../api/courses';
import Programs from '../../../api/programs';
import { getLoggedUserId } from '../../../store/main/selectors';
import CoursesActions from '../../../store/courses/actions';
import { ActionWithoutPayloadType } from '../../../types/store/StoreType';

interface AboutProps {
  route: { params: { programId: string } },
  navigation: {
    navigate: (path: string, activityId: any) => {},
    dispatch: (action: CommonActions.Action | StackActionType) => {}},
  loggedUserId: string,
  setIsCourse: (value: boolean) => void,
}

const About = ({ route, navigation, loggedUserId, setIsCourse }: AboutProps) => {
  const defaultImg = require('../../../../assets/images/authentication_background_image.jpg');
  const { programId } = route.params;
  const { signOut } = useContext(AuthContext);
  const [source, setSource] = useState<ImageSourcePropType>(defaultImg);
  const [programName, setProgramName] = useState<string>('');
  const [programDescription, setProgramDescription] = useState<string>('');
  const [courseId, setCourseId] = useState<string>('');
  const [nextActivityId, setNextActivityId] = useState<string>('');
  const [hasAlreadySubscribed, setHasAlreadySubscribed] = useState<Boolean>(false);

  const isFocused = useIsFocused();

  const getProgram = async () => {
    try {
      const fetchedProgram = await Programs.getProgramForUser(programId);
      const programImage = get(fetchedProgram, 'image.link') || '';
      setProgramName(fetchedProgram.name || '');
      setProgramDescription(fetchedProgram.description || '');

      if (programImage) setSource({ uri: programImage });

      const subProgram = fetchedProgram.subPrograms ? fetchedProgram.subPrograms[0] : null;
      if (subProgram?.steps?.length && subProgram.steps[0].activities?.length) {
        const incompleteSteps = subProgram.steps.map(st =>
          ({ ...st, activities: st.activities.filter(ac => !ac.activityHistories?.length) }))
          .filter(st => st.activities.length);

        if (incompleteSteps.length) setNextActivityId(incompleteSteps[0].activities[0]._id);
        else setNextActivityId('');
      }
      const fetchedCourse = subProgram && subProgram.courses ? subProgram.courses[0] : {};

      setCourseId(fetchedCourse._id);
      setHasAlreadySubscribed(fetchedCourse.trainees.includes(loggedUserId));
    } catch (e) {
      if (e.status === 401) signOut();
      console.error(e);
      setProgramName('');
      setProgramDescription('');
      setSource(defaultImg);
      setCourseId('');
      setNextActivityId('');
      setHasAlreadySubscribed(false);
    }
  };

  useEffect(() => {
    async function fetchData() { getProgram(); }
    if (loggedUserId && isFocused) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUserId, isFocused]);

  const hardwareBackPress = () => {
    goBack();
    return true;
  };

  useEffect(() => { BackHandler.addEventListener('hardwareBackPress', hardwareBackPress); });

  const goBack = () => {
    navigate('Home', { screen: 'Explore', params: { screen: 'Catalog' } });
  };

  const goToCourse = () => navigation.navigate(
    'Home',
    { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId } } }
  );

  const goToNextActivity = () => {
    navigation.dispatch(StackActions.push('CourseProfile', { courseId }));
    navigation.navigate('CardContainer', { activityId: nextActivityId, courseId });
  };

  const resetExploreStack = () => navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Catalog' }] }));

  const subscribeAndGoToCourseProfile = async () => {
    try {
      if (!hasAlreadySubscribed) await Courses.registerToELearningCourse(courseId);
      setIsCourse(true);
      if (nextActivityId) goToNextActivity();
      else goToCourse();
      setTimeout(resetExploreStack, 100);
    } catch (e) {
      if (e.status === 401) signOut();
    }
  };

  const buttonCaption = hasAlreadySubscribed ? 'Continuer' : 'Commencer';

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.header} />
      <View style={styles.content}>
        <TouchableOpacity onPress={goBack}>
          <Feather name="arrow-left" color={WHITE} size={ICON.MD} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.aboutTitle}>A PROPOS</Text>
          <Text style={styles.programTitle}>{programName}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={source} />
        </View>
        <View style={styles.description}>
          <Text>{programDescription}</Text>
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
