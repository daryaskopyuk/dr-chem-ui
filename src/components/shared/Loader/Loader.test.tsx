import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/store';

import { Loader } from './Loader';

describe('Loader', () => {
  test('should render loader text', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Loader />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText('Loading...');
    expect(linkElement).toBeInTheDocument();
  });
});
