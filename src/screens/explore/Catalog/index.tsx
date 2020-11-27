import React, { useState, useContext, useEffect } from 'react';
import { Text, ScrollView, View, FlatList, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Programs from '../../../api/programs';
import { Context as AuthContext } from '../../../context/AuthContext';
import commonStyles from '../../../styles/common';
import { getLoggedUserId } from '../../../store/main/selectors';
import ProgramCell from '../../../components/ProgramCell';
import styles from './styles';
import { ProgramType } from '../../../types/ProgramType';

interface CatalogProps {
  loggedUserId: string | null,
  navigation: { navigate: (path: string, params: { programId: string }) => {} },
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
    async function fetchData() { getPrograms(); }
    if (loggedUserId && isFocused) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUserId, isFocused]);

  const goToProgram = program => navigation.navigate('About', { programId: program._id });

  const renderSeparator = () => <View style={styles.separator} />;

  const renderItem = program => <ProgramCell program={program} onPress={() => goToProgram(program)} />;

  return (
    <ScrollView style={commonStyles.container}>
      <Text style={commonStyles.title}>Explorer</Text>
      {programs.length > 0 &&
        <ImageBackground imageStyle={styles.background} style={styles.sectionContainer}
          source={require('../../../../assets/images/ongoing_background.png')}>
          <View style={commonStyles.sectionContainer}>
            <Text style={commonStyles.sectionTitleText}>Formations e-learning</Text>
            <Text style={[styles.programsCount, commonStyles.countContainer]}>
              {programs.length > 1
                ? `${programs.length} ÉVÉNEMENTS`
                : `${programs.length} ÉVÉNEMENT`
              }
            </Text>
            <FlatList horizontal data={programs} keyExtractor={item => item._id}
              renderItem={({ item }) => renderItem(item)} contentContainerStyle={styles.programContainer}
              showsHorizontalScrollIndicator={false} ItemSeparatorComponent={renderSeparator} />
          </View>
        </ImageBackground>
      }
    </ScrollView>
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

export default connect(mapStateToProps)(Catalog);
