import React, { useState } from 'react';
import classNames from 'classnames';

import { Input } from '@datarobot/design-system/js/input';
import { PROPERTIES_KEYS, CHEM_PROPERTIES } from './de-novo-helpers';
import MoleculesTable from '../MoleculesTable';
import StartButton from '../StartButton';
import FakeProgressBar from '../FakeProgressBar';

import { SimplePageLayout } from 'components/layouts/SimplePageLayout';

import { useDeNovoDataMutation } from 'services/applicationApi';

import './DeNovoApp.scss';

export default function DeNovoApp() {
  const [propsValues, setPropsValues] = useState({
    [PROPERTIES_KEYS.LOG_P]: null,
    [PROPERTIES_KEYS.T_PCA]: null,
    [PROPERTIES_KEYS.QED]: null,
  });
  const [addDeNovoMutation, { isLoading, isSuccess, isError, ...props }] = useDeNovoDataMutation();
  const [moleculesData, setMoleculesData] = useState([]);

  const handlePropChange = (inputVal, key) => {
    setPropsValues((prevValues) => ({
      ...prevValues,
      [key]: inputVal.normalizedValue,
    }))
  };

  const runModel = async () => {
    setMoleculesData([]);
    const { content } = await addDeNovoMutation(new URLSearchParams(propsValues).toString()).unwrap();

    setMoleculesData(content);
  }

  return (
    <SimplePageLayout>
      <div className="de-novo-app">
        <h2 className="app-title">De Novo Molecule Design App</h2>
        <div className={classNames('de-novo-request-block', {
          loading: isLoading,
        })}>
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

        <div className="loading-container">
          <FakeProgressBar
            progressLabel="Molecules are calculating"
            isSuccess={isSuccess}
            isLoading={isLoading}
            isError={isError}
          />
        </div>

        {moleculesData.length > 0 && (
          <MoleculesTable moleculesData={moleculesData} />
        )}
      </div>
    </SimplePageLayout>
  )
}
