import React, { useState } from 'react';

import { Input } from '@datarobot/design-system/js/input';
import { PROPERTIES_KEYS } from './de-novo-helpers';
import MoleculesTable from '../MoleculesTable';
import StartButton from '../StartButton';

import { SimplePageLayout } from 'components/layouts/SimplePageLayout';

import { useDeNovoDataMutation } from 'services/applicationApi';

import './DeNovoApp.scss';

const CHEM_PROPERTIES = [
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

export default function DeNovoApp() {
  const [propsValues, setPropsValues] = useState({
    [PROPERTIES_KEYS.LOG_P]: null,
    [PROPERTIES_KEYS.T_PCA]: null,
    [PROPERTIES_KEYS.QED]: null,
  });
  const [addDeNovoMutation] = useDeNovoDataMutation();
  const [moleculesData, setMoleculesData] = useState([]);

  const handlePropChange = (inputVal, key) => {
    setPropsValues((prevValues) => ({
      ...prevValues,
      [key]: inputVal.normalizedValue,
    }))
  };

  const runModel = async () => {
    const { content } = await addDeNovoMutation(new URLSearchParams(propsValues).toString()).unwrap();

    setMoleculesData(content);
  }

  return (
    <SimplePageLayout>
      <div className="de-novo-app">
        <StartButton handleClick={runModel} />
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
      <MoleculesTable moleculesData={moleculesData} />
    </SimplePageLayout>
  )
}
