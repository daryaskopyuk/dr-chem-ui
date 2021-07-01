import { FunctionComponent } from 'react';
import { Link as LinkComp } from 'react-router-dom';

type PropsType = {
  to: string;
  className?: string;
  children: JSX.Element[] | JSX.Element | string;
};

const Link: FunctionComponent<PropsType> = ({
  to,
  children,
  className,
}: PropsType) => (
  <LinkComp to={to} className={className}>
    {children}
  </LinkComp>
);

Link.defaultProps = {
  className: '',
};

export default Link;
