import React, { Component } from 'react'
import {
    DefaultRoute,Link,Route,RouteHandler,Router,hashHistory,
    browserHistory,IndexRoute,IndexRedirect
} from 'react-router'
import ManageHead from '../containers/ManageHead'
import ManageHome from '../containers/ManageHome'
import ManageBanner from '../containers/ManageBanner'

import '../css/public/public.css'

const ManageRoot = (props) => (
    <div>
        <ManageHead />
        { props.children }
    </div>
)

const HomeRoute = (
    <Router history={hashHistory}>
        <Route path="/" component={ManageRoot}>
            <Route path="home" component={ManageHome}>
                <IndexRoute component={ManageBanner} />
                <Route path="banner" component={ManageBanner} />
            </Route>
            <Route path="person" component={ManageHome}></Route>
        </Route>
    </Router>
)

export default HomeRoute