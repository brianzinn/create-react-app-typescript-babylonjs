import { createStore, applyMiddleware, compose, GenericStoreEnhancer } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../modules';

import { ToDoState } from '../modules/todo'

// application state
export interface ApplicationState {
  todo: ToDoState
}

const BROWSER_HISTORY_BUILD_OPTIONS = (process.env.NODE_ENV === 'development')
  ? undefined
  : { basename: '/create-react-app-typescript-babylonjs'}

// actual store setup.
// NOTE: this basename is only being used because of gh-pages.  If you clone this repo and are deploying to root directory, just use:
// export const history = createHistory();
export const history = createHistory(BROWSER_HISTORY_BUILD_OPTIONS);

const initialState = {};
const enhancers = [];

// setup sagas
const sagaMiddleware = createSagaMiddleware();

const middleware = [
  routerMiddleware(history),
  sagaMiddleware
];

if (process.env.NODE_ENV === 'development') {

    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    const devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension as () => GenericStoreEnhancer;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;