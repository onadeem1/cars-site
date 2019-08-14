import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../../store'

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props

  return (
    <div className="auth-form-page">
      <form className="auth-form" onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email" />
          <input
            autoComplete="off"
            placeholder="email@wishlistauto.com"
            className="form-control"
            name="email"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password" />
          <input
            className="form-control"
            placeholder="password"
            name="password"
            type="password"
          />
        </div>
        <div className="login-button-container">
          <button className="red-btn" type="submit">
            {displayName}
          </button>
        </div>
        {error &&
          error.response && (
            <div className="error-box"> {error.response.data} </div>
          )}
      </form>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export default connect(mapLogin, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
