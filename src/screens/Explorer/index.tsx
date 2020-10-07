import React, { useState, useContext, useEffect } from 'react';
import { Text, ScrollView, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Programs from '../../api/programs';
import { Context as AuthContext } from '../../context/AuthContext';
import commonStyles from '../../styles/common';
import { getLoggedUserId } from '../../store/main/selectors';
import { STRICTLY_E_LEARNING } from '../../core/data/constants';
import CourseCell from '../../components/CourseCell';
import styles from './styles';

interface ExplorerProps {
  loggedUserId: string | null,
}

const Explorer = ({ loggedUserId }: ExplorerProps) => {
  const [courses, setCourses] = useState(new Array(0));
  const { signOut } = useContext(AuthContext);

  const getCourses = async () => {
    try {
      const fetchedCourses = await Programs.getPrograms({ format: STRICTLY_E_LEARNING });
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

  const renderItem = (program) => {
    const programName = program.name || '';
    const programImage = get(program, 'image.link') || '';
    return <CourseCell programName={programName} programImage={programImage} disableNavigation={true} />;
  };

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
              renderItem={({ item }) => renderItem(item)}
              contentContainerStyle={styles.courseContainer}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={renderSeparator} />
          </View>
        </>
      }
    </ScrollView>
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

export default connect(mapStateToProps)(Explorer);
