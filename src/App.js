import React from 'react';
import { PatientsList } from './components/PatientsList/PatientsList';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { headerRoutes } from './constants';
import { SemanticToastContainer } from 'react-semantic-toasts';

import 'react-semantic-toasts/styles/react-semantic-alert.css';
import 'semantic-ui-css/components/reset.min.css';
import 'semantic-ui-css/components/site.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/header.min.css';

import './App.css';

export const App = () => (
    <div className="App">
        <Header/>
        <main className={'Main'}>
            <Switch>
                <Route exact path='/' component={PatientsList}/>
                {headerRoutes.map(route =>
                    <Route path={route.path} component={route.component} key={route.path} exact={route.exact}/>)}
            </Switch>
        </main>
        <SemanticToastContainer position='bottom-right' />
    </div>

);
