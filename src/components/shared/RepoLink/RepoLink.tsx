import { FunctionComponent } from 'react';
import { t } from 'ttag';

const RepoLink: FunctionComponent = () => (
  <a
    className="home-link bold-label"
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
