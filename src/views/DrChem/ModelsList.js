import React, { useState } from 'react';

import { ReactComponent as PyTorchIcon } from 'assets/images/py-torch.svg';

import { Checkbox } from '@datarobot/design-system/js/checkbox';

import './ModelList.scss';

const MODELS = [
  {
    bpId: '100',
    title: 'Conditional Variational Autoencoder',
    description: 'Convolutional Encoder, Convolutional Decoder',
    ModelIcon: PyTorchIcon,
  },
  {
    bpId: '101',
    title: 'Conditional Variational Autoencoder (GPU)',
    description: 'Convolutional Encoder, GRU Decoder',
    ModelIcon: PyTorchIcon,
  }
];

export default function ModelsList() {
  const [selectedModel, setSelectedModel] = useState(null);

  return (
    <div className='models-list'>
      {MODELS.map(({ bpId, title, description, ModelIcon }) => (
        <div key={bpId} className="model-item">
          <Checkbox id={bpId} isChecked={bpId === selectedModel} onChange={(e) => setSelectedModel(e.target.id)} />
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
  )
}
