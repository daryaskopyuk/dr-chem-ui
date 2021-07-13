import { FunctionComponent } from 'react';
import { t } from 'ttag';
import { LoadingIcon } from '@datarobot/design-system/js/loading-icon';

import classes from './Loader.module.scss';

export const Loader: FunctionComponent = () => (
  <div className={classes.loader}>
    <LoadingIcon className={classes.loadingIcon} message={t`Loading...`} />
  </div>
);
