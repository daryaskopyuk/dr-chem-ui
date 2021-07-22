import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from 'app-constants';
import { useAppDispatch, useAppSelector } from 'store/store';
import { setCurrentModel } from 'store/currentModel';

import { SimplePageLayout } from 'components/layouts/SimplePageLayout';
import { Checkbox } from '@datarobot/design-system/js/checkbox';
import { Button } from '@datarobot/design-system/js/button';

import { MODELS, DE_NOVO_APP_KEY, PREDICTIONS_APP_KEY} from './constants';

const MODEL_IDS = {
  [DE_NOVO_APP_KEY]: ['100', '101'],
  [PREDICTIONS_APP_KEY]: ['102'],
}

const APP_LINKS = {
  [DE_NOVO_APP_KEY]: ROUTES.DE_NOVO_APP,
  [PREDICTIONS_APP_KEY]: ROUTES.CHEM_PREDICTIONS,
}

import './ModelList.scss';

export default function ModelsList() {
  const history = useHistory();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const selectedModel = useAppSelector((state) => state.currentModel);
  const selectedApp = useAppSelector((state) => state.currentApp);
  const appModelsList = MODELS.filter((m) => MODEL_IDS[selectedApp].includes(m.bpId))

  const handleSelectedModel = (selectedId) => {
    dispatch(setCurrentModel(selectedId))
  }

  useEffect(() => {
    handleSelectedModel(null);
  }, [location]);

  return (
    <SimplePageLayout customClass="models-list-layout">
      <h1 className="section-header">Select the task you wish to run</h1>
      <div className='models-list'>
        {appModelsList.map(({ bpId, title, description, ModelIcon }) => (
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
        history.push(APP_LINKS[selectedApp])
      }}>
        Select Model
      </Button>
    </SimplePageLayout>
  )
}
