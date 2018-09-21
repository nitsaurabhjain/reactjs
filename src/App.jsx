import React from 'react';
import Home from './feature1/home.jsx';
import Loadable from 'react-loadable';
import {BrowserRouter, Switch, Route,Link} from 'react-router-dom';
const Loading = () => <div>Loading...</div>;
const UserRegistration = Loadable({
    loader: () =>
        import('./feature1/user-registration.jsx'),
    loading: Loading,
});

const Setting = Loadable({
    loader: () =>
        import('./feature2/setting.jsx'),
    loading: Loading,
});

const App = () => (
     <BrowserRouter>
   <div>
        <ul>
            <li> <Link to = '/'> Home </Link></li>
            <li> <Link to = '/registration'>Registration</Link></li>
            <li> <Link to = '/setting'>Setting</Link></li>
        </ul>
       <Switch>
         <Route exact path = '/'   component = {Home}/>
         <Route path = '/registration' component = {UserRegistration}/>
          <Route path = '/setting' component = {Setting}/>
       </Switch>
    </div>
     </BrowserRouter>
 );
export default App