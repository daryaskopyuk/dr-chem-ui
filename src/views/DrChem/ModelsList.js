import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'app-constants';
import { useAppDispatch, useAppSelector } from 'store/store';
import { setCurrentModel } from 'store/currentModel';

import { SimplePageLayout } from 'components/layouts/SimplePageLayout';
import { Checkbox } from '@datarobot/design-system/js/checkbox';
import { Button } from '@datarobot/design-system/js/button';

import { MODELS } from './constants';

import './ModelList.scss';

export default function ModelsList() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const selectedModel = useAppSelector((state) => state.currentModel);

  const handleSelectedModel = (selectedId) => {
    dispatch(setCurrentModel(selectedId))
  }

  return (
    <SimplePageLayout customClass="models-list-layout">
      <h1 className="section-header">Select the task you wish to run</h1>
      <div className='models-list'>
        {MODELS.map(({ bpId, title, description, ModelIcon }) => (
          <div key={bpId} className="model-item">
            <Checkbox id={bpId} isChecked={bpId === selectedModel} onChange={(e) => handleSelectedModel(e.target.id)} />
            <div className="model-info">
              <div className="small-header">
                <ModelIcon className="model-icon" />
                <span>{title}</span>
              </div>
              <div className='small-subtext margin-bottom-2'>{description}</div>
              <div className="model-badge-tray">
                <div className="model-badge-tray-item">
                  {`BP${bpId}`}
                </div>
                <div className="model-badge-tray-item">
                  Datarobot
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button isDisabled={!selectedModel} onClick={() => {
        history.push(ROUTES.DE_NOVO_APP)
      }}>
        Select Chem Properties
      </Button>
    </SimplePageLayout>
  )
}
