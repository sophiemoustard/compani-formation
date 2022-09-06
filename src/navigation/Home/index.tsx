import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import CatalogIcon from '../../../assets/icons/CatalogIcon';
import CatalogSelectedIcon from '../../../assets/icons/CatalogSelectedIcon';
import LearnerCoursesIcon from '../../../assets/icons/LearnerCoursesIcon';
import LearnerCoursesSelectedIcon from '../../../assets/icons/LearnerCoursesSelectedIcon';
import TrainerCoursesIcon from '../../../assets/icons/TrainerCoursesIcon';
import TrainerCoursesSelectedIcon from '../../../assets/icons/TrainerCoursesSelectedIcon';
import ProfileIcon from '../../../assets/icons/ProfileIcon';
import ProfileSelectedIcon from '../../../assets/icons/ProfileSelectedIcon';
import { getUserVendorRole } from '../../store/main/selectors';
import LearnerCourses from '../../screens/courses/list/LearnerCourses';
import TrainerCourses from '../../screens/courses/list/TrainerCourses';
import Catalog from '../../screens/explore/Catalog';
import ProfileDetails from '../../screens/profile/Profile';
import styles from './styles';
import { RootBottomTabParamList } from '../../types/NavigationType';
import { VENDOR_ADMIN, TRAINING_ORGANISATION_MANAGER, TRAINER } from '../../core/data/constants';

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

interface tabBarProps {
  focused: boolean
}

const catalogIcon = ({ focused }: tabBarProps) => (focused
  ? <View style={styles.iconContainer}>
    <CatalogSelectedIcon />
    <Text style={styles.iconText}>Explorer</Text>
  </View>
  : <CatalogIcon style={styles.iconContainer} />);

const learnerCoursesIcon = ({ focused }: tabBarProps) => (focused
  ? <View style={styles.iconContainer}>
    <LearnerCoursesSelectedIcon />
    <Text style={styles.iconText}>Mes formations</Text>
  </View>
  : <LearnerCoursesIcon style={styles.iconContainer} />);

const trainerCoursesIcon = ({ focused }: tabBarProps) => (focused
  ? <View style={styles.iconContainer}>
    <TrainerCoursesSelectedIcon />
    <Text style={styles.iconText}>Espace intervenant</Text>
  </View>
  : <TrainerCoursesIcon style={styles.iconContainer} />);

const profileIcon = ({ focused }: tabBarProps) => (focused
  ? <View style={styles.iconContainer}>
    <ProfileSelectedIcon />
    <Text style={styles.iconText}>Profil</Text>
  </View>
  : <ProfileIcon style={styles.iconContainer} />);

interface HomeProps {
  userVendorRole: string | null,
}

const Home = ({ userVendorRole } : HomeProps) => {
  const showTrainerTab = !!userVendorRole &&
    [VENDOR_ADMIN, TRAINING_ORGANISATION_MANAGER, TRAINER].includes(userVendorRole);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: styles.tabBar }}
      initialRouteName="LearnerCourses">
      <Tab.Screen name="Catalog" component={Catalog} options={{ tabBarIcon: catalogIcon }} />
      <Tab.Screen name="LearnerCourses" component={LearnerCourses} options={{ tabBarIcon: learnerCoursesIcon }} />
      { showTrainerTab &&
        <Tab.Screen name="TrainerCourses" component={TrainerCourses} options={{ tabBarIcon: trainerCoursesIcon }} />}
      <Tab.Screen name="Profile" component={ProfileDetails} options={{ tabBarIcon: profileIcon }} />
    </Tab.Navigator>
  );
};

const mapStateToProps = state => ({ userVendorRole: getUserVendorRole(state) });

export default connect(mapStateToProps)(Home);
