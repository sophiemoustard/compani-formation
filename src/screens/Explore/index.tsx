import React, { useState, useContext, useEffect } from 'react';
import { Text, ScrollView, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Programs from '../../api/programs';
import { Context as AuthContext } from '../../context/AuthContext';
import commonStyles from '../../styles/common';
import { getLoggedUserId } from '../../store/main/selectors';
import ProgramCell from '../../components/ProgramCell';
import styles from './styles';
import { ProgramType } from '../../types/ProgramType';

interface ExploreProps {
  loggedUserId: string | null,
}

const Explore = ({ loggedUserId }: ExploreProps) => {
  const [programs, setPrograms] = useState<Array<ProgramType>>([]);
  const { signOut } = useContext(AuthContext);
  const isFocused = useIsFocused();

  const getPrograms = async () => {
    try {
      const fetchedPrograms = await Programs.getELearningPrograms();
      setPrograms(fetchedPrograms);
    } catch (e) {
      if (e.status === 401) signOut();
      console.error(e);
      setPrograms(() => []);
    }
  };

  useEffect(() => {
    async function fetchData() { getPrograms(); }
    if (loggedUserId || isFocused) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUserId, isFocused]);

  const renderSeparator = () => <View style={styles.separator} />;

  const renderItem = (program) => {
    const courseId = program.subPrograms[0].courses[0]._id;
    return <ProgramCell program={program} courseId={courseId} />;
  };

  return (
    <ScrollView style={commonStyles.container}>
      <Text style={commonStyles.title}>Explorer</Text>
      {programs.length > 0 &&
        <>
          <View style={commonStyles.sectionContainer}>
            <View style={commonStyles.sectionTitle}>
              <Text style={commonStyles.sectionTitleText}>Formations e-learning</Text>
              <View style={{ ...styles.programsCountContainer, ...commonStyles.countContainer }}>
                <Text style={styles.programsCount}>{programs.length}</Text>
              </View>
            </View>
            <FlatList horizontal data={programs} keyExtractor={item => item._id}
              renderItem={({ item }) => renderItem(item)} contentContainerStyle={styles.programContainer}
              showsHorizontalScrollIndicator={false} ItemSeparatorComponent={renderSeparator} />
          </View>
        </>
      }
    </ScrollView>
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

export default connect(mapStateToProps)(Explore);
