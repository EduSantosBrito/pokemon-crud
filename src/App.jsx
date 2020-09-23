import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loading from './components/Loading';

const HomePage = lazy(() => import('./screens/Home/HomePage'));
const MapPage = lazy(() => import('./screens/Map/MapPage'));

const App = () => (
    <Switch>
        <Suspense fallback={<Loading />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/map" component={MapPage} />
            <Redirect to={HomePage} />
        </Suspense>
    </Switch>
);

export default App;
