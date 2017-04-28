import React, { Component } from 'react'
import {
    DefaultRoute,Link,Route,RouteHandler,Router,hashHistory,
    browserHistory,IndexRoute,IndexRedirect
} from 'react-router'
import Login from '../containers/Login'
import Register from '../containers/Register'
import IndexHead from '../containers/home/Header'

import Candidate from '../containers/Candidate'
import OrderExercise from '../containers/OrderExercise'
import Exercise from '../containers/Exercise'
import Test from '../containers/Test'

import '../css/public/public.css'

const Roots = (props) => (
    <div>
        <IndexHead />
        {props.children}
        {/*<IndexFooter />*/}
    </div>
)

const HomeRoute = (
    <Router history={hashHistory}>
        <Route path="/" component={Roots}>
            <IndexRoute component={Login} />
            <Route path="login" component={Login} />
            <Route path="register" component={Register} />

            <Route path="candidate" component={Candidate} >
                <IndexRoute component={Exercise} />
                <Route path="order" component={OrderExercise} />
                <Route path="excs" component={Exercise} />
                <Route path="test" component={Test} />
                {/*
                <Route path="exam" component={Exam} />
                <Route path="error" component={Error} />
                <Route path="favor" component={Favor} />
                <Route path="statis" component={Statistics} />*/}
            </Route>

        </Route>
    </Router>
)

export default HomeRoute