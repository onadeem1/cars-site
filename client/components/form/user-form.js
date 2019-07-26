import React from 'react'
import {connect} from 'react-redux'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import {finalSubmit} from '../../store'
import {withRouter} from 'react-router-dom'

const UserSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string()
    .required('Required')
    .email('Email Format please :)'),
  phoneNumber: Yup.string().required('Required')
})

const UserForm = props => {
  const cars = props.cars

  return (
    <div>
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
        {({values, errors, handleChange}) => {
          let disabled = !UserSchema.isValidSync(values)
          return (
            <Form>
              <Field name="name" placeholder="Name" />
              <Field name="email" placeholder="Email" />
              <Field name="phoneNumber" placeholder="Phone Number" />
              <button type="submit" disabled={disabled}>
                Submit
              </button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

const mapState = state => {
  return {
    cars: state.cars
  }
}

const mapDispatch = {finalSubmit}

export default withRouter(connect(mapState, mapDispatch)(UserForm))
