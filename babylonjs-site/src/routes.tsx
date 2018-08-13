import * as React from 'react';
import { Route } from 'react-router-dom';

import Layout from './containers/layout';
import Home from './containers/home';
import About from './containers/about';

export const routes = (
    <Layout>
        <Route exact={true} path="/" component={Home} />
        <Route path="/about" component={About} />
    </Layout>
);