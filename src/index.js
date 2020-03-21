import React, { Suspense }from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware } from 'redux';
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import AppReducer from './reducers/index'
import apiMiddleware from './middleware/api'
import Routes from './routes/Routes'
import * as serviceWorker from './serviceWorker'

import 'bootstrap/dist/css/bootstrap.css'
import 'antd/dist/antd.css'
import 'react-flags-select/css/react-flags-select.css'
import './assets/css/app.css'
import './utils/carousel_lib/scss/main.scss'
import "video-react/dist/video-react.css"
import './i18next'



const history = createBrowserHistory()
const store = createStore(AppReducer, applyMiddleware(apiMiddleware))

ReactDOM.render(
    <Suspense fallback="loading">
        <Provider store={store}>
            <Router history={history}>
                <Routes/> 
            </Router>
        </Provider>
    </Suspense>
    , 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
