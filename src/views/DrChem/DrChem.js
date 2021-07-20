import React from 'react';

import { Card } from '@datarobot/design-system/js/card';
import { Button, ACCENT_TYPES } from '@datarobot/design-system/js/button';

import { SimplePageLayout } from 'components/layouts/SimplePageLayout';
import { ReactComponent as ChemIcon } from 'assets/images/chemistry.svg';
import { ReactComponent as ChemIconPredictions } from 'assets/images/chemistry-2.svg';

import './DrChem.scss';

const APP_CARDS = [
  {
    key: 'de-novo',
    title: 'De Novo App',
    description: 'De Novo App description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi turpis, porta ut eros tincidunt, pulvinar ullamcorper urna.',
    IconComponent: ChemIcon,
  },
  {
    key: 'predictions-app',
    title: 'Chem Predictions App',
    description: 'Chem Predictions App description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi turpis, porta ut eros tincidunt, pulvinar ullamcorper urna.',
    IconComponent: ChemIconPredictions,
  }
];

export default function DrChem() {
  return (
    <SimplePageLayout>
      <div className="dr-chem-main">
        <div className="app-cards-container">
          {APP_CARDS.map(({ key, title, description, IconComponent}) => (
            <Card key={key} cardClassName="app-card">
              <IconComponent className="app-icon" />
              <h3 className="view-header">{title}</h3>
              <p className="sub-text">{description}</p>
              <Button>
                Explore
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </SimplePageLayout>
  )
}
