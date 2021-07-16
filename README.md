# Rationale

UI Application Template is boilerplate React app, which was created to help quickly bootstrap new projects in DataRobot. It contains basic functionality typically required for every UI application - simple header, navigation, authentication support etc. Yet, it was designed to be as simple as possible to allow quick adoption.

## Quick Start

Here's a video on how to install and start using UI Application Template - (link video here).

## Installation

To install UI Application Template app, create a new GitLab project using Hackathon 2021 UI App Template as a template.
Then, clone the new repository and `cd` into it in the terminal application.

Execute -

```bash
$ yarn; yarn start
```

This will install all dependencies and start the application in your web browser. Typically, the app will be available at http://localhost:3000.

## Usage

UI Application Template application works best when it's configured and pointed to a backend application created based on [Hackathon 2021 App Template](https://gitlab.solutions.drdev.io/hackathon-2021/hackathon-2021-app-template)

### Programming Language

It's **TypeScript**, but you can use JS if you wish (this will suppress linter errors & warnings). Simply create `*.js`, `*.jsx` files

### Using When Running Locally

If you want to use UI Application Template together with a backend application both running on your local environment, there's no need to configure the UI app. The app is configured to pass all unknown requests to port 5000. And since the backend app bootsrapped from [Hackathon 2021 App Template](https://gitlab.solutions.drdev.io/hackathon-2021/hackathon-2021-app-template) usually runs on port 5000, everything should just work.

However, if you want to point your application to a server running either on some other port or a different host, you should use `REACT_APP_API_URL` env variable in `.env` file located in a root directory of the project. For example -

`.env` file
```js
REACT_APP_API_URL=https://victor-borshak-be-hackathon-boilerplate-staging.sandbox.solutions.drdev.io
```

### Using When Deployed to Stage/Production

In most cases, when deployed to Stage/Production environments, you'll need to use `REACT_APP_API_URL` variable to point the app to the right backend server. Please note that the following conditions must be met when while configuring `REACT_APP_API_URL` variable via GitLab UI -

* the variable should be added in project's `Settings` > `CI/CD` > `Variables` section
* the variable should not be Protected or Masked
* the variable should have `https://` prefix to avoid CORS issues
* the variable should not have a trailing slash

**Important Note** Every time the value of the variable(s) is changed via GitLab UI, it's good to push/merge some code to the repository to trigger pipeline rebuild, which will redeploy the application.

# Quick Features

