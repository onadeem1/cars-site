import React from 'react'
import {Route, Switch} from 'react-router-dom'
import CarForm from './components/form'
import Summary from './components/form/summary'
import UserForm from './components/form/user-form'
import Thanks from './components/form/thanks'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={CarForm} />
    <Route path="/summary" component={Summary} />
    <Route path="/user" component={UserForm} />
    <Route path="/thanks" component={Thanks} />
    <Route component={CarForm} />
  </Switch>
)

export default Routes
