import { FunctionComponent } from 'react';

import { Header } from 'components/shared/Header/Header';

import classes from './Layouts.module.scss';

export interface SimplePageLayoutProps {
  children: JSX.Element[] | JSX.Element | string;
  hideAuthButtons?: boolean;
}

export const SimplePageLayout: FunctionComponent<SimplePageLayoutProps> = ({
  children,
  hideAuthButtons,
}: SimplePageLayoutProps) => (
  <div className={classes.simplePageLayout}>
    <div className={classes.headerWrapper}>
      <Header hideAuthButtons={hideAuthButtons} />
    </div>
    <div className={classes.mainContentWrapper}>{children}</div>
  </div>
);

SimplePageLayout.defaultProps = {
  hideAuthButtons: false,
};
