import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { t } from 'ttag';
import { Link } from 'react-router-dom';
import { ReactComponent as PowerOutageImage } from 'assets/images/power-outage-image.svg';

import SimplePageLayout from 'components/layouts/SimplePageLayout';

import classes from './NoMatch.module.scss';

const NoMatch: FunctionComponent = () => (
  <SimplePageLayout>
    <div className={classes.noMatchPage}>
      <PowerOutageImage
        test-id="power-outage-image"
        className={classes.powerOutageImage}
      />
      <div className={classes.noMatchPageTexts}>
        <h1
          className={classNames('page-header', classes.errorTitle)}
        >{t`404 Not Found`}</h1>
        <p
          className={classNames('header-navigation', classes.errorDescription)}
        >
          {t`Sorry, but we can't display the page you requested.`}
        </p>
        <Link
          test-id="button-redirect"
          to="/"
          className={classNames('button primary', classes.errorButton)}
        >
          {t`Go to Homepage`}
        </Link>
      </div>
    </div>
  </SimplePageLayout>
);

export default NoMatch;
