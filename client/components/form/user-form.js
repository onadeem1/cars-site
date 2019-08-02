import React from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { finalSubmit } from '../../store'
import { withRouter } from 'react-router-dom'
import carImage from '../../images/car-background.jpeg'
import { UserSchema } from './helper-files/schemas'
import './css/user-form.css'

const UserForm = props => {
  const cars = props.cars

  return (
    <div className="user-form-page">
      <img className="car-background" src={carImage} />
      <Formik
        initialValues={{
          name: '',
          email: '',
          phoneNumber: ''
        }}
        validationSchema={UserSchema}
        onSubmit={(values, actions) => {
          props.finalSubmit(values, cars)
          actions.resetForm()
        }}
      >
        {({ values }) => {
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
                  <button
                    className="next-btn"
                    type="submit"
                    disabled={disabled}
                  >
                    Submit Request
                  </button>
                </div>
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
    cars: state.cars.cars
  }
}

const mapDispatch = { finalSubmit }

export default withRouter(connect(mapState, mapDispatch)(UserForm))
