import React, { Component } from 'react'
import {
    DefaultRoute,Link,Route,RouteHandler,Router,hashHistory,
    browserHistory,IndexRoute,IndexRedirect
} from 'react-router'
import Home from '../containers/home/Home'
import Login from '../containers/Login'
import Register from '../containers/Register'
import IndexHead from '../containers/home/Header'
import IndexFooter from '../components/index_footer'

import ListContainer from '../containers/home/ListContainer'
import NewsList from '../containers/home/NewsList'
import StudyList from '../containers/home/StudyList'
import ExcsList from '../containers/home/ExcsList'
import NewsDetail from '../containers/home/NewsDetail'
import StudyDetail from '../containers/home/StudyDetail'
import ExcsDetail from '../containers/home/ExcsDetail'

import Candidate from '../containers/Candidate'
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
            {/*<IndexRedirect to="home" />
            <Route path="home" component={Home} />*/}
            <IndexRoute component={Login} />
            <Route path="login" component={Login} />
            <Route path="register" component={Register} />

            <Route path="admin" component={ListContainer} >
                <IndexRoute component={NewsList} />
                <Route path="detail/:nid" components={NewsDetail} />
            </Route>

            <Route path="candidate" component={Candidate} >
                <IndexRoute component={Exercise} />
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