import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/store';

import * as api from 'services/applicationApi';

import LoginWithDataRobot from './LoginWithDataRobot';

describe('LoginWithDataRobot', () => {
  const assignMock = jest.fn();

  const renderPage = ({ history }: { history: any } = { history: null }) => {
    let historyOverride = history;
    if (!historyOverride) {
      historyOverride = createMemoryHistory();
      historyOverride.push('/auth/login');
    }

    render(
      <Provider store={store}>
        <Router history={historyOverride}>
          <LoginWithDataRobot />
        </Router>
      </Provider>
    );
  };

  afterEach(() => {
    assignMock.mockClear();
  });

  test('should render LoginWithDataRobot page', () => {
    renderPage();

    expect(screen.getByText('Login with DataRobot')).toBeInTheDocument();
  });

  test('should disable login button while fetching authorization URL', () => {
    jest
      .spyOn(api, 'useGetAuthorizeUrlQuery')
      .mockImplementation(() => ({ isLoading: true, refetch: () => {} }));
    renderPage();

    expect(screen.getByTestId('login-button')).toBeDisabled();
  });

  test('should show error if fetching authorization URL failed', () => {
    jest.spyOn(api, 'useGetAuthorizeUrlQuery').mockImplementation(() => ({
      isLoading: false,
      refetch: () => {},
      error: 'some error',
    }));
    renderPage();

    expect(screen.queryByTestId('login-button')).toBeNull();
    expect(
      screen.getByText('Could not fetch DataRobot authentication URL')
    ).toBeInTheDocument();
  });

  test('should redirect authorization URL when login button clicked', () => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { assign: assignMock };

    jest.spyOn(api, 'useGetAuthorizeUrlQuery').mockImplementation(() => ({
      isLoading: false,
      refetch: () => {},
      data: {
        authUrl:
          'https://staging.datarobot.com/oauth/authorize?response_type=code',
      },
    }));
    renderPage();

    const button = screen.getByTestId('login-button');
    expect(button).not.toBeDisabled();
    fireEvent.click(button);
    expect(assignMock).toHaveBeenCalledWith(
      'https://staging.datarobot.com/oauth/authorize?response_type=code&redirect_uri=http://localhost/auth/oauth/dr-callback'
    );
  });
});
