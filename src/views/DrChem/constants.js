import { ReactComponent as PyTorchIcon } from 'assets/images/py-torch.svg';

export const DE_NOVO_APP_KEY = 'de-novo';
export const PREDICTIONS_APP_KEY = 'predictions-app';

export const MODELS = [
  {
    bpId: '100',
    title: 'Conditional Variational Autoencoder',
    description: 'Convolutional Encoder, Convolutional Decoder',
    ModelIcon: PyTorchIcon,
  },
  {
    bpId: '101',
    title: 'Conditional Variational Autoencoder (GRU)',
    description: 'Convolutional Encoder, GRU Decoder',
    ModelIcon: PyTorchIcon,
  },
  {
    bpId: '102',
    title: 'Graph Convolutional Network with Duvenaud SMILES Featurization',
    ModelIcon: PyTorchIcon,
  }
];
