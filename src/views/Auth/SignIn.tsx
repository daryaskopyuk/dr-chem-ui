import { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { t } from 'ttag';
import '@datarobot/design-system/styles/tabs.css';

import { ROUTES } from 'app-constants';
import { setLocalstorage } from 'utils/localStore';
import { useSignInMutation } from 'services/supplyExchangeApi';

import './Auth.css';

const SignIn: FunctionComponent = () => {
  const { push } = useHistory();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // TODO: Move this to separate useAuth? hook
  const [signInMutation, { isLoading }] = useSignInMutation();
  const signIn = async () => {
    try {
      const {
        // user,
        tokens: { access, refresh },
      } = await signInMutation({
        email,
        password,
      }).unwrap();
      setLocalstorage('accessToken', access);
      setLocalstorage('refreshToken', refresh);
      // console.log({ user });
      // dispatch(setCredentials(user));
      push(ROUTES.CURRENT_USER);
    } catch (err) {
      // console.log('toast', {
      //   status: 'error',
      //   title: 'Error',
      //   description: 'Oh no, there was an error!',
      //   isClosable: true,
      // });
      // console.log(err);
    }
  };

  return (
    <div className="auth">
      <header className="auth-header">
        <h1 className="page-header app-heading">{t`Sign In`}</h1>
        <form>
          <label htmlFor="email">
            Email:
            <input
              name="email"
              type="email"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
            />
          </label>
          <br />
          <label htmlFor="password">
            Password:
            <input
              name="password"
              type="password"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
          </label>
          <br />
          <button type="button" disabled={isLoading} onClick={signIn}>
            Sign In
          </button>
        </form>
      </header>
    </div>
  );
};

export default SignIn;
