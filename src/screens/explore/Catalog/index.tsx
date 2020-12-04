import React, { useState, useContext, useEffect } from 'react';
import { Text, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Programs from '../../../api/programs';
import { Context as AuthContext } from '../../../context/AuthContext';
import commonStyles from '../../../styles/common';
import { getLoggedUserId } from '../../../store/main/selectors';
import ProgramCell from '../../../components/ProgramCell';
import styles from './styles';
import { ProgramType } from '../../../types/ProgramType';
import CoursesSection from '../../../components/CoursesSection';

interface CatalogProps {
  loggedUserId: string | null,
  navigation: { navigate: (path: string, params: { program: ProgramType }) => {} },
}

const Catalog = ({ loggedUserId, navigation }: CatalogProps) => {
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
    async function fetchData() { await getPrograms(); }
    if (loggedUserId && isFocused) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUserId, isFocused]);

  const goToProgram = program => navigation.navigate('About', { program });

  const renderItem = program => <ProgramCell program={program} onPress={() => goToProgram(program)} />;

  return (
    <ScrollView style={commonStyles.container}>
      <Text style={commonStyles.title}>Explorer</Text>
      {programs.length > 0 &&
      <ImageBackground imageStyle={styles.background} style={styles.sectionContainer}
        source={require('../../../../assets/images/catalog_background.png')}>
        <CoursesSection items={programs} title='Suggéré pour vous' countStyle={styles.programsCount}
          renderItem={renderItem} />
      </ImageBackground>
      }
    </ScrollView>
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

export default connect(mapStateToProps)(Catalog);
