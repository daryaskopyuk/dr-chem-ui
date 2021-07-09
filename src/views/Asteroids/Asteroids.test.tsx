import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/store';

import * as api from 'services/applicationApi';

import Asteroids from './Asteroids';

const mockApiResponse = {
  element_count: 4,
  links: {
    next: 'http://www.neowsapp.com/rest/v1/feed?start_date=2021-04-21&end_date=2021-04-22&detailed=false&api_key=DEMO_KEY',
    prev: 'http://www.neowsapp.com/rest/v1/feed?start_date=2021-04-19&end_date=2021-04-20&detailed=false&api_key=DEMO_KEY',
    self: 'http://www.neowsapp.com/rest/v1/feed?start_date=2021-04-20&end_date=2021-04-21&detailed=false&api_key=DEMO_KEY',
  },
  near_earth_objects: {
    '2021-04-20': [
      {
        absolute_magnitude_h: 17.83,
        close_approach_data: [
          {
            close_approach_date: '2021-04-20',
            close_approach_date_full: '2021-Apr-20 21:08',
            epoch_date_close_approach: 1618952880000,
            miss_distance: {
              astronomical: '0.2353748878',
              kilometers: '35211581.866368986',
              lunar: '91.5608313542',
              miles: '21879462.4076085668',
            },
            orbiting_body: 'Earth',
            relative_velocity: {
              kilometers_per_hour: '99345.9768262884',
              kilometers_per_second: '27.596104674',
              miles_per_hour: '61729.7265452013',
            },
          },
        ],
        estimated_diameter: {
          feet: {
            estimated_diameter_max: 5296.9397124355,
            estimated_diameter_min: 2368.8634539448,
          },
          kilometers: {
            estimated_diameter_max: 1.6145071727,
            estimated_diameter_min: 0.7220295577,
          },
          meters: {
            estimated_diameter_max: 1614.5071726861,
            estimated_diameter_min: 722.0295576574,
          },
          miles: {
            estimated_diameter_max: 1.0032079364,
            estimated_diameter_min: 0.4486482283,
          },
        },
        id: '2381906',
        is_potentially_hazardous_asteroid: true,
        is_sentry_object: false,
        links: {
          self: 'http://www.neowsapp.com/rest/v1/neo/2381906?api_key=DEMO_KEY',
        },
        name: '381906 (2010 CL19)',
        nasa_jpl_url: 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2381906',
        neo_reference_id: '2381906',
      },
      {
        absolute_magnitude_h: 20.1,
        close_approach_data: [
          {
            close_approach_date: '2021-04-20',
            close_approach_date_full: '2021-Apr-20 11:50',
            epoch_date_close_approach: 1618919400000,
            miss_distance: {
              astronomical: '0.2885315288',
              kilometers: '43163702.136323656',
              lunar: '112.2387647032',
              miles: '26820680.8160162128',
            },
            orbiting_body: 'Earth',
            relative_velocity: {
              kilometers_per_hour: '41425.7175111089',
              kilometers_per_second: '11.5071437531',
              miles_per_hour: '25740.3298612776',
            },
          },
        ],
        estimated_diameter: {
          feet: {
            estimated_diameter_max: 1862.1944587557,
            estimated_diameter_min: 832.7986794202,
          },
          kilometers: {
            estimated_diameter_max: 0.5675968529,
            estimated_diameter_min: 0.2538370294,
          },
          meters: {
            estimated_diameter_max: 567.5968528656,
            estimated_diameter_min: 253.8370293645,
          },
          miles: {
            estimated_diameter_max: 0.3526882241,
            estimated_diameter_min: 0.1577269688,
          },
        },
        id: '2417816',
        is_potentially_hazardous_asteroid: true,
        is_sentry_object: false,
        links: {
          self: 'http://www.neowsapp.com/rest/v1/neo/2417816?api_key=DEMO_KEY',
        },
        name: '417816 (2007 FA)',
        nasa_jpl_url: 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2417816',
        neo_reference_id: '2417816',
      },
    ],
    '2021-04-21': [
      {
        absolute_magnitude_h: 18.72,
        close_approach_data: [
          {
            close_approach_date: '2021-04-21',
            close_approach_date_full: '2021-Apr-21 08:45',
            epoch_date_close_approach: 1618994700000,
            miss_distance: {
              astronomical: '0.2232815722',
              kilometers: '33402447.611371214',
              lunar: '86.8565315858',
              miles: '20755318.5087981932',
            },
            orbiting_body: 'Earth',
            relative_velocity: {
              kilometers_per_hour: '77044.0467620596',
              kilometers_per_second: '21.4011241006',
              miles_per_hour: '47872.1745005697',
            },
          },
        ],
        estimated_diameter: {
          feet: {
            estimated_diameter_max: 3515.8070284658,
            estimated_diameter_min: 1572.3167022842,
          },
          kilometers: {
            estimated_diameter_max: 1.071617948,
            estimated_diameter_min: 0.4792421155,
          },
          meters: {
            estimated_diameter_max: 1071.6179479846,
            estimated_diameter_min: 479.2421155205,
          },
          miles: {
            estimated_diameter_max: 0.665872316,
            estimated_diameter_min: 0.2977871526,
          },
        },
        id: '2417949',
        is_potentially_hazardous_asteroid: true,
        is_sentry_object: false,
        links: {
          self: 'http://www.neowsapp.com/rest/v1/neo/2417949?api_key=DEMO_KEY',
        },
        name: '417949 (2007 TB23)',
        nasa_jpl_url: 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2417949',
        neo_reference_id: '2417949',
      },
      {
        absolute_magnitude_h: 19.07,
        close_approach_data: [
          {
            close_approach_date: '2021-04-21',
            close_approach_date_full: '2021-Apr-21 13:17',
            epoch_date_close_approach: 1619011020000,
            miss_distance: {
              astronomical: '0.2378258287',
              kilometers: '35578237.404504869',
              lunar: '92.5142473643',
              miles: '22107291.5944264322',
            },
            orbiting_body: 'Earth',
            relative_velocity: {
              kilometers_per_hour: '50337.4312041383',
              kilometers_per_second: '13.9826197789',
              miles_per_hour: '31277.7221834825',
            },
          },
        ],
        estimated_diameter: {
          feet: {
            estimated_diameter_max: 2992.4370969065,
            estimated_diameter_min: 1338.258553415,
          },
          kilometers: {
            estimated_diameter_max: 0.912094798,
            estimated_diameter_min: 0.407901194,
          },
          meters: {
            estimated_diameter_max: 912.0947979501,
            estimated_diameter_min: 407.9011940281,
          },
          miles: {
            estimated_diameter_max: 0.5667492567,
            estimated_diameter_min: 0.2534579728,
          },
        },
        id: '2474179',
        is_potentially_hazardous_asteroid: false,
        is_sentry_object: false,
        links: {
          self: 'http://www.neowsapp.com/rest/v1/neo/2474179?api_key=DEMO_KEY',
        },
        name: '474179 (1999 VS6)',
        nasa_jpl_url: 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2474179',
        neo_reference_id: '2474179',
      },
    ],
  },
};

