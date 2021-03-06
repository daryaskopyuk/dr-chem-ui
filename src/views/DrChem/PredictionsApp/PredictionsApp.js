import React, { useState } from 'react';
import classNames from 'classnames';

import { useSmilesPredictionMutation } from 'services/applicationApi';
import { useAppSelector } from 'store/store';

import { SimplePageLayout } from 'components/layouts/SimplePageLayout';
import { Input } from '@datarobot/design-system/js/input';
import { Button, ACCENT_TYPES } from '@datarobot/design-system/js/button';
import StartButton from '../StartButton';
import MoleculesTable from '../MoleculesTable';
import FakeProgressBar from '../FakeProgressBar';

import './PredictionsApp.scss';

export default function PredictionsApp() {
  const selectedModel = useAppSelector((state) => state.currentModel);

  const [smilesInputs, setSmilesInputs] = useState([{ id: 0, value: ''}]);
  const [moleculesData, setMoleculesData] = useState([]);
  const [addSmilesPredictionMutation, { isLoading, isSuccess, isError }] = useSmilesPredictionMutation();

  const smilesTruthyValues = smilesInputs.map((input) => input.value).filter(val => val);

  const getPredictions = async () => {
    setMoleculesData([]);
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
        <h2 className="app-title">Chem Predictions App</h2>
        <div className={classNames("predictions-request-block", {
          loading: isLoading,
        })}>
          <StartButton
            handleClick={getPredictions}
            isDisabled={smilesTruthyValues.length === 0}
            selectedModel={selectedModel}
          />

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

            <p className="message info">Add one or more SMILES strings</p>

            <Button
              onClick={addInput}
              className="margin-top-6"
            >
              Add more SMILES
            </Button>
          </form>
        </div>

        <div className="loading-container">
          <FakeProgressBar
            progressLabel="Chem predictions are calculating"
            isSuccess={isSuccess}
            isLoading={isLoading}
            isError={isError}
          />
        </div>

        {moleculesData.length > 0 && (
          <MoleculesTable moleculesData={moleculesData} />
        )}
      </div>
    </SimplePageLayout>
  )
}
