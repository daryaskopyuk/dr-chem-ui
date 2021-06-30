import { FunctionComponent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { t } from 'ttag';

import { ROUTES } from 'app-constants';
import { setLocalstorage } from 'utils/localStore';
import { useVerifyEmailMutation } from 'services/appApi';
import useSearchParams from 'hooks/useSearchParams';

import SimplePageLayout from 'components/layouts/SimplePageLayout';

import './Auth.css';

interface RouteParams {
  email: string;
  token: string;
}

const VerifyEmail: FunctionComponent = () => {
  const { push } = useHistory();
  const { email, token } = useSearchParams<RouteParams>();

  const [errors, setErrors] = useState<any>(null);

  // TODO: Move this to separate useAuth? hook
  const [verifyEmailMutation, { isLoading }] = useVerifyEmailMutation();
  const verifyEmail = async () => {
    try {
      const {
        // user,
        tokens: { access, refresh },
      } = await verifyEmailMutation({
        email,
        token,
      }).unwrap();
      setLocalstorage('accessToken', access);
      setLocalstorage('refreshToken', refresh);
      push(ROUTES.CURRENT_USER);
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
      <div className="auth">
        <header className="auth-header">
          <h1 className="page-header app-heading">{t`Login`}</h1>
          {isLoading && <p className="view-header">Loading...</p>}
          {errors && <pre>{JSON.stringify(errors, null, 2)}</pre>}
        </header>
      </div>
    </SimplePageLayout>
  );
};

export default VerifyEmail;
