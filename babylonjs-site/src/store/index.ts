import { createStore, applyMiddleware, compose, GenericStoreEnhancer } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { BrowserHistoryBuildOptions } from 'history';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../modules';

// application-wide state: see /todo/index -> connect(...)
export interface ApplicationState {
  
}

const getBrowserHistoryBuildOptions = (): BrowserHistoryBuildOptions | undefined => {
  return process.env.NODE_ENV === 'development'
    ? undefined
    : { basename: '/create-react-app-typescript-babylonjs'};
};

// NOTE: getBrowserHistoryBuildOptions() is only used for gh-pages.
// If you clone this repo and are deploying to root directory, just use:
// export const history = createHistory();
export const history = createHistory(getBrowserHistoryBuildOptions());

const initialState = {};
const enhancers = [];

// setup sagas
const sagaMiddleware = createSagaMiddleware();

const middleware = [
  routerMiddleware(history),
  sagaMiddleware
];

if (process.env.NODE_ENV === 'development') {

    // tslint:disable-next-line: no-any
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