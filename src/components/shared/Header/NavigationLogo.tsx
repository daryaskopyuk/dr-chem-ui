import { FunctionComponent } from 'react';
import { Link } from 'components/shared/Link/Link';
import defaultLogo from 'assets/images/dr-logo-for-dark-bg.svg';

export interface NavigationLogoProps {
  className: string | undefined;
  link: string | null;
  isDisabled: boolean;
  imageUrl: string | null | undefined;
}

export const NavigationLogo: FunctionComponent<NavigationLogoProps> = ({
  className,
  link,
  isDisabled,
  imageUrl,
}: NavigationLogoProps) => {
  const logoHref = isDisabled ? null : link;
  return (
    <Link className={className} to={logoHref || ''} testId="dr-logo">
      <img
        className="dr-logo"
        src={imageUrl || defaultLogo}
        alt="DataRobot Logo"
      />
    </Link>
  );
};
