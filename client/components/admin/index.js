import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {me} from '../../store'
import Login from './auth-form'
import AdminPanel from './admin-panel'
import './css/table.css'
import carImage from '../../images/car-background.jpeg'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <div className="page-container">
        <img className="car-background" src={carImage} />
        {this.props.loading ? (
          <div className="loading">
            <div className="loading-text">Loading...</div>
          </div>
        ) : isLoggedIn ? (
          <AdminPanel />
        ) : (
          <Login />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.login.id,
    loading: state.loading
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
