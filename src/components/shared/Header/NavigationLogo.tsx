import { FunctionComponent } from 'react';
import Link from 'components/shared/Link/Link';
import defaultLogo from 'assets/images/dr-logo-for-dark-bg.svg';

type PropsType = {
  className: string | undefined;
  link: string | null;
  isDisabled: boolean;
  imageUrl: string | null | undefined;
};

const NavigationLogo: FunctionComponent<PropsType> = ({
  className,
  link,
  isDisabled,
  imageUrl,
}: PropsType) => {
  const logoHref = isDisabled ? null : link;
  return (
    <Link className={className} to={logoHref || ''}>
      <img
        className="dr-logo"
        src={imageUrl || defaultLogo}
        alt="DataRobot Logo"
      />
    </Link>
  );
};

export default NavigationLogo;
