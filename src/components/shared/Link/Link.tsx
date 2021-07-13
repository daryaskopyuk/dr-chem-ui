import { FunctionComponent } from 'react';
import { Link as LinkComp } from 'react-router-dom';

export interface LinkProps {
  to: string;
  className?: string;
  children: JSX.Element[] | JSX.Element | string;
  testId?: string;
  onClick?: () => void;
}

export const Link: FunctionComponent<LinkProps> = ({
  to,
  children,
  className,
  testId,
  onClick,
}: LinkProps) => (
  <LinkComp to={to} className={className} test-id={testId} onClick={onClick}>
    {children}
  </LinkComp>
);

Link.defaultProps = {
  className: '',
  testId: '',
  onClick: () => null,
};
