import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routes } from './routes';

import './App.css';

const App = () => (
    <Router>
        <Switch>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={props => (
                        <route.layout {...props}>
                            <route.component {...props} />
                        </route.layout>
                    )}
                />
                ))}
        </Switch>
    </Router>
    );

export default App;
