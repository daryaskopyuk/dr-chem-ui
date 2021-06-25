import { FunctionComponent } from 'react';

import Header from 'components/shared/Header/Header';
import './Layouts.css';

type PropsType = {
  children: JSX.Element[] | JSX.Element;
};

const SimplePageLayout: FunctionComponent<PropsType> = ({
  children,
}: PropsType) => (
  <div className="simple-page-layout">
    <div className="header-wrapper">
      <Header />
    </div>
    <div className="main-content-wrapper">{children}</div>
  </div>
);

export default SimplePageLayout;
