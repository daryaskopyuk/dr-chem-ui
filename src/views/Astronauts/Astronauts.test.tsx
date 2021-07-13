import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/store';

import * as api from 'services/astronautsApi';

import Astronauts from './Astronauts';

const mockResponseByName = [
  {
    id: 9,
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
    address: {
      street: 'Dayna Park',
      suite: 'Suite 449',
      city: 'Bartholomebury',
      zipcode: '76495-3109',
      geo: {
        lat: '24.6463',
        lng: '-168.8889',
      },
    },
    phone: '(775)976-6794 x41206',
    website: 'conrad.com',
    company: {
      name: 'Yost and Sons',
      catchPhrase: 'Switchable contextually-based project',
      bs: 'aggregate real-time technologies',
    },
  },
];

const mockResponseById = [
  {
    id: 7,
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
    address: {
      street: 'Rex Trail',
      suite: 'Suite 280',
      city: 'Howemouth',
      zipcode: '58804-1099',
      geo: {
        lat: '24.8918',
        lng: '21.8984',
      },
    },
    phone: '210.067.6132',
    website: 'elvis.io',
    company: {
      name: 'Johns Group',
      catchPhrase: 'Configurable multimedia task-force',
      bs: 'generate enterprise e-tailers',
    },
  },
];

const mockAllResponse = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: '-43.9509',
        lng: '-34.4618',
      },
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
    address: {
      street: 'Rex Trail',
      suite: 'Suite 280',
      city: 'Howemouth',
      zipcode: '58804-1099',
      geo: {
        lat: '24.8918',
        lng: '21.8984',
      },
    },
    phone: '210.067.6132',
    website: 'elvis.io',
    company: {
      name: 'Johns Group',
      catchPhrase: 'Configurable multimedia task-force',
      bs: 'generate enterprise e-tailers',
    },
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
    address: {
      street: 'Dayna Park',
      suite: 'Suite 449',
      city: 'Bartholomebury',
      zipcode: '76495-3109',
      geo: {
        lat: '24.6463',
        lng: '-168.8889',
      },
    },
    phone: '(775)976-6794 x41206',
    website: 'conrad.com',
    company: {
      name: 'Yost and Sons',
      catchPhrase: 'Switchable contextually-based project',
      bs: 'aggregate real-time technologies',
    },
  },
];

describe('Astronauts', () => {
  const renderPage = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Astronauts />
        </BrowserRouter>
      </Provider>
    );
  };

  test('should render loader while data is being loaded', () => {
    jest
      .spyOn(api, 'useGetUsersQuery')
      .mockImplementation(() => ({ isLoading: true, refetch: () => {} }));
    renderPage();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('should render all astronauts by default', () => {
    jest.spyOn(api, 'useGetUsersQuery').mockImplementation(() => ({
      isLoading: false,
      refetch: () => {},
      data: mockAllResponse,
    }));
    renderPage();

    expect(screen.getByText(/Leanne Graham/)).toBeInTheDocument();
    expect(screen.getByText(/Ervin Howell/)).toBeInTheDocument();
    expect(screen.getByText(/Kurtis Weissnat/)).toBeInTheDocument();
  });

  test('should render astronaut by id = 7', () => {
    jest.spyOn(api, 'useGetUsersQuery').mockImplementation(() => ({
      isLoading: false,
      refetch: () => {},
      data: mockAllResponse,
    }));
    jest.spyOn(api, 'useGetUsersByIdQuery').mockImplementation(() => ({
      isLoading: false,
      refetch: () => {},
      data: mockResponseById,
    }));
    renderPage();

    fireEvent.click(screen.getByTestId('tab-users-id'));
    expect(screen.queryByText(/Leanne Graham/)).toBeNull();
    expect(screen.queryByText(/Ervin Howell/)).toBeNull();
    expect(screen.getByText(/Kurtis Weissnat/)).toBeInTheDocument();
  });

  test('should show astronauts by id = 7', () => {
    jest.spyOn(api, 'useGetUsersQuery').mockImplementation(() => ({
      isLoading: false,
      refetch: () => {},
      data: mockAllResponse,
    }));
    jest.spyOn(api, 'useGetUsersByIdQuery').mockImplementation(() => ({
      isLoading: false,
      refetch: () => {},
      data: mockResponseById,
    }));
    renderPage();

    fireEvent.click(screen.getByTestId('tab-users-id'));
    expect(screen.queryByText(/Leanne Graham/)).toBeNull();
    expect(screen.queryByText(/Ervin Howell/)).toBeNull();
    expect(screen.getByText(/Kurtis Weissnat/)).toBeInTheDocument();
  });

  test('should show astronauts by name', () => {
    jest.spyOn(api, 'useGetUsersQuery').mockImplementation(() => ({
      isLoading: false,
      refetch: () => {},
      data: mockAllResponse,
    }));
    jest.spyOn(api, 'useGetUsersByUsernameQuery').mockImplementation(() => ({
      isLoading: false,
      refetch: () => {},
      data: mockResponseByName,
    }));
    renderPage();

    fireEvent.click(screen.getByTestId('tab-users-username'));
    expect(screen.queryByText(/Leanne Graham/)).toBeNull();
    expect(screen.queryByText(/Ervin Howell/)).toBeNull();
    expect(screen.queryByText(/Kurtis Weissnat/)).toBeNull();
    expect(screen.getByText(/Glenna Reichert/)).toBeInTheDocument();
  });
});
