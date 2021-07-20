import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'app-constants';

import { Card } from '@datarobot/design-system/js/card';
import { Button } from '@datarobot/design-system/js/button';

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
    link: ROUTES.DE_NOVO_APP,
  },
  {
    key: 'predictions-app',
    title: 'Chem Predictions App',
    description: 'Chem Predictions App description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi turpis, porta ut eros tincidunt, pulvinar ullamcorper urna.',
    IconComponent: ChemIconPredictions,
    link: ROUTES.CHEM_PREDICTIONS,
  }
];

export default function DrChem() {
  return (
    <SimplePageLayout>
      <div className="dr-chem-main">
        <div className="app-cards-container">
          {APP_CARDS.map(({ key, title, description, IconComponent, link}) => (
            <Card key={key} cardClassName="app-card">
              <IconComponent className="app-icon" />
              <h3 className="view-header">{title}</h3>
              <p className="sub-text">{description}</p>
              <Button>
                <Link to={link}>
                  Explore
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </SimplePageLayout>
  )
}
