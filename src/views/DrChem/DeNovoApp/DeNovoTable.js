import React from 'react';
import { Table } from '@datarobot/design-system/js/table';

const IndexCell = ({ index }) => <span>{index + 1}</span>;

export default function DeNovoTable() {
  const tableColumns = [
    {
      accessor: 'rowIndex',
      header: '#',
      cell: IndexCell,
    },
    {
      accessor: 'smiles',
      header: 'SMILE',
    },
    {
      accessor: 'image',
      header: 'Image',
    },
    {
      accessor: 'logP',
      header: 'logP',
    },
    {
      accessor: 'tPSA',
      header: 'tPSA',
    },
    {
      accessor: 'qed',
      header: 'QED',
    },
  ];

  return (
    <Table
      columns={tableColumns}
      data={[]}
    />
  )
}
