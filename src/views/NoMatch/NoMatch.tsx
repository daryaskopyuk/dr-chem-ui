import { FunctionComponent } from 'react';
import { t } from 'ttag';
import { Link } from 'react-router-dom';
import { ReactComponent as PowerOutageImage } from 'assets/images/power-outage-image.svg';

import SimplePageLayout from 'components/layouts/SimplePageLayout';

import './NoMatch.css';

const NoMatch: FunctionComponent = () => (
  <SimplePageLayout>
    <div className="no-match-page">
      <PowerOutageImage
        test-id="power-outage-image"
        className="power-outage-image"
      />
      <div className="no-match-page-texts">
        <h1 className="page-header error-title">{t`404 Not Found`}</h1>
        <p className="header-navigation error-description">
          {t`Sorry, but we can't display the page you requested.`}
        </p>
        <Link
          test-id="button-redirect"
          to="/"
          className="error-button button primary"
        >
          {t`Go to Homepage`}
        </Link>
      </div>
    </div>
  </SimplePageLayout>
);

export default NoMatch;
