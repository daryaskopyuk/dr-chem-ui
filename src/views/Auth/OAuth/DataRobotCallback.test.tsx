import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/store';

import * as api from 'services/applicationApi';
import { clearLocalstorage, getLocalstorage } from 'utils/localStorage';
import { LOCALSTORAGE_ITEMS } from 'app-constants';

import DataRobotCallback from './DataRobotCallback';

const { ACCESS_TOKEN, REFRESH_TOKEN } = LOCALSTORAGE_ITEMS;

const validAccessToken = 'access_eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1';
const validRefreshToken = 'refresh_eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1';

const validAuthenticateMock = {
  accessToken: validAccessToken,
  refreshToken: validRefreshToken,
  expires_at: 1626950913,
  expires_in: 864000,
  scope: 'scope:all',
  token_type: 'Bearer',
};

describe('DataRobotCallback', () => {
  const renderComponent = ({ history }: { history: any }) => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <DataRobotCallback />
        </Router>
      </Provider>
    );
  };

  afterEach(() => {
    clearLocalstorage();
  });

  test('should redirect to Home when code or state parameters are not present in the url', () => {
    const history = createMemoryHistory();
    history.push('/auth/oauth/dr-callback');
    renderComponent({
      history,
    });
    expect(history.location.pathname).toEqual('/');
  });

  test('should authnticate when code or state parameters are present in the url', async () => {
    // @ts-ignore
    jest.spyOn(api, 'useAuthenticateMutation').mockImplementation(() => [
      () => ({
        unwrap: () => Promise.resolve(validAuthenticateMock),
      }),
      { error: undefined },
    ]);

    const history = createMemoryHistory();
    history.push('/auth/oauth/dr-callback?code=someCode&state=someState');
    renderComponent({
      history,
    });

    await Promise.resolve();

    // Make sure we're redirected to home
    expect(history.location.pathname).toEqual('/');
    // Make sure tokens are saved to localstorage
    expect(getLocalstorage(ACCESS_TOKEN)).toEqual(validAccessToken);
    expect(getLocalstorage(REFRESH_TOKEN)).toEqual(validRefreshToken);
  });

  test('should show error when authentication call failed', async () => {
    // @ts-ignore
    jest.spyOn(api, 'useAuthenticateMutation').mockImplementation(() => [
      () => ({
        unwrap: () => Promise.reject(),
      }),
      { error: 'some error is here' },
    ]);

    const history = createMemoryHistory();
    history.push('/auth/oauth/dr-callback?code=someCode&state=someState');
    renderComponent({
      history,
    });

    await Promise.resolve();

    expect(history.location.pathname).toEqual('/auth/oauth/dr-callback');
    expect(history.location.search).toEqual('?code=someCode&state=someState');
    expect(screen.getByText('Could not authenticate')).toBeInTheDocument();
  });
});
