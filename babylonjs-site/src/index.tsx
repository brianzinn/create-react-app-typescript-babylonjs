import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import store, { history } from './store';
import { routes } from './routes';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <Provider store={store}>
      <ConnectedRouter history={history} children={routes} />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

// NOTE: if (module.hot) { module.hot.accept.....}
registerServiceWorker();
