import React from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'app-constants';

import { Card } from '@datarobot/design-system/js/card';
import { Button, ACCENT_TYPES } from '@datarobot/design-system/js/button';

import { SimplePageLayout } from 'components/layouts/SimplePageLayout';
import { ReactComponent as ChemIcon } from 'assets/images/chemistry.svg';
import { ReactComponent as ChemIconPredictions } from 'assets/images/chemistry-2.svg';
import { ReactComponent as PillsIcon } from 'assets/images/pills.svg';
import { ReactComponent as TargetIcon } from 'assets/images/target.svg';
import { ReactComponent as AtomIcon } from 'assets/images/atom.svg';
import { ReactComponent as ChemPlanning } from 'assets/images/chem-planning.svg';

import './DrChem.scss';

const APP_CARDS = [
  {
    key: 'de-novo',
    title: 'De Novo App',
    description: 'De Novo App description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi turpis, porta ut eros tincidunt, pulvinar ullamcorper urna.',
    IconComponent: ChemIcon,
    link: ROUTES.DE_NOVO_APP,
    enabled: true,
  },
  {
    key: 'predictions-app',
    title: 'Chem Predictions App',
    description: 'Chem Predictions App description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi turpis, porta ut eros tincidunt, pulvinar ullamcorper urna.',
    IconComponent: ChemIconPredictions,
    link: ROUTES.CHEM_PREDICTIONS,
    enabled: true,
  },
  {
    key: 'drug-repurposing',
    title: 'Drug Repurposing',
    description: 'Identifying new therapeutic use(s) for old/existing/available drugs.',
    IconComponent: PillsIcon,
    enabled: false,
  },
  {
    key: 'target-identification',
    title: 'Target Identification',
    description: 'Identifying the direct molecular target of a drug/pharmaceutical or other xenobiotic.',
    IconComponent: TargetIcon,
    enabled: false,
  },
  {
    key: 'quantum-mechanics',
    title: 'Quantum Mechanics & Molecular Mechanics',
    description: 'Quantum Mechanics & Molecular Mechanics.',
    IconComponent: AtomIcon,
    enabled: false,
  },
  {
    key: 'chemical-synthesis ',
    title: 'Chemical Synthesis Planning',
    description: 'Determining how to synthesize a chemical compound from available starting materials.',
    IconComponent: ChemPlanning,
    enabled: false,
  }
];

export default function DrChem() {
  const history = useHistory();

  return (
    <SimplePageLayout>
      <div className="dr-chem-main">
        <div className="app-cards-container">
          {APP_CARDS.map(({ key, title, description, IconComponent, enabled, link}) => (
            <Card key={key} cardClassName={classNames("app-card", {
              disabled: !enabled,
            })}>
              <IconComponent className="app-icon" />
              <h3 className="view-header">{title}</h3>
              <p className="sub-text">{description}</p>
              {enabled ? (
                <Button onClick={() => {
                  history.push(link)
                }}>
                  Explore
                </Button>
              ) : (
                <Button accentType={ACCENT_TYPES.SECONDARY}>
                  Coming Soon
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </SimplePageLayout>
  )
}
