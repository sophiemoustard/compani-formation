import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { AsyncStorage } from 'react-native';

declare global {
  interface Console {
    tron: any;
  }
}

const tron = Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure({ name: 'Alenvi Mobile' })
  .useReactNative()
  .use(reactotronRedux())
  .connect();

tron.clear!();

console.tron = tron;

export default tron;
