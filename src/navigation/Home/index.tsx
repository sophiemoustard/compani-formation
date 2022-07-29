import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CatalogIcon from '../../../assets/icons/CatalogIcon';
import CatalogSelectedIcon from '../../../assets/icons/CatalogSelectedIcon';
import CoursesIcon from '../../../assets/icons/CoursesIcon';
import CoursesSelectedIcon from '../../../assets/icons/CoursesSelectedIcon';
import ProfileIcon from '../../../assets/icons/ProfileIcon';
import ProfileSelectedIcon from '../../../assets/icons/ProfileSelectedIcon';
import CourseList from '../../screens/courses/CourseList';
import Catalog from '../../screens/explore/Catalog';
import ProfileDetails from '../../screens/profile/Profile';
import styles from './styles';
import { RootBottomTabParamList } from '../../types/NavigationType';

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

const courseIcon = ({ focused }: tabBarProps) => (focused
  ? <View style={styles.iconContainer}>
    <CoursesSelectedIcon />
    <Text style={styles.iconText}>Mes formations</Text>
  </View>
  : <CoursesIcon style={styles.iconContainer} />);

const profileIcon = ({ focused }: tabBarProps) => (focused
  ? <View style={styles.iconContainer}>
    <ProfileSelectedIcon />
    <Text style={styles.iconText}>Profil</Text>
  </View>
  : <ProfileIcon style={styles.iconContainer} />);

const Home = () => (
  <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: styles.tabBar }}
    initialRouteName="Courses">
    <Tab.Screen name="Catalog" component={Catalog} options={{ tabBarIcon: catalogIcon }} />
    <Tab.Screen name="Courses" component={CourseList} options={{ tabBarIcon: courseIcon }} />
    <Tab.Screen name="Profile" component={ProfileDetails} options={{ tabBarIcon: profileIcon }} />
  </Tab.Navigator>
);

export default Home;
