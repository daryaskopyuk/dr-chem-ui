import React from 'react';
import { Table } from '@datarobot/design-system/js/table';

import { PROPERTIES_KEYS, limitPrecision } from './de-novo-helpers';

const IndexCell = ({ index }) => <span>{index + 1}</span>;

const ImageCell = ({ value }) => {
  return <img src={`data:image/png;base64, ${value}`} width={100} height={100} />
}

const tableColumns = [
  {
    accessor: 'rowIndex',
    header: '#',
    cell: IndexCell,
  },
  {
    accessor: 'smiles',
    header: 'SMILES',
  },
  {
    accessor: 'image',
    header: 'Image',
    cell: ImageCell,
  },
  {
    accessor: PROPERTIES_KEYS.LOG_P,
    header: 'logP',
  },
  {
    accessor: PROPERTIES_KEYS.T_PCA,
    header: 'tPSA',
  },
  {
    accessor: PROPERTIES_KEYS.QED,
    header: 'QED',
  },
];

function fotmatMoleculesDataForTable(moleculesData) {
  const getProperty = (molecule, propertyName) => {
    const val = molecule.properties.find((p) => p.name === PROPERTIES_KEYS.LOG_P).value

    return limitPrecision(val, 4);
  }
  return moleculesData.map(({ molecule }) => {
    return {
      smiles: molecule.smiles,
      image: molecule.graph,
      [PROPERTIES_KEYS.LOG_P]: getProperty(molecule, PROPERTIES_KEYS.LOG_P),
      [PROPERTIES_KEYS.T_PCA]: getProperty(molecule, PROPERTIES_KEYS.T_PCA),
      [PROPERTIES_KEYS.QED]: getProperty(molecule, PROPERTIES_KEYS.QED),
    }
  });
}

export default function DeNovoTable({ moleculesData }) {
  const tableData = fotmatMoleculesDataForTable(moleculesData);
  return (
    <Table
      columns={tableColumns}
      data={tableData}
    />
  )
}
