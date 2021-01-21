import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { CommonActions, StackActions, StackActionType } from '@react-navigation/native';
import { Context as AuthContext } from '../../../context/AuthContext';
import Courses from '../../../api/courses';
import { getLoggedUserId } from '../../../store/main/selectors';
import CoursesActions from '../../../store/courses/actions';
import { ActionWithoutPayloadType } from '../../../types/store/StoreType';
import About from '../../../components/About';

interface ElearningAboutProps {
  route: { params: { program, isFromCourses } },
  navigation: {
    navigate: (path: string, params?: object) => {},
    dispatch: (action: CommonActions.Action | StackActionType) => {},
    goBack: () => {},
  },
  loggedUserId: string,
  setIsCourse: (value: boolean) => void,
}

const ElearningAbout = ({ route, navigation, loggedUserId, setIsCourse }: ElearningAboutProps) => {
  const { signOut } = useContext(AuthContext);
  const { program, isFromCourses } = route.params;
  const subProgram = program.subPrograms ? program.subPrograms[0] : null;
  const incompleteSteps = subProgram?.steps?.length && subProgram.steps[0].activities?.length
    ? subProgram.steps.map(st => ({ ...st, activities: st.activities.filter(ac => !ac.activityHistories?.length) }))
      .filter(st => st.activities.length)
    : [];
  const nextActivityId = incompleteSteps.length ? incompleteSteps[0].activities[0]._id : '';
  const course = subProgram && subProgram.courses ? subProgram.courses[0] : {};
  const courseId = course._id;
  const hasAlreadySubscribed = course.trainees.includes(loggedUserId);

  const goToCourse = () => navigation.navigate('CourseProfile', { courseId });

  const goToNextActivity = () => {
    navigation.dispatch(StackActions.push('CourseProfile', { courseId }));
    navigation.navigate('CardContainer', { activityId: nextActivityId, profileId: courseId });
  };

  const subscribeAndGoToCourseProfile = async () => {
    try {
      if (!hasAlreadySubscribed) await Courses.registerToELearningCourse(courseId);
      setIsCourse(true);
      if (nextActivityId && !isFromCourses) goToNextActivity();
      else goToCourse();
    } catch (e) {
      if (e.status === 401) signOut();
    }
  };

  const buttonCaption = hasAlreadySubscribed ? 'Continuer' : 'Commencer';

  return (
    <About program={program} onPress={subscribeAndGoToCourseProfile} buttonCaption={buttonCaption} />
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

const mapDispatchToProps = (dispatch: ({ type }: ActionWithoutPayloadType) => void) => ({
  setIsCourse: (isCourse: boolean) => dispatch(CoursesActions.setIsCourse(isCourse)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ElearningAbout);
