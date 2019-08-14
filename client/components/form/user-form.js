import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { finalSubmit, resetError } from '../../store'
import { withRouter } from 'react-router-dom'
import { UserSchema } from './helper-files/schemas'
import SubmitError from '../error'
import '../styling/user-form.scss'

const UserForm = props => {
  useEffect(() => {
    props.resetError()
    return function cleanup() {
      props.resetError()
    }
  }, [])
  const cars = props.cars
  return (
    <div className="user-form-page">
      <Formik
        initialValues={{
          name: '',
          email: '',
          phoneNumber: '',
          zip: ''
        }}
        validationSchema={UserSchema}
        onSubmit={(values, actions) => {
          props.finalSubmit(values, cars)
          actions.resetForm()
        }}
      >
        {({ values, touched }) => {
          if (props.errorMessage && touched.name) props.resetError()
          let disabled = !UserSchema.isValidSync(values)
          return (
            <div className="user-form-page-container">
              <div className="user-header-container">
                Where can we reach you?
              </div>
              <Form>
                <div className="name-container">
                  <Field
                    className="form-control"
                    name="name"
                    placeholder="Name"
                  />
                </div>
                <div className="email-container">
                  <Field
                    className="form-control"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="phone-container">
                  <Field
                    className="form-control"
                    name="phoneNumber"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="zip-container">
                  <Field
                    className="form-control"
                    name="zip"
                    placeholder="Zip Code"
                  />
                </div>
                <div className="button-container">
                  <button className="red-btn" type="submit" disabled={disabled}>
                    Submit Request
                  </button>
                </div>
                {props.errorMessage && (
                  <SubmitError message={props.errorMessage} />
                )}
              </Form>
            </div>
          )
        }}
      </Formik>
    </div>
  )
}

const mapState = state => {
  return {
    cars: state.cars.cars,
    errorMessage: state.error
  }
}

const mapDispatch = { finalSubmit, resetError }

export default withRouter(connect(mapState, mapDispatch)(UserForm))
