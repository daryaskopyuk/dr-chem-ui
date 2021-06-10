# Rationale

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [CRA DataRobot template](https://github.com/datarobot/cra-template-datarobot). This allows to take benefit of CRA tool and apply set up common for DataRobot organization.

In particular, CRA DataRobot template includes:

* PR template
* Editor config
* .npmrc file
* ESLint + Prettier config
* Test set up:
  * Cypress + test coverage integration
  * React testing library as a dependency
* [ttag](https://ttag.js.org/docs/create-react-app.html) for i18n
* [react-router-dom](https://reactrouter.com/web/guides/quick-start)
* [design system package](https://github.com/datarobot/DataRobot/tree/master/ui-tasks/design-system)
* Fonts

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

