import { ReactComponent as PyTorchIcon } from 'assets/images/py-torch.svg';

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
  }
];
