import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/store';

import Home from './Home';

describe('Home', () => {
  beforeAll(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renders CRA header', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText('Welcome to UI App Template!');
    expect(linkElement).toBeInTheDocument();
  });

  test('should have default locale equal to "en"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    const enTabElement = screen.getByTestId('tab-locale-en');

    expect(enTabElement).toHaveAttribute('checked');
  });

  test('should switch locale', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Welcome to UI App Template!')).toBeInTheDocument();

    const ukTabElement = screen.getByTestId('tab-locale-uk-label');

    fireEvent.click(ukTabElement);

    expect(screen.getByText('Наш репозиторій на GitLab')).toBeInTheDocument();
  });
});
