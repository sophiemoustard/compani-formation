import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthenticationScreen from './src/screens/AuthenticationScreen';

const navigator = createStackNavigator(
  {
    Auth: AuthenticationScreen,
  },
  {
    initialRouteName: 'Auth',
    defaultNavigationOptions: {
      title: 'Compani',
    }
  }
);

export default createAppContainer(navigator);
