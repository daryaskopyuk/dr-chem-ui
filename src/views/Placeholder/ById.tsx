import { FunctionComponent, useState } from 'react';

import { useGetUsersByIdQuery } from 'services/externalApi';

const ById: FunctionComponent = () => {
  const [id] = useState<number>(7);

  // Using a query hook automatically fetches data and returns query values
  const { isLoading, error, data } = useGetUsersByIdQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      Users by Id:
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ById;
