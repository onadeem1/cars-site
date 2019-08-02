import React from 'react'
import {Route, Switch} from 'react-router-dom'

import CarForm from './components/form/car-form'
import Summary from './components/form/summary'
import UserForm from './components/form/user-form'
import Thanks from './components/form/thanks'
import Auth from './components/admin'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={CarForm} />
      <Route path="/summary" component={Summary} />
      <Route path="/user" component={UserForm} />
      <Route path="/thanks" component={Thanks} />
      <Route path="/update" component={CarForm} />
      <Route path="/admin" component={Auth} />
      <Route component={CarForm} />
    </Switch>
  )
}

export default Routes
