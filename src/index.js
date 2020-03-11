import React from 'react'
import ReactDOM from 'react-dom'
import {createBrowserHistory} from 'history'
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import AppReducer from './reducers/index'
import apiMiddleware from './middleware/api'
import Routes from './routes/Routes'
import Home from './screens/Home'
import UserAccount from './screens/UserAccount'
import * as serviceWorker from './serviceWorker'

import 'bootstrap/dist/css/bootstrap.css'
import 'antd/dist/antd.css'
import 'react-flags-select/css/react-flags-select.css'
import './assets/css/app.css'
import './utils/carousel_lib/scss/main.scss'



const history = createBrowserHistory()
const store = createStore(AppReducer, applyMiddleware(apiMiddleware))

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Routes/>      
        </Router>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
