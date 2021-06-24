import User from 'interfaces/user';

const useCurrentAccount = () => {
  // TODO fetch stuff from state here
  const user: User = {
    id: 100,
    email: 'johndoe@datarobot.com',
    name: 'John Doe',
  };

  const isSignedIn = true;

  return {
    user: isSignedIn ? user : null,
    isSignedIn,
  };
};

export default useCurrentAccount;
