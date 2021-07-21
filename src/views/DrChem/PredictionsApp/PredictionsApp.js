import React, { useState } from 'react';

import { useSmilesPredictionMutation } from 'services/applicationApi';

import { SimplePageLayout } from 'components/layouts/SimplePageLayout';
import { Input } from '@datarobot/design-system/js/input';
import { Button, ACCENT_TYPES } from '@datarobot/design-system/js/button';
import StartButton from '../StartButton';
import MoleculesTable from '../MoleculesTable';
import FakeProgressBar from '../FakeProgressBar';

import './PredictionsApp.scss';

export default function PredictionsApp() {
  const [smilesInputs, setSmilesInputs] = useState([{ id: 0, value: ''}]);
  const [moleculesData, setMoleculesData] = useState([]);
  const [addSmilesPredictionMutation, { isLoading }] = useSmilesPredictionMutation();

  const smilesTruthyValues = smilesInputs.map((input) => input.value).filter(val => val);

  const getPredictions = async () => {
    const { content } = await addSmilesPredictionMutation(JSON.stringify(smilesTruthyValues)).unwrap();

    setMoleculesData(content);
  }

  const handleInputChange = (e, id) => {
    const inputsClone = [...smilesInputs];
    const targetInput = inputsClone.find((input) => input.id === id);

    targetInput.value = e.target.value;

    setSmilesInputs(inputsClone);
  };

  const addInput = () => {
    setSmilesInputs((current) => [...current, { id: current[current.length - 1].id + 1, value: ''}])
  }

  const removeInput = (idToRemove) => {
    setSmilesInputs(current => current.filter((input) => input.id !== idToRemove ))
  }

  return (
    <SimplePageLayout>
      <div className="predictions-app">
        <StartButton handleClick={getPredictions} isDisabled={smilesTruthyValues.length === 0}/>

        <form className="smiles-form">
          {smilesInputs.map((smiles, index) => (
            <div className="predictions-app-field" key={smiles.id}>
              <Input
                id="smiles-input"
                label={`SMILES #${index + 1}`}
                onChange={(e) => handleInputChange(e, smiles.id)}
              />
              {smilesInputs.length > 1 && (
                <Button
                  accentType={ACCENT_TYPES.ROUND_ICON}
                  onClick={() => removeInput(smiles.id)}
                >
                  <i className="fas fa-times" />
                </Button>
              )}
            </div>
          ))}

          <Button
            onClick={addInput}
            className="margin-top-6"
          >
            Add more SMILES
          </Button>
        </form>
        <FakeProgressBar />
      </div>
      <MoleculesTable moleculesData={moleculesData} />
    </SimplePageLayout>
  )
}