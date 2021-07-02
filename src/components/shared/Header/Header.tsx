import { FunctionComponent, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, ACCENT_TYPES } from '@datarobot/design-system/js/button';
import Link from 'components/shared/Link/Link';
import useCurrentAccount from 'hooks/useCurrentAccount';
import useResponsive from 'hooks/useResponsive';
import { ROUTES } from 'app-constants';

import { ReactComponent as MenuIcon } from 'assets/images/hamburger.svg';
import Drawer from 'components/shared/Drawer/Drawer';
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
    name: 'Users',
    link: ROUTES.PLACEHOLDER_USERS,
    isShown: true,
  },
  {
    key: 'organizations',
    name: 'Organizations',
    link: ROUTES.PLACEHOLDER_USERS,
    isShown: true,
  },
  {
    key: 'groups',
    name: 'Groups',
    link: ROUTES.PLACEHOLDER_USERS,
    isShown: true,
  },
];

type PropsType = {
  logoLink?: string;
  navItems?: NavigationItem[];
  isLogoDisabled?: boolean;
  logoImageUrl?: string | null | undefined;
  hideAuthButtons?: boolean;
};

const Header: FunctionComponent<PropsType> = ({
  logoLink,
  navItems,
  isLogoDisabled,
  logoImageUrl,
  hideAuthButtons,
}: PropsType) => {
  const history = useHistory();
  const { isMobile } = useResponsive();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isSignedIn } = useCurrentAccount();

  const navitationItems = useMemo(
    () =>
      navItems?.length
        ? navItems.map((item) =>
            item.isShown ? (
              <Link
                key={item.key}
                to={item.link}
                className={classes.navigationOption}
                onClick={() => {
                  setDrawerOpen(false);
                }}
              >
                {item.name}
              </Link>
            ) : null
          )
        : null,
    [navItems]
  );

  const authSection = useMemo(
    () =>
      !isSignedIn ? (
        !hideAuthButtons && (
          <Button
            className={classes.loginButton}
            accentType={ACCENT_TYPES.SECONDARY}
            onClick={() => {
              history.push(ROUTES.LOGIN);
            }}
          >
            Login
          </Button>
        )
      ) : (
        <div className={classes.avatar}>Avatar</div>
      ),
    [history, isSignedIn, hideAuthButtons]
  );

  return (
    <div className={classes.headerContainer}>
      <NavigationLogo
        className={classes.navigationLogo}
        link={logoLink || ''}
        isDisabled={isLogoDisabled || false}
        imageUrl={logoImageUrl}
      />
      {!isMobile && (
        <div className={classes.childTabsContainer}>{navitationItems}</div>
      )}

      {isMobile ? (
        <div className={classes.sideMenu}>
          <MenuIcon
            onClick={() => {
              setDrawerOpen(true);
            }}
          />
          <Drawer
            isOpen={drawerOpen}
            onClose={() => {
              setDrawerOpen(false);
            }}
          >
            <>
              {authSection}
              {navitationItems}
            </>
          </Drawer>
        </div>
      ) : (
        <div className={classes.sideMenu}>{authSection}</div>
      )}
    </div>
  );
};

Header.defaultProps = {
  isLogoDisabled: false,
  logoImageUrl: null,
  navItems: defaultHeaderItems,
  logoLink: ROUTES.HOME,
  hideAuthButtons: false,
};

export default Header;
