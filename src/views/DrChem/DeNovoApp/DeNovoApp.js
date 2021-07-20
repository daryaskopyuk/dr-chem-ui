import React, { useState } from 'react';

import { Input } from '@datarobot/design-system/js/input';

import { SimplePageLayout } from 'components/layouts/SimplePageLayout';

import './DeNovoApp.scss';

const CHEM_PROPERTIES = [
  {
    key: 'logP',
    title: 'Partition Coefficient (logP)',
    description: 'The measure of how hydrophilic or hydrophobic a molecule is',
    placeholder: 'Enter a positive or negative number',
  },
  {
    key: 'tPSA',
    title: 'Topological polar surface area (tPSA, angstroms squared)',
    description: 'The surface sum over all polar atoms or molecules, primarily oxygen and nitrogen, also including their attached hydrogen atoms',
    placeholder: 'Enter a positive number'
  },
  {
    key: 'qed',
    title: 'Drug Likeness (QED)',
    description: 'An integrative score to evaluate compounds\' favorability to become a hit',
    placeholder: 'Enter a number between 0 and 1',
  },
];

// todo - add inputs validation
export default function DeNovoApp() {
  const [propsValues, setPropsValues] = useState({
    logP: null,
    tPSA: null,
    qed: null,
  });

  const handlePropChange = (inputVal, key) => {
    setPropsValues((prevValues) => ({
      ...prevValues,
      [key]: inputVal.normalizedValue,
    }))
  };

  const runModel = () => {
    console.log('propsValues', propsValues);
  }

  return (
    <SimplePageLayout>
      <div className="de-novo-app">
        <button
          className="start-button"
          disabled={Object.values(propsValues).every((val) => val !== 0 && !val)}
          onClick={runModel}
        >
          <span className="separator">
            <span className="start-label">Start</span>
          </span>
        </button>
        <form className="props-form">
          {CHEM_PROPERTIES.map(({ key, title, description, placeholder }) => (
            <Input
              key={key}
              id={key}
              label={title}
              helperText={description}
              placeholder={placeholder}
              onChange={(e, value) => handlePropChange(value, key)}
            />
          ))}
        </form>
      </div>
    </SimplePageLayout>
  )
}
