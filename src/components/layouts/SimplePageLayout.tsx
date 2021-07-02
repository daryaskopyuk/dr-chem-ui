import { FunctionComponent } from 'react';

import Header from 'components/shared/Header/Header';

import classes from './Layouts.module.scss';

type PropsType = {
  children: JSX.Element[] | JSX.Element | string;
  hideHeaderSideMenu?: boolean;
};

const SimplePageLayout: FunctionComponent<PropsType> = ({
  children,
  hideHeaderSideMenu,
}: PropsType) => (
  <div className={classes.simplePageLayout}>
    <div className={classes.headerWrapper}>
      <Header hideAuthButtons={hideHeaderSideMenu} />
    </div>
    <div className={classes.mainContentWrapper}>{children}</div>
  </div>
);

SimplePageLayout.defaultProps = {
  hideHeaderSideMenu: false,
};

export default SimplePageLayout;
