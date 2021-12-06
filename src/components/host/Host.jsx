import React from 'react'
import './Host.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '../../pages/login/Login'
import Layout from '../layout/Layout'


function Host(props){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login}></Route>
                <Route exact path='/dashboard' component={Layout}></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Host