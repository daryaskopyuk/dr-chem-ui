import React, { useState } from 'react';
import { Table, withExpandableContent } from '@datarobot/design-system/js/table';

import View3D from './View3D';

import { PROPERTIES_KEYS, limitPrecision } from './de-novo-helpers';

const IMAGE_DIMENSION = 100;

const IndexCell = ({ index }) => <span>{index + 1}</span>;

const ImageCell = ({ value }) => {
  return <img src={`data:image/png;base64, ${value}`} width={IMAGE_DIMENSION} height={IMAGE_DIMENSION} />
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

const Representation2D = () => {
  return (
    <div>2222</div>
  )
}

const TABLE_TABS = [
  {
    key: 'representation3d',
    value: '3D Representation',
    id: '3d-representation',
    component: View3D,
  },
  {
    key: 'representation2d',
    value: '2D Representation',
    id: '2d-representation',
    component: Representation2D,
  }
];

function fotmatMoleculesDataForTable(moleculesData) {
  const getProperty = (molecule, propertyName) => {
    const val = molecule.properties.find((p) => p.name === PROPERTIES_KEYS.LOG_P).value

    return limitPrecision(val, 4);
  }
  return moleculesData.map(({ molecule }) => {
    return {
      id: molecule.smiles,
      smiles: molecule.smiles,
      image: molecule.graph,
      [PROPERTIES_KEYS.LOG_P]: getProperty(molecule, PROPERTIES_KEYS.LOG_P),
      [PROPERTIES_KEYS.T_PCA]: getProperty(molecule, PROPERTIES_KEYS.T_PCA),
      [PROPERTIES_KEYS.QED]: getProperty(molecule, PROPERTIES_KEYS.QED),
    }
  });
}

const DeNovoTableWithTabs = withExpandableContent(Table);

export default function DeNovoTable({ moleculesData }) {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const tableData = fotmatMoleculesDataForTable(moleculesData);

  return (
    <DeNovoTableWithTabs
      columns={tableColumns}
      data={tableData}
      tabs={TABLE_TABS}
      selectedTableRowId={selectedRowId}
      onTableRowSelected={setSelectedRowId}
    />
  )
}
