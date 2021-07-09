import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/store';

import NoMatch from './NoMatch';

describe('NoMatch', () => {
  test('renders Home link', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NoMatch />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByText('Go to Homepage');
    expect(linkElement).toBeInTheDocument();
  });
});
