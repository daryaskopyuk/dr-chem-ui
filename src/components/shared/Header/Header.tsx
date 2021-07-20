import { FunctionComponent, useState, useMemo } from 'react';

import { Link } from 'components/shared/Link/Link';
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
  testId,
}: HeaderProps) => {
  const { isMobile } = useResponsive();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useTranslations();

  const navItems: NavigationItem[] = useMemo(
    () => [
      {
        key: 'dr-chem',
        name: t`DR Chem`,
        link: ROUTES.DR_CHEM,
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

   const authSection = null;

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
