import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { AsyncStorage } from 'react-native';

const tron = Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure({ name: 'Alenvi Mobile', host: '192.168.1.102', port: 9090 })
  .useReactNative()
  .use(reactotronRedux());

if (__DEV__) { tron.connect(); }

tron.clear();

// eslint-disable-next-line no-console
console.tron = tron;

export default tron;
