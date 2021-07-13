import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/store';

import { SimplePageLayout } from './SimplePageLayout';

describe('SimplePageLayout', () => {
  const renderComponent = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SimplePageLayout>
            <div>Some page content is here</div>
          </SimplePageLayout>
        </BrowserRouter>
      </Provider>
    );
  };

  test('should render header & page content', () => {
    renderComponent();
    expect(screen.getByTestId('main-header')).toBeInTheDocument();
    expect(screen.getByText('Some page content is here')).toBeInTheDocument();
  });
});
