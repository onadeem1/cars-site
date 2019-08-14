import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink, Route, Redirect, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { me, logout } from '../../store'
import Login from './auth-form'
import AdminPanel from './admin-panel'
import Notifications from './notifications'
import '../styling/admin.scss'

class Admin extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn, match } = this.props
    return (
      <div className="page-container">
        {this.props.loading ? (
          <div className="loading">
            <div className="loading-text">Loading...</div>
          </div>
        ) : isLoggedIn ? (
          <>
            <div className="admin-navbar">
              <NavLink className="admin-tabs" to={`${match.url}/requests`}>
                Requests
              </NavLink>
              <NavLink className="admin-tabs" to={`${match.url}/notifications`}>
                Notification
              </NavLink>
              <div className="logout-container">
                <button
                  className="red-btn logout-btn"
                  onClick={() => this.props.logoutAdmin()}
                  type="button"
                >
                  Logout
                </button>
              </div>
            </div>
            <Switch>
              <Route path={`${match.path}/requests`} component={AdminPanel} />
              <Route
                path={`${match.path}/notifications`}
                component={Notifications}
              />
              <Redirect to="/admin/requests" />
            </Switch>
          </>
        ) : (
          <Login />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    loading: state.loading
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    logoutAdmin() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Admin))

Admin.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
