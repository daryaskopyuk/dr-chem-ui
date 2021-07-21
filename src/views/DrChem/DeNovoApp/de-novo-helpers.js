export const PROPERTIES_KEYS = {
  LOG_P: 'logP',
  T_PCA: 'tPSA',
  QED: 'QED',
};

export function limitPrecision(number, precision) {
  // we parseFloat the second time to prevent 100 from becoming e.g. 100.0000
  return parseFloat(parseFloat(number).toFixed(precision));
}

export const CHEM_PROPERTIES = [
  {
    key: PROPERTIES_KEYS.LOG_P,
    title: 'Partition Coefficient (logP)',
    description: 'The measure of how hydrophilic or hydrophobic a molecule is',
    placeholder: 'Enter a positive or negative number',
  },
  {
    key: PROPERTIES_KEYS.T_PCA,
    title: 'Topological polar surface area (tPSA, angstroms squared)',
    description: 'The surface sum over all polar atoms or molecules, primarily oxygen and nitrogen, also including their attached hydrogen atoms',
    placeholder: 'Enter a positive number'
  },
  {
    key: PROPERTIES_KEYS.QED,
    title: 'Drug Likeness (QED)',
    description: 'An integrative score to evaluate compounds\' favorability to become a hit',
    placeholder: 'Enter a number between 0 and 1',
  },
];
