import { useState, useEffect, Dispatch } from 'react';
import { Text, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import groupBy from 'lodash/groupBy';
import { useRouter } from 'expo-router';
import { useIsFocused, CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import get from 'lodash/get';
import { RootBottomTabParamList, RootStackParamList } from '@/types/NavigationType';
import Programs from '@/api/programs';
import { ELearningProgramType, ProgramType } from '@/types/CourseTypes';
import commonStyles from '@/styles/common';
import ProgramActions from '@/store/program/actions';
import { getLoggedUserId } from '@/store/main/selectors';
import ProgramCell from '@/components/ProgramCell';
import styles from './styles';
import CoursesSection from '@/components/CoursesSection';
import HomeScreenFooter from '@/components/HomeScreenFooter';
import { GREEN, PINK, YELLOW, PURPLE } from '@/styles/colors';
import { capitalizeFirstLetter, getTheoreticalDuration } from '@/core/helpers/utils';
import { ActionType, StateType } from '@/types/store/StoreType';

interface CatalogProps extends CompositeScreenProps<
StackScreenProps<RootBottomTabParamList>,
StackScreenProps<RootStackParamList>
> {
  loggedUserId: string | null,
  setProgram: (program: ProgramType) => void,
}

const CategoriesStyleList = [
  {
    imageBackground: require('../../../../assets/images/yellow_section_background.webp'),
    backgroundStyle: styles().leftBackground,
    countStyle: { background: YELLOW[200], color: YELLOW[900] },
  },
  {
    imageBackground: require('../../../../assets/images/green_section_background.webp'),
    backgroundStyle: styles().rightBackground,
    countStyle: { background: GREEN[200], color: GREEN[900] },
  },
  {
    imageBackground: require('../../../../assets/images/purple_section_background.webp'),
    backgroundStyle: styles().leftBackground,
    countStyle: { background: PURPLE[200], color: PURPLE[800] },
  },
  {
    imageBackground: require('../../../../assets/images/pink_section_background.webp'),
    backgroundStyle: styles().rightBackground,
    countStyle: { background: PINK[200], color: PINK[600] },
  },
];

const Catalog = ({ loggedUserId, setProgram }: CatalogProps) => {
  const router = useRouter();
  const [programsByCategories, setProgramsByCategories] = useState<{ [key: string]: ProgramType[] }>({});
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
    if (isFocused) {
      fetchData();
    }
  }, [loggedUserId, isFocused]);

  const goToProgram = (program: ELearningProgramType) => {
    setProgram(program);
    router.navigate({ pathname: '/Explore/ELearningAbout', params: { isFromCatalog: true } });
  };

  const renderItem = (program: ELearningProgramType) => <ProgramCell onPress={() => goToProgram(program)}
    program={program} theoreticalDuration={getTheoreticalDuration(get(program, 'subPrograms[0].steps'))} />;

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView contentContainerStyle={style.container}>
        <Text style={commonStyles.title}>Explorer</Text>
        {Object.keys(programsByCategories).map((key, i) =>
          <ImageBackground imageStyle={CategoriesStyleList[i % 4].backgroundStyle} style={style.sectionContainer}
            key={`program${i}`} source={CategoriesStyleList[i % 4].imageBackground}>
            <CoursesSection items={programsByCategories[key]} title={capitalizeFirstLetter(key)}
              countStyle={styles(CategoriesStyleList[i % 4].countStyle).programsCount} renderItem={renderItem} />
          </ImageBackground>)}
        <HomeScreenFooter source={require('../../../../assets/images/aux_detective.webp')} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StateType) => ({ loggedUserId: getLoggedUserId(state) });

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  setProgram: (program: ProgramType) => dispatch(ProgramActions.setProgram(program)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
