import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/store';

import { Drawer } from './Drawer';

describe('Drawer', () => {
  const renderComponent = ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: Function;
  }) => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Drawer isOpen={isOpen} onClose={onClose}>
            <>
              <div>Item 1</div>
              <div>Item 2</div>
              <div>Item 3</div>
            </>
          </Drawer>
        </BrowserRouter>
      </Provider>
    );
  };

  test('should render closed drawer', () => {
    renderComponent({ isOpen: false, onClose: () => {} });
    const drawer = screen.getByTestId('side-drawer');
    expect(drawer).toBeInTheDocument();
    expect(drawer).toHaveClass('closed');
  });

  test('should render open drawer', () => {
    renderComponent({ isOpen: true, onClose: () => {} });
    const drawer = screen.getByTestId('side-drawer');
    expect(drawer).toBeInTheDocument();
    expect(drawer).not.toHaveClass('closed');
  });

  test('should render drawer items', () => {
    renderComponent({ isOpen: true, onClose: () => {} });
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  test('should call onClose when close button is clicked', () => {
    const mockClick = jest.fn();
    renderComponent({ isOpen: true, onClose: mockClick });
    fireEvent.click(screen.getByTestId('drawer-close-button'));
    expect(mockClick).toHaveBeenCalled();
  });
});
