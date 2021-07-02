import { FunctionComponent } from 'react';
import { Link as LinkComp } from 'react-router-dom';

type PropsType = {
  to: string;
  className?: string;
  children: JSX.Element[] | JSX.Element | string;
  onClick?: () => void;
};

const Link: FunctionComponent<PropsType> = ({
  to,
  children,
  className,
  onClick,
}: PropsType) => (
  <LinkComp to={to} className={className} onClick={onClick}>
    {children}
  </LinkComp>
);

Link.defaultProps = {
  className: '',
  onClick: () => null,
};

export default Link;
