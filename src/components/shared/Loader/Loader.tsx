import { FunctionComponent } from 'react';
import useTranslations from 'hooks/useTranslations';
import { LoadingIcon } from '@datarobot/design-system/js/loading-icon';

import classes from './Loader.module.scss';

export const Loader: FunctionComponent = () => {
  const { t } = useTranslations();
  return (
    <div className={classes.loader}>
      <LoadingIcon className={classes.loadingIcon} message={t`Loading...`} />
    </div>
  );
};