* [DataRobot Design System](#datarobot-design-system)
* [Modules CSS Styling](#css-modules)
* [Redux Toolkit State Management](#redux-toolkit-state-management)
* [Data Fetching & Caching](#data-fetching-caching)
* [Authenticate with DataRobot](#authenticate-with-datarobot)
* [Public/Protected Routes](#publicprotected-routes)
* [Responsiveness Support](#responsiveness-support)
* [Localizations Support](#localizations-support)

This app was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [CRA DataRobot template](https://github.com/datarobot/cra-template-datarobot). For this reason, it iherits most of their features as well.

### DataRobot Design System

The app includes [DataRobot Design System](https://github.com/datarobot/DataRobot/tree/master/ui-tasks/design-system) package. This package contains a bunch of reusable components and styles, allowing to easily build interfaces having the same look & feel as the main DataRobot web application.

A typical usage of components & styles from DataRobot Design System would look like this -

```js
import { Tabs } from '@datarobot/design-system/js/tabs'; // Import Tabs component from the Design System
import '@datarobot/design-system/styles/tabs.css'; // Import Tabs styles

const tabs = [
  { key: 'all', label: t`All` },
  { key: 'by-id', label: t`By Id` },
  { key: 'by-username', label: t`By Username` },
];

const Astronauts: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

// Render Tabs component
return (
    <Tabs
      options={tabs}
      onSelect={setActiveTab}
      selectedKey={activeTab}
      groupIdentifier="tabs-locale"
      testId="tabs-locale"
    />
  );
}
```

To learn more about DataRobot Design System, click the link above.

### CSS Modules

The app uses CSS Modules approach for styling.

```js
import { FunctionComponent } from 'react';
import { LoadingIcon } from '@datarobot/design-system/js/loading-icon';

import classes from './Loader.module.scss'; // Import css modules stylesheet as styles

// reference as a js object
export const Loader: FunctionComponent = () => (
  <div className={classes.loader}>
    <LoadingIcon className={classes.loadingIcon} message="Loading..." />
  </div>
);
```

### Redux Toolkit State Management

[Redux Toolkit](https://redux-toolkit.js.org/) is used to faciliate state management in the app. [createSlice](https://redux-toolkit.js.org/api/createslice) function is used to generate "slices" of the state. This keeps the app's state implementation short, easy to undestand/extend.

For example, if we wanted to implement a state allowing to update current user's info, we will need to implement -

`store`/`currentUser.ts`
```js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = { name: 'No Name' };
export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    updateCurrentUser: (state, action: PayloadAction<object>) => {
      const newUser = {
        ...state,
        ...action.payload,
      };
      return newUser;
    },
  },
});

export const { updateCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
```

add `currentUser` default export to main store of the app -

`store`/`store.ts`
```js
import { configureStore } from '@reduxjs/toolkit';
import currentUser from './currentUser';

const store = configureStore({
  reducer: {
    // Add currentUser to the top level store
    currentUser,
  },
});

```

select and/or update `currentUser` state in React components -

`SomeComponent.tsx`
```js
import { useAppDispatch, useAppSelector } from 'store/store';
import { setCurrentUser } from 'store/currentUser';

const SomeComponent = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser); // Get current user from the state

  const updateUser = () => {
    // Update user's name
    dispatch(setCurrentUser({
      name: 'John Doe',
    }));
  }

  return (
    <div>
      Hi, {currentUser?.name}
      <button onClick={updateUser}>Update User</button>
    </div>
  )
};

```

To learn more about Redux Toolkit usage, check the following -
* [Getting Started with Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
* [createSlice doc](https://redux-toolkit.js.org/api/createslice)

### Data Fetching & Caching

TO simplify feching data in the application, [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview) is used.

RTK Query doc quoted: "*RTK Query is a powerful data fetching and caching tool. It is designed to simplify common cases for loading data in a web application, eliminating the need to hand-write data fetching & caching logic yourself.*"

RTK Query functionality is quite rich and allows to do many useful things like fetch, cache, track loading state, avoid duplicate requests an so on. You are highly encoraged to get familiar the official documentation (see link above).

However, it's pretty straight forward to use it in the application for the most common use cases. For example, a typical definition of a file describing some APIs for fetch data in the app would look like this -

`astronautsApi.ts`
```js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PlaceholderUser } from 'interfaces/external';

// Please create one Api file per service

const SERVICE_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Define a service using a base URL and expected endpoints
export const astronautsApi = createApi({
  reducerPath: 'astronautsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVICE_BASE_URL,
  }),
  // Define the endpoints of our service
  endpoints: (builder) => ({
    getUsers: builder.query<PlaceholderUser, void>({
      query: () => '/users',
    }),
    getUsersById: builder.query<PlaceholderUser, number>({
      query: (id) => `/users?id=${id}`,
    }),
    getUsersByUsername: builder.query<PlaceholderUser, string>({
      query: (username) => `/users?username=${username}`,
    }),
    addUser: builder.mutation<PlaceholderUser, Partial<PlaceholderUser>>({
      query(body) {
        return {
          url: `/users`,
          method: 'POST',
          body,
        };
      },
    }),
    updateUser: builder.mutation<PlaceholderUser, Partial<PlaceholderUser>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/users/${id}`,
          method: 'PUT',
          body,
        };
      },
    }),
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/users/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components.
// These hooks are auto-generated based on the defined endpoints
export const {
  useGetUsersQuery,
  useGetUsersByIdQuery,
  useGetUsersByUsernameQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = astronautsApi;
```

Now, the exported hooks can be used in the React components which need to fetch the data -

`SomeComponent.tsx`
```js
import { FunctionComponent } from 'react';
import { useGetUsersQuery } from 'services/astronautsApi';

const SomeComponent: FunctionComponent = () => {
  // Using a query hook automatically fetches data and returns query values
  const { isLoading, error, data } = useGetUsersQuery();

  if (isLoading) return 'Loading...';
  if (error) return 'Error :(';

  return (
    <div>
      Data:<pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

`SomeComponent.tsx`
```js
import { FunctionComponent } from 'react';
import { useAddUserMutation } from 'services/astronautsApi';

const SomeComponent: FunctionComponent = () => {
  const [addUserMutation, { isLoading }] = useAddUserMutation();
  const addUser = async () => {
    try {
      const { user } = await addUserMutation({
        email: 'email@example.com',
      }).unwrap();
      console.log('User created', user);
    } catch (err) {
      console.log('Error', err);
    }
  };

  return (
    <div>
      <button onClick={addUser} disabled={isLoading}>Add user</button>
    </div>
  );
};

```


### Authenticate with DataRobot

The application includes a built-in route with a login page `/auth/login` used to log in user into the app. Authenication methods supported -

* Login with DataRobot

**Important** Login with DataRobot works only when the application is pointed to a working backend server bootsrapped from [Hackathon 2021 App Template](https://gitlab.solutions.drdev.io/hackathon-2021/hackathon-2021-app-template). If this condition is not met, the Login with DataRobot button always remains disabled or the error message is shown on the page.

No additional configuration is required in the UI app for Login with DataRobot to work, except providing a valid `REACT_APP_API_URL` variable. However, some addition configuration may be required on the backend side. Please check the details on how to do that - [Backend App Template Setup](https://gitlab.solutions.drdev.io/hackathon-2021/hackathon-2021-app-template#setup)

**Please note** In case the application is properly configured to work with the backend server, the UI app will automatically handle session managemet (handling auth tokens expriration and refreshing them). User will get logged out automatically in case auth token fails to refresh for whatever reason.

### Public/Protected Routes

There is a concept of public and protected routes in the application.

* Public routes - pages allowed to be visited without authentication
* Protected routes - pages allowed to be visited only when user is authenticated

Typically routes in the application are defined in Routes.tsx, so the usage is as follows -

`Routes.tsx`
```js

<Route exact path={ROUTES.HOME}>
  <Home />
</Route>
<ProtectedRoute exact path={ROUTES.MY_ACCOUNT}>
  <MyAccount />
</ProtectedRoute>
```

In the example above, whenever user is trying to visit the `ROUTES.MY_ACCOUNT` route, the application will automatically check whether the user is authenticated. If not, user will be taken to the login flow and back to the `MyAccount` page automatically.

**Please note** Protected routes work only when authentication in the app is configured properly.

### Responsiveness Support

The application has some tools to implement responsive UI. The tooling includes two main components - `for-size($size)` sass mixin & `useResponsive` hook.

The `for-size` mixin allows to override styles for mobile or tablet devices. Here's a typical usage of the mixin -

`Loader.tsx`
```js
import { FunctionComponent } from 'react';
import { LoadingIcon } from '@datarobot/design-system/js/loading-icon';
import classes from './Loader.module.scss';

export const Loader: FunctionComponent = () => (
  <div className={classes.loader}>
    <LoadingIcon message="Loading..." />
  </div>
);
```

`Loader.module.scss`
```css
@import 'mixins.scss';

.loader {
  text-align: center;
  margin-bottom: 5px;
}

for-size(phone) {
  .loader {
    text-align: left;
    margin-bottom: 15px;
  }
}
```

`useResponsive` hooks allows to change the logic inside of the component depending of the screen size (tablet vs mobile). This is useful in case desktop and mobile designs of the same component are too different to implement them with `for-size` mixin approach. A typical usage of `useResponsive` is like this -

`SomeComponent.tsx`
```js
import { FunctionComponent } from 'react';
import useResponsive from 'hooks';;

export const SomeComponent: FunctionComponent = () => {
  const { isMobile, isTablet, isTabletOrMobile } = useResponsive();

  return (
    <div>
      <span>Is mobile - {isMobile}</span>
      <span>Is tablet - {isTablet}</span>
      <span>Is tablet or mobile- {isTabletOrMobile}</span>
    </div>
  )
};
```

### Localizations Support

The application has tooling to implement localizations. `useTranslations` exports the `t` function which returns a localized version of the string based on the english version provided as an argument. Here's a typical usage -

`Loader.tsx`
```js
import { FunctionComponent } from 'react';
import useTranslations from 'hooks/useTranslations'; // import useTranslations
import { LoadingIcon } from '@datarobot/design-system/js/loading-icon';

import classes from './Loader.module.scss';

export const Loader: FunctionComponent = () => {
  const { t } = useTranslations();

  // Use t to get the localized version of the string
  return (
    <LoadingIcon message={t`Loading...`} />
  );
};
```
**Please note:** There are available scripts `yarn translations:update` & `yarn translations:po2json`/`yarn translations:po2json` used to parse the application to find all of the `t` expressions and update the `i18n/*.po` & `i18n/*.po.json` files. You're responsible for updating those files manually to provide the localized versions of the strings.

**Important**: The `t` expression is reserved and is automatically recognized by the scripts mentioned above as a function used for lozalization purposes. Please don't use the `t` expression in the application for anything else.

## Available Scripts

In the project directory, you can run:

### `yarn start`/`yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn start:coverage`/`yarn start:coverage`

Runs the app in the development mode and adds [babel-plugin-istanbul](https://www.npmjs.com/package/babel-plugin-istanbul)
required for test coverage without running eject script.

### `yarn cypress:coverage`/`yarn cypress:coverage`

Opens cypress UI and creates coverage report after each test.

### `yarn cypress`/`yarn cypress`

Opens cypress UI and doesn't create coverage report after each test.


### `yarn test`/`yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`/`yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`/`yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


### `yarn translations:update`/`yarn translations:update`

We have enabled localizations in the app using [ttag](https://ttag.js.org/docs/quickstart.html). To update `.po` files you can run `yarn translations:update`
this script will execute: `npx ttag-cli update src/i18n/uk.po` and for other languages.


### `yarn translations:po2json`/`yarn translations:po2json`

To load translations from `.po` files to `json` you can run `yarn translations:update`
this script will execute: `npx ttag-cli po2json src/i18n/ru.po > src/i18n/ru.po.json` and for other languages. 

**Note: `translations` commands update and load translations only for languages that were added. Please, extend `/i18n` by files for languages that you need and extend translations commands!**


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

