import React, { useState } from 'react';
import { DropdownMenu } from '@datarobot/design-system/js/dropdown-menu';

import { CHEM_PROPERTIES, PROPERTIES_KEYS } from './de-novo-helpers';

import './View2D.scss';

const RAW_KEY = 'raw';
const b64Str = 'data:image/png;base64,';

export default function View2D({ representation2d }) {
  const [selectedProperty, setSelectedProperty] = useState(RAW_KEY);

  const dropdownOptions = [...CHEM_PROPERTIES];

  dropdownOptions.unshift({
    key: RAW_KEY,
    title: 'Raw image'
  });

  const getImageString = () => {
    if (selectedProperty === RAW_KEY) {
      return `${b64Str} ${representation2d.image}`
    }

    const insightData = representation2d.graphWithInsights?.find((el) => el.property === selectedProperty);

    return `${b64Str} ${insightData?.graph}`
  };

  return (
    <div className="view-2d">
      <DropdownMenu
        options={dropdownOptions}
        labelText="Select insights property:"
        selectedKey={selectedProperty}
        onSelect={({ key }) => setSelectedProperty(key)}
        triggerClassName="chem-props-trigger"
      />
      <div className="view-2d-wrap">
        <img src={getImageString()}  />
      </div>
    </div>
  )
}
