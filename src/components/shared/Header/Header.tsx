import { FunctionComponent, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, ACCENT_TYPES } from '@datarobot/design-system/js/button';
import { Link } from 'components/shared/Link/Link';
import useCurrentUser from 'hooks/useCurrentUser';
import useResponsive from 'hooks/useResponsive';
import useTranslations from 'hooks/useTranslations';
import { ROUTES } from 'app-constants';

import { ReactComponent as MenuIcon } from 'assets/images/hamburger.svg';
import { Drawer } from 'components/shared/Drawer/Drawer';
import { NavigationLogo } from './NavigationLogo';

import classes from './Header.module.scss';

type NavigationItem = {
  key: string;
  name: string;
  link: string;
  isShown: boolean;
};

export interface HeaderProps {
  logoLink?: string;
  isLogoDisabled?: boolean;
  logoImageUrl?: string | null | undefined;
  hideAuthButtons?: boolean;
  testId?: string;
}

export const Header: FunctionComponent<HeaderProps> = ({
  logoLink,
  isLogoDisabled,
  logoImageUrl,
  hideAuthButtons,
  testId,
}: HeaderProps) => {
  const history = useHistory();
  const { isMobile } = useResponsive();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isSignedIn, logOutUser } = useCurrentUser();
  const { t } = useTranslations();

  const navItems: NavigationItem[] = useMemo(
    () => [
      {
        key: 'asteroids',
        name: t`Asteroids`,
        link: ROUTES.ASTEROIDS,
        isShown: true,
      },
      {
        key: 'astronauts',
        name: t`Astronauts`,
        link: ROUTES.ASTRONAUTS,
        isShown: true,
      },
    ],
    [t]
  );

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
            {t`Login`}
          </Button>
        )
      ) : (
        <Button
          className={classes.avatar}
          accentType={ACCENT_TYPES.COMMAND}
          onClick={logOutUser}
        >
          {t`Log Out`}
        </Button>
      ),
    [logOutUser, history, isSignedIn, hideAuthButtons, t]
  );

  return (
    <div className={classes.headerContainer} test-id={testId}>
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
  logoLink: ROUTES.HOME,
  hideAuthButtons: false,
  testId: 'main-header',
};
