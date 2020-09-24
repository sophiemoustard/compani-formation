import Reactotron from 'reactotron-react-native';
// import asyncStorage from '@react-native-community/async-storage';

declare global {
  interface Console {
    tron: any;
  }
}

const tron = Reactotron
  .configure({ name: 'Alenvi Mobile' })
  // .setAsyncStorageHandler(asyncStorage)
  .useReactNative({ asyncStorage: false })
  .connect();

tron.clear!();

console.tron = tron;

export default tron;
