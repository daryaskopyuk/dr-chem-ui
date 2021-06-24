import { FunctionComponent, useState } from 'react';

import { useGetUsersByUsernameQuery } from '../../services/placeholderApi/users';

const ById: FunctionComponent = () => {
  const [username] = useState<string>('Delphine');

  // Using a query hook automatically fetches data and returns query values
  const { isLoading, error, data } = useGetUsersByUsernameQuery(username);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      Users by Username:
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ById;
