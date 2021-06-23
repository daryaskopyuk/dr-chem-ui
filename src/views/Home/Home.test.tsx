import { render, screen, fireEvent } from '@testing-library/react';

import Home from './Home';

describe('Home', () => {
  beforeAll(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renders CRA header', () => {
    render(<Home />);
    const linkElement = screen.getByText('CRA DataRobot Template');
    expect(linkElement).toBeInTheDocument();
  });

  test('should have default locale equal to "en"', () => {
    render(<Home />);
    const enTabElement = screen.getByTestId('tab-locale-en');

    expect(enTabElement).toHaveAttribute('checked');
  });

  test('should switch locale', () => {
    render(<Home />);
    expect(screen.getByText('CRA DataRobot Template')).toBeInTheDocument();

    const ukTabElement = screen.getByTestId('tab-locale-uk-label');

    fireEvent.click(ukTabElement);

    expect(screen.getByText('Наш репозиторій на GitHub')).toBeInTheDocument();
  });
});
