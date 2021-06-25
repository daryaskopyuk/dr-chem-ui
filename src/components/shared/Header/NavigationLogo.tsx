import { FunctionComponent } from 'react';
import { Tooltip } from '@datarobot/design-system/js/tooltip';
import defaultLogo from 'assets/images/dr-logo-for-dark-bg.svg';

type PropsType = {
  link: string | null;
  isDisabled: boolean;
  imageUrl: string | null | undefined;
};

const NavigationLogo: FunctionComponent<PropsType> = ({
  link,
  isDisabled,
  imageUrl,
}: PropsType) => {
  const logoHref = isDisabled ? null : link;
  return (
    <Tooltip placement="bottom">
      <a
        className="navigation-logo"
        test-id="navigation-logo"
        href={logoHref || ''}
      >
        <img
          className="dr-logo"
          src={imageUrl || defaultLogo}
          alt="DataRobot Logo"
        />
      </a>
    </Tooltip>
  );
};

export default NavigationLogo;