describe('Asteroids', () => {
  const renderPage = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Asteroids />
        </BrowserRouter>
      </Provider>
    );
  };

  test('renders loader while data is being loaded', () => {
    jest
      .spyOn(api, 'useDetectQuery')
      .mockImplementation(() => ({ isLoading: true, refetch: () => {} }));
    renderPage();
    const linkElement = screen.getByText('Loading...');
    expect(linkElement).toBeInTheDocument();
  });

  test('renders error if data failed to load', () => {
    jest.spyOn(api, 'useDetectQuery').mockImplementation(() => ({
      isLoading: false,
      error: 'error',
      refetch: () => {},
    }));
    renderPage();
    const linkElement = screen.getByText('Could not fetch the data');
    expect(linkElement).toBeInTheDocument();
  });

  test('renders data table when data is loaded', () => {
    jest.spyOn(api, 'useDetectQuery').mockImplementation(() => ({
      isLoading: false,
      data: mockApiResponse,
      refetch: () => {},
    }));
    renderPage();

    // Making sure dates are shown
    expect(screen.getByText('2021-04-20:')).toBeInTheDocument();
    expect(screen.getByText('2021-04-21:')).toBeInTheDocument();

    // Making sure asteroids names are shown
    expect(screen.getByText('381906 (2010 CL19)')).toBeInTheDocument();
    expect(screen.getByText('417816 (2007 FA)')).toBeInTheDocument();
    expect(screen.getByText('417949 (2007 TB23)')).toBeInTheDocument();
    expect(screen.getByText('474179 (1999 VS6)')).toBeInTheDocument();
  });
});
