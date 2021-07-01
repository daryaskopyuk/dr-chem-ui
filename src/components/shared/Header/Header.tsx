import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, ACCENT_TYPES } from '@datarobot/design-system/js/button';
import useCurrentAccount from 'hooks/useCurrentAccount';
import useResponsive from 'hooks/useResponsive';
import { ROUTES } from 'app-constants';
import NavigationLogo from './NavigationLogo';

import './Header.css';

type NavigationItem = {
  key: string;
  name: string;
  link: string;
  isShown: boolean;
};

const defaultHeaderItems: NavigationItem[] = [
  {
    key: 'users',
    name: 'List Users',
    link: ROUTES.PLACEHOLDER_USERS,
    isShown: true,
  },
];

type PropsType = {
  logoLink?: string;
  navItems?: NavigationItem[];
  isLogoDisabled?: boolean;
  logoImageUrl?: string | null | undefined;
};

const Header: FunctionComponent<PropsType> = ({
  logoLink,
  navItems,
  isLogoDisabled,
  logoImageUrl,
}: PropsType) => {
  const history = useHistory();
  const { isMobile } = useResponsive();
  const { isSignedIn } = useCurrentAccount();

  return (
    <div className="header-container">
      <NavigationLogo
        link={logoLink || ''}
        isDisabled={isLogoDisabled || false}
        imageUrl={logoImageUrl}
      />
      {!isMobile && (
        <div className="child-tabs-container">
          {navItems?.length
            ? navItems.map((item) =>
                item.isShown ? (
                  <a
                    key={item.key}
                    href={item.link}
                    className="navigation-option"
                  >
                    {item.name}
                  </a>
                ) : null
              )
            : null}
        </div>
      )}

      {isSignedIn ? (
        <div className="side-menu">Menu</div>
      ) : (
        <div className="side-menu">
          <Button
            accentType={ACCENT_TYPES.SECONDARY}
            onClick={() => {
              history.push(ROUTES.LOGIN);
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              history.push(ROUTES.REGISTER);
            }}
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
};

Header.defaultProps = {
  isLogoDisabled: false,
  logoImageUrl: null,
  navItems: defaultHeaderItems,
  logoLink: ROUTES.HOME,
};

export default Header;
