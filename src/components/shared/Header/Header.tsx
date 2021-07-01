import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, ACCENT_TYPES } from '@datarobot/design-system/js/button';
import useCurrentAccount from 'hooks/useCurrentAccount';
import useResponsive from 'hooks/useResponsive';
import { ROUTES } from 'app-constants';
import NavigationLogo from './NavigationLogo';

import classes from './Header.module.scss';

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
  hideSideMenu?: boolean;
};

const Header: FunctionComponent<PropsType> = ({
  logoLink,
  navItems,
  isLogoDisabled,
  logoImageUrl,
  hideSideMenu,
}: PropsType) => {
  const history = useHistory();
  const { isMobile } = useResponsive();
  const { isSignedIn } = useCurrentAccount();

  return (
    <div className={classes.headerContainer}>
      <NavigationLogo
        className={classes.navigationLogo}
        link={logoLink || ''}
        isDisabled={isLogoDisabled || false}
        imageUrl={logoImageUrl}
      />
      {!isMobile && (
        <div className={classes.childTabsContainer}>
          {navItems?.length
            ? navItems.map((item) =>
                item.isShown ? (
                  <a
                    key={item.key}
                    href={item.link}
                    className={classes.navigationOption}
                  >
                    {item.name}
                  </a>
                ) : null
              )
            : null}
        </div>
      )}

      {!hideSideMenu &&
        (isSignedIn ? (
          <div className={classes.sideMenu}>Menu</div>
        ) : (
          <div className={classes.sideMenu}>
            <Button
              accentType={ACCENT_TYPES.SECONDARY}
              onClick={() => {
                history.push(ROUTES.LOGIN);
              }}
            >
              Login
            </Button>
          </div>
        ))}
    </div>
  );
};

Header.defaultProps = {
  isLogoDisabled: false,
  logoImageUrl: null,
  navItems: defaultHeaderItems,
  logoLink: ROUTES.HOME,
  hideSideMenu: false,
};

export default Header;
