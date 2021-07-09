import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Link as LinkComp } from './Link';

describe('Link', () => {
  test('should render link text & have href attribute', () => {
    render(
      <BrowserRouter>
        <LinkComp to="/some-place" testId="link-test-id">
          Click me
        </LinkComp>
      </BrowserRouter>
    );
    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(screen.getByTestId('link-test-id')).toHaveAttribute(
      'href',
      '/some-place'
    );
  });

  test('should call onClick when clicked', () => {
    const mockClick = jest.fn();
    render(
      <BrowserRouter>
        <LinkComp onClick={mockClick} to="/some-place" testId="link-test-id">
          Click me
        </LinkComp>
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId('link-test-id'));
    expect(mockClick).toHaveBeenCalled();
  });
});
