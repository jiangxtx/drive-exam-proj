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
import ChapterExercise from '../containers/ChapterExercise'
import Test from '../containers/Test'

import Admin from '../containers/Admin'
import UserManage from '../containers/UserManage'
import ImportManage from '../containers/ImportManage'
import TopicManage from '../containers/TopicManage'

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
                <IndexRoute component={OrderExercise} />
                <Route path="order" component={OrderExercise} />
                <Route path="excs" component={ChapterExercise} />
                <Route path="test" component={Test} />
                {/*
                <Route path="exam" component={Exam} />
                <Route path="error" component={Error} />
                <Route path="favor" component={Favor} />
                <Route path="statis" component={Statistics} />*/}
            </Route>

            <Route path="admin" component={Admin} >
                <IndexRoute component={UserManage} />
                <Route path="user" component={UserManage} />
                <Route path="import" component={ImportManage} />
                <Route path="topic" component={TopicManage} />
            </Route>

        </Route>
    </Router>
)

export default HomeRoute