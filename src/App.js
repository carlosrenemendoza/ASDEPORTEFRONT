import React, {Component} from 'react';
import './App.scss';
import $ from 'jquery';
import './Global';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './styles/bootstrap.scss';
import './styles/app.scss';
import './App.scss';
import './Vendor';
import './resources/Titillium_Web/TitilliumWeb-Black.ttf';
import './resources/Titillium_Web/TitilliumWeb-Bold.ttf';
import LoginComponent from './components/asDeporte/AsDepBlog/';
import NotFound from './components/template/pages/notFound';


import history from './history';

$.ajaxPrefilter(o => o.async = true);


/*=============================================
=            App Component With Router        =
=============================================*/

class App extends Component {

  render(){
    return (
      <BrowserRouter history={history} basename={'/'}>
        <Switch>
          <Route exact path="/" component={LoginComponent}></Route>
          <Route component={NotFound} />
        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
