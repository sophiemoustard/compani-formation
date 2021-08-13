import React, { useEffect, useContext } from 'react';
import { StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import * as Notifications from 'expo-notifications';
import get from 'lodash/get';
import AppNavigation from '../navigation/AppNavigation';
import { Context as AuthContext } from '../context/AuthContext';
import MainActions from '../store/main/actions';
import { ActionType, ActionWithoutPayloadType, StateType } from '../types/store/StoreType';
import Users from '../api/users';
import asyncStorage from '../core/helpers/asyncStorage';
import {
  registerForPushNotificationsAsync,
  handleNotificationResponse,
  handleExpoToken,
} from '../core/helpers/notifications';
import { UserType } from '../types/UserType';
import { WHITE } from '../styles/colors';
import styles from './styles';

interface AppContainerProps {
  setLoggedUser: (user: UserType) => void,
  statusBarVisible: boolean,
}

const AppContainer = ({ setLoggedUser, statusBarVisible }: AppContainerProps) => {
  const { tryLocalSignIn, alenviToken, appIsReady, signOut } = useContext(AuthContext);
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (data) => {
      if (!alenviToken) return;
      await handleExpoToken(data);
    });

    const isValidNotification = get(lastNotificationResponse, 'notification.request.content.data') &&
      get(lastNotificationResponse, 'actionIdentifier') === Notifications.DEFAULT_ACTION_IDENTIFIER;
    if (alenviToken && isValidNotification) handleNotificationResponse(lastNotificationResponse);
  }, [alenviToken, lastNotificationResponse]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { tryLocalSignIn(); }, []);

  useEffect(() => {
    async function setUser() {
      try {
        const userId = await asyncStorage.getUserId();
        const user = await Users.getById(userId);
        setLoggedUser(user);
      } catch (e) {
        if (e.status === 401) signOut();
        console.error(e);
      }
    }

    if (alenviToken) setUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alenviToken]);

  if (!appIsReady) return null;

  const style = styles(statusBarVisible, StatusBar.currentHeight);

  return (
    <>
      <View style={style.statusBar}>
        <StatusBar hidden={!statusBarVisible} translucent barStyle="dark-content" backgroundColor={WHITE} />
      </View>
      <AppNavigation />
    </>
  );
};

const mapStateToProps = (state: StateType) => ({
  statusBarVisible: state.main.statusBarVisible,
});

const mapDispatchToProps = (dispatch: ({ type }: ActionType | ActionWithoutPayloadType) => void) => ({
  setLoggedUser: (user: UserType) => dispatch(MainActions.setLoggedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
