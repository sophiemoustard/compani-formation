import React, { useState, useContext, useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Courses from '../api/courses';
import { Context as AuthContext } from '../context/AuthContext';
import commonStyles from '../styles/common';
import { FIRA_SANS_BOLD } from '../styles/fonts';
import { MAIN_MARGIN_LEFT } from '../styles/metrics';
import { YELLOW } from '../styles/colors';
import { getLoggedUserId } from '../store/main/selectors';
import { STRICTLY_E_LEARNING } from '../core/data/constants';
import CourseCell from '../components/CourseCell';

interface ProgramListProps {
  navigation: NavigationType,
  loggedUserId: string | null,
}

const ProgramList = ({ navigation, loggedUserId }: ProgramListProps) => {
  const [courses, setCourses] = useState(new Array(0));
  const { signOut } = useContext(AuthContext);

  const getCourses = async () => {
    try {
      const fetchedCourses = await Courses.getCourses({ format: STRICTLY_E_LEARNING });
      setCourses(fetchedCourses);
    } catch (e) {
      if (e.status === 401) signOut();
      console.error(e);
      setCourses(() => []);
    }
  };

  useEffect(() => {
    async function fetchData() { getCourses(); }
    if (loggedUserId) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUserId]);

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <ScrollView style={commonStyles.container}>
      <Text style={commonStyles.title}>Explorer</Text>
      {courses.length > 0 &&
        <>
          <View style={commonStyles.sectionContainer}>
            <View style={commonStyles.contentTitle}>
              <Text style={commonStyles.sectionTitle}>Formations e-learning</Text>
              <View style={{ ...styles.coursesCountContainer, ...commonStyles.countContainer }}>
                <Text style={styles.coursesCount}>{courses.length}</Text>
              </View>
            </View>
            <FlatList
              horizontal
              data={courses}
              keyExtractor={item => item._id}
              renderItem={({ item }) => <CourseCell course={item} navigation={navigation} />}
              contentContainerStyle={styles.courseContainer}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={renderSeparator} />
          </View>
        </>
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  coursesCount: {
    ...FIRA_SANS_BOLD.MD,
    color: YELLOW[800],
  },
  coursesCountContainer: {
    backgroundColor: YELLOW[200],
  },
  courseContainer: {
    paddingHorizontal: MAIN_MARGIN_LEFT,
  },
  separator: {
    marginRight: 8,
  },
});

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

export default connect(mapStateToProps)(ProgramList);
