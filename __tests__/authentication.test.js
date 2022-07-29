import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import sinon from 'sinon';
import { render, fireEvent, waitFor, act, cleanup } from '@testing-library/react-native';
import { Provider as AuthProvider } from '../src/context/AuthContext';
import Environment from '../environment';
import reducers from '../src/store/index';
import AppContainer from '../src/AppContainer';
import axiosLogged from '../src/api/axios/logged';
import axiosNotLogged from '../src/api/axios/notLogged';

describe('Authentication tests', () => {
  const baseURL = 'test';
  let axiosLoggedMock;
  let axiosNotLoggedMock;
  let getEnvVarsStub;
  let getBaseUrlStub;

  beforeEach(() => {
    axiosLoggedMock = new MockAdapter(axiosLogged);
    axiosNotLoggedMock = new MockAdapter(axiosNotLogged);
    getEnvVarsStub = sinon.stub(Environment, 'getEnvVars');
    getBaseUrlStub = sinon.stub(Environment, 'getBaseUrl');
  });

  afterEach(() => {
    axiosLoggedMock.restore();
    axiosNotLoggedMock.restore();
    getEnvVarsStub.restore();
    getBaseUrlStub.restore();
    cleanup();
  });

  test('user should authenticate and be redirected to Home page', async () => {
    getEnvVarsStub.returns({ baseURL: 'test' });
    getBaseUrlStub.returns('test');
    const store = createStore(reducers);
    const expirationDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    axiosNotLoggedMock.onPost(`${baseURL}/users/authenticate`)
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
      .onGet(`${baseURL}/version/should-update`)
      .reply(200, { data: { mustUpdate: false } })
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
    axiosLoggedMock.onGet(`${baseURL}/users/321`)
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

    let emailInput;
    let sendButton;
    let passwordInput;

    await waitFor(() => {
      emailInput = element.getByTestId('Email');
      passwordInput = element.getByTestId('Mot de passe');
      sendButton = element.getByTestId('Se connecter');
    });

    await act(async () => fireEvent.changeText(emailInput, 'test@alenvi.io'));
    await act(async () => fireEvent.changeText(passwordInput, '123456'));
    await act(async () => fireEvent.press(sendButton));

    const header = element.getByTestId('header');
    expect(header).toBeTruthy();
  });
});
