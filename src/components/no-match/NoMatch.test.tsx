import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NoMatch from './NoMatch';

describe('NoMatch', () => {
  test('renders Home link', () => {
    render(<MemoryRouter><NoMatch /></MemoryRouter>);
    const linkElement = screen.getByText('Go to Homepage');
    expect(linkElement).toBeInTheDocument();
  });
});
