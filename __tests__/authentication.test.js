import React from 'react';
import axios from 'axios';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider as AuthProvider } from '../src/context/AuthContext';
import getEnvVars from '../environment';
import reducers from '../src/store/index';
import AppContainer from '../src/AppContainer';
import { alenviAxios } from '../src/api/ressources/alenviAxios';

describe('Authentication tests', () => {
  let axiosMock;
  let alenviAxiosMock;

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
    alenviAxiosMock = new MockAdapter(alenviAxios);
  });

  afterEach(() => {
    axiosMock.restore();
    alenviAxiosMock.restore();
  });

  test('user should authenticate and be redirected to Home page', async () => {
    const { baseURL } = getEnvVars();
    const store = createStore(reducers);
    const expirationDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    axiosMock.onPost(`${baseURL}/users/authenticate`)
      .reply(
        200,
        {
          data: {
            token: 'token',
            tokenExpireDate: expirationDate,
            refreshToken: 'refresh-token',
            user: { _id: '321' },
          },
        }
      )
      .onPost(`${baseURL}/users/refreshToken`, { refreshToken: 'refresh-token' })
      .reply(
        200,
        {
          data: {
            token: 'token',
            tokenExpireDate: expirationDate,
            refreshToken: 'refresh-token',
            user: { _id: '321' },
          },
        }
      );
    alenviAxiosMock.onGet(`${baseURL}/users/321`)
      .reply(200, { data: { user: { _id: '321' } } })
      .onGet(`${baseURL}/courses/user`)
      .reply(200, { data: { courses: [] } })
      .onGet(`${baseURL}/subprograms/draft-e-learning`)
      .reply(200, { data: { subPrograms: [] } });

    const element = render(
      <AuthProvider>
        <ReduxProvider store={store}>
          <AppContainer/>
        </ReduxProvider>
      </AuthProvider>
    );

    const emailInput = await waitFor(() => element.getByTestId('Email'));
    fireEvent.changeText(emailInput, 'test@alenvi.io');

    const passwordInput = await waitFor(() => element.getByTestId('Mot de passe'));
    fireEvent.changeText(passwordInput, '123456');

    const sendButton = await waitFor(() => element.getByTestId('Se connecter'));
    fireEvent.press(sendButton);

    const header = await waitFor(() => element.getByTestId('header'));

    expect(header).toBeTruthy();
  });
});
