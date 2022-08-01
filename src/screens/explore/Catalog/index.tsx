import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import groupBy from 'lodash/groupBy';
import { useIsFocused, CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import get from 'lodash/get';
import { RootBottomTabParamList, RootStackParamList } from '../../../types/NavigationType';
import Programs from '../../../api/programs';
import { ELearningProgramType } from '../../../types/CourseTypes';
import commonStyles from '../../../styles/common';
import { getLoggedUserId } from '../../../store/main/selectors';
import ProgramCell from '../../../components/ProgramCell';
import styles from './styles';
import CoursesSection from '../../../components/CoursesSection';
import { GREEN, PINK, YELLOW, PURPLE } from '../../../styles/colors';
import { capitalizeFirstLetter, getTheoreticalHours } from '../../../core/helpers/utils';

interface CatalogProps extends CompositeScreenProps<
StackScreenProps<RootBottomTabParamList>,
StackScreenProps<RootStackParamList>
> {
  loggedUserId: string | null,
}

const CategoriesStyleList = [
  {
    imageBackground: require('../../../../assets/images/yellow_section_background.png'),
    backgroundStyle: styles().leftBackground,
    countStyle: { background: YELLOW[200], color: YELLOW[900] },
  },
  {
    imageBackground: require('../../../../assets/images/green_section_background.png'),
    backgroundStyle: styles().rightBackground,
    countStyle: { background: GREEN[200], color: GREEN[900] },
  },
  {
    imageBackground: require('../../../../assets/images/purple_section_background.png'),
    backgroundStyle: styles().leftBackground,
    countStyle: { background: PURPLE[200], color: PURPLE[800] },
  },
  {
    imageBackground: require('../../../../assets/images/pink_section_background.png'),
    backgroundStyle: styles().rightBackground,
    countStyle: { background: PINK[200], color: PINK[600] },
  },
];

const Catalog = ({ loggedUserId, navigation }: CatalogProps) => {
  const [programsByCategories, setProgramsByCategories] = useState<object>({});
  const isFocused = useIsFocused();
  const style = styles();

  const getPrograms = async () => {
    try {
      const fetchedPrograms = await Programs.getELearningPrograms();
      const splittedByCategoryPrograms = fetchedPrograms.map(f => (
        f.categories.map(category => ({ ...f, category: category.name }))
      )).flat();
      setProgramsByCategories(groupBy(splittedByCategoryPrograms, f => f.category));
    } catch (e: any) {
      console.error(e);
      setProgramsByCategories({});
    }
  };

  useEffect(() => {
    async function fetchData() { await getPrograms(); }
    if (loggedUserId && isFocused) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUserId, isFocused]);

  const goToProgram = (program: ELearningProgramType) => navigation.navigate('ElearningAbout', { program });

  const renderItem = program => <ProgramCell program={program} onPress={() => goToProgram(program)}
    theoreticalHours={getTheoreticalHours(get(program, 'subPrograms[0].steps'))} />;

  return (
    <SafeAreaView style={commonStyles.container} edges={['top', 'right', 'left']}>
      <ScrollView style={commonStyles.container} contentContainerStyle={style.container}>
        <Text style={commonStyles.title}>Explorer</Text>
        {Object.keys(programsByCategories).map((key, i) =>
          <ImageBackground imageStyle={CategoriesStyleList[i % 4].backgroundStyle} style={style.sectionContainer}
            key={`program${i}`} source={CategoriesStyleList[i % 4].imageBackground}>
            <CoursesSection items={programsByCategories[key]} title={capitalizeFirstLetter(key)}
              countStyle={styles(CategoriesStyleList[i % 4].countStyle).programsCount} renderItem={renderItem} />
          </ImageBackground>)}
        <View style={style.footer}>
          <Image style={style.elipse} source={require('../../../../assets/images/log_out_background.png')} />
          <Image source={require('../../../../assets/images/aux_detective.png')} style={style.fellow} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

export default connect(mapStateToProps)(Catalog);
