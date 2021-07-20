export const PROPERTIES_KEYS = {
  LOG_P: 'logP',
  T_PCA: 'tPSA',
  QED: 'QED',
};

export function limitPrecision(number, precision) {
  // we parseFloat the second time to prevent 100 from becoming e.g. 100.0000
  return parseFloat(parseFloat(number).toFixed(precision));
}
