import React, { useState } from 'react';

import { useSmilesPredictionMutation } from 'services/applicationApi';

import { SimplePageLayout } from 'components/layouts/SimplePageLayout';
import { Input } from '@datarobot/design-system/js/input';
import { Button, ACCENT_TYPES } from '@datarobot/design-system/js/button';
import StartButton from '../StartButton';

import './PredictionsApp.scss';

export default function PredictionsApp() {
  const [smilesInputs, setSmilesInputs] = useState([0]);
  const [addSmilesPredictionMutation] = useSmilesPredictionMutation();

  const getPredictions = async () => {
    const { content } = await addSmilesPredictionMutation(new URLSearchParams([]).toString()).unwrap();

    console.log(12345, content);
  }

  return (
    <SimplePageLayout>
      <div className="predictions-app">
        <StartButton handleClick={getPredictions} />

        <form className="smiles-form">
          {smilesInputs.map((id, index) => (
            <div className="predictions-app-field">
              <Input
                key={id}
                id="smiles-input"
                label={`SMILES #${index + 1}`}
              />
              {smilesInputs.length > 1 && (
                <Button
                  accentType={ACCENT_TYPES.ROUND_ICON}
                  onClick={() => {
                    setSmilesInputs(current => current.filter((input) => input !== id))
                  }}
                >
                  <i className="fas fa-times" />
                </Button>
              )}
            </div>
          ))}

          <Button
            onClick={() => {
              setSmilesInputs((current) => [...current, current[current.length - 1] + 1])
            }}
            className="margin-top-6"
          >
            Add more SMILES
          </Button>
        </form>
      </div>
    </SimplePageLayout>
  )
}
