import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { t } from 'ttag';

type PropsType = {
  className: string | undefined;
};

const RepoLink: FunctionComponent<PropsType> = ({ className }: PropsType) => (
  <a
    className={classNames(className, 'bold-label')}
    href="https://github.com/datarobot/cra-template-datarobot"
    target="_blank"
    rel="noopener noreferrer"
    test-id="app-link"
  >
    {t`Our repo on GitHub`}
    <span className="fas fa-external-link-alt margin-left-5" />
  </a>
);

export default RepoLink;
