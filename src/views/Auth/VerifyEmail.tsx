import { FunctionComponent, useEffect, useState } from 'react';
import { t } from 'ttag';

import { useVerifyEmailMutation } from 'services/appApi';
import useSearchParams from 'hooks/useSearchParams';
import useCurrentUser from 'hooks/useCurrentUser';

import SimplePageLayout from 'components/layouts/SimplePageLayout';

import classes from './Auth.module.scss';

interface RouteParams {
  email: string;
  token: string;
}

const VerifyEmail: FunctionComponent = () => {
  const { logInUser } = useCurrentUser();
  const { email, token } = useSearchParams<RouteParams>();

  const [errors, setErrors] = useState<any>(null);

  // TODO: Move this to separate useAuth? hook
  const [verifyEmailMutation, { isLoading }] = useVerifyEmailMutation();
  const verifyEmail = async () => {
    try {
      const { user, tokens } = await verifyEmailMutation({
        email,
        token,
      }).unwrap();
      logInUser(user, tokens);
    } catch (err) {
      const { data } = err;
      setErrors(data);
    }
  };

  useEffect(() => {
    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SimplePageLayout>
      <div className={classes.auth}>
        <div className={classes.authHeader}>
          <h1 className="page-header app-heading">{t`Login`}</h1>
          {isLoading && <p className="view-header">Loading...</p>}
          {errors && <pre>{JSON.stringify(errors, null, 2)}</pre>}
        </div>
      </div>
    </SimplePageLayout>
  );
};

export default VerifyEmail;
