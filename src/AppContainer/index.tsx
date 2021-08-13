import React, { useEffect, useContext, useState, useRef } from 'react';
import { StatusBar, View, AppState } from 'react-native';
import { connect } from 'react-redux';
import * as Notifications from 'expo-notifications';
import get from 'lodash/get';
import { AxiosRequestConfig } from 'axios';
import AppNavigation from '../navigation/AppNavigation';
import { Context as AuthContext } from '../context/AuthContext';
import MainActions from '../store/main/actions';
import { ActionType, ActionWithoutPayloadType, StateType } from '../types/store/StoreType';
import axiosLogged from '../api/axios/logged';
import Users from '../api/users';
import Version from '../api/version';
import asyncStorage from '../core/helpers/asyncStorage';
import {
  registerForPushNotificationsAsync,
  handleNotificationResponse,
  handleExpoToken,
} from '../core/helpers/notifications';
import { ACTIVE_STATE } from '../core/data/constants';
import UpdateAppModal from '../components/UpdateAppModal';
import { UserType } from '../types/UserType';
import { WHITE } from '../styles/colors';
import styles from './styles';

interface AppContainerProps {
  setLoggedUser: (user: UserType) => void,
  statusBarVisible: boolean,
}

const AppContainer = ({ setLoggedUser, statusBarVisible }: AppContainerProps) => {
  const { tryLocalSignIn, alenviToken, appIsReady, signOut } = useContext(AuthContext);
  const [modalOpened, setModalOpened] = useState(false);
  const axiosLoggedInterceptorId = useRef<number | null>(null);
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

  const initializeAxiosLogged = (token: string | null) => {
    if (axiosLoggedInterceptorId.current !== null) {
      axiosLogged.interceptors.request.eject(axiosLoggedInterceptorId.current);
    }

    axiosLoggedInterceptorId.current = axiosLogged.interceptors
      .request
      .use(async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        const loggedAxiosConfig = { ...config };
        loggedAxiosConfig.headers.common['x-access-token'] = token;

        return loggedAxiosConfig;
      }, err => Promise.reject(err));
  };

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

    initializeAxiosLogged(alenviToken);
    if (alenviToken) setUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alenviToken]);

  const shouldUpdate = async (nextState) => {
    try {
      if (nextState === ACTIVE_STATE) {
        const { mustUpdate } = await Version.shouldUpdate();
        setModalOpened(mustUpdate);
      }
    } catch (error) {
      if (error.status === 401) signOut();
      console.error(error);
    }
  };

  useEffect(() => {
    shouldUpdate(ACTIVE_STATE);
    AppState.addEventListener('change', shouldUpdate);

    return () => { AppState.removeEventListener('change', shouldUpdate); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!appIsReady) return null;

  const style = styles(statusBarVisible, StatusBar.currentHeight);

  return (
    <>
      <UpdateAppModal visible={modalOpened} />
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
