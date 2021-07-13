import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/store';

import useCurrentUser from 'hooks/useCurrentUser';

import { Header } from './Header';

jest.mock('hooks/useCurrentUser');

describe('Header', () => {
  const renderComponent = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    (useCurrentUser as jest.Mock).mockReturnValue({
      isSignedIn: false,
    });
  });

  test('should render header & navigation items', () => {
    renderComponent();
    expect(screen.getByTestId('main-header')).toBeInTheDocument();
    expect(screen.getByText('Asteroids')).toBeInTheDocument();
    expect(screen.getByText('Astronauts')).toBeInTheDocument();
  });

  test('should render Login button', () => {
    renderComponent();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('should render Log Out button', () => {
    // User is logged in
    (useCurrentUser as jest.Mock).mockReturnValue({
      isSignedIn: true,
    });
    renderComponent();
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });
});
