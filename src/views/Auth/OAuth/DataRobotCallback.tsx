import { FunctionComponent } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { t } from 'ttag';

import { ROUTES } from 'app-constants';
import SimplePageLayout from 'components/layouts/SimplePageLayout';

import classes from '../Auth.module.scss';

const Callback: FunctionComponent = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const code = params.get('code');
  const state = params.get('state');

  if (!code || !state) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <SimplePageLayout hideHeaderSideMenu>
      <div className={classes.auth}>
        <div className={classes.authHeader}>
          <h1 className="page-header app-heading">{t`Callback Params:`}</h1>
          <pre>Code - {params.get('code')}</pre>
          <pre>State - {params.get('state')}</pre>
        </div>
      </div>
    </SimplePageLayout>
  );
};

export default Callback;
