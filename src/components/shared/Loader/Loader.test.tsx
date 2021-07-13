import { render, screen } from '@testing-library/react';

import { Loader } from './Loader';

describe('Loader', () => {
  test('should render loader text', () => {
    render(<Loader />);
    const linkElement = screen.getByText('Loading...');
    expect(linkElement).toBeInTheDocument();
  });
});
