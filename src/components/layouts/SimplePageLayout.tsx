import { FunctionComponent } from 'react';

import Header from 'components/shared/Header/Header';
import './Layouts.css';

type PropsType = {
  children: JSX.Element[] | JSX.Element;
  hideHeaderSideMenu?: boolean;
};

const SimplePageLayout: FunctionComponent<PropsType> = ({
  children,
  hideHeaderSideMenu,
}: PropsType) => (
  <div className="simple-page-layout">
    <div className="header-wrapper">
      <Header hideSideMenu={hideHeaderSideMenu} />
    </div>
    <div className="main-content-wrapper">{children}</div>
  </div>
);

SimplePageLayout.defaultProps = {
  hideHeaderSideMenu: false,
};

export default SimplePageLayout;
