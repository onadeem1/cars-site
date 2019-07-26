import React from 'react'
import {connect} from 'react-redux'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import {addCar} from '../../store'
import {withRouter} from 'react-router-dom'
import carList from '../carList'
import './css/car-form.css'

const CarSchema = Yup.object().shape({
  make: Yup.string().required('Required'),
  model: Yup.string().required('Required'),
  minYear: Yup.number().required('Required'),
  maxYear: Yup.number().required('Required'),
  minBudget: Yup.number().required('Required'),
  maxBudget: Yup.number().required('Required'),
  maxMileage: Yup.number().required('Required'),
  zip: Yup.number()
    .required('Required')
    .test('len', 'Must be exactly 5 characters', val => {
      if (val) return val.toString().length === 5
    })
})

//helper funcs
const calcYears = (minYear = 1970, maxYear = 2019) => {
  if (minYear === '') minYear = 1970
  if (maxYear === '') maxYear = 2019
  let arr = []
  let i
  for (i = minYear; i <= maxYear; i++) {
    arr.push(i)
  }
  return arr
}

// eslint-disable-next-line complexity
const calcBudget = (minBudget = 0, maxBudget = 100000) => {
  if (minBudget === '') minBudget = 0
  if (maxBudget === '') maxBudget = 100000
  if (typeof minBudget === 'string') minBudget = +minBudget
  if (typeof maxBudget === 'string') maxBudget = +maxBudget
  let arr = []
  let i
  for (i = minBudget; i <= maxBudget; i = i + 1000) {
    arr.push(i)
    if (i >= 20000 && i < 50000) i = i + 1000
    else if (i >= 50000) i = i + 4000
  }
  return arr
}

const carBrands = Object.keys(carList)

const CarForm = props => {
  return (
    <div className="car-form-page">
      <Formik
        initialValues={{
          make: '',
          model: '',
          minYear: '',
          maxYear: '',
          minBudget: '',
          maxBudget: '',
          maxMileage: 0,
          zip: ''
        }}
        validationSchema={CarSchema}
        onSubmit={(values, actions) => {
          props.addCar(values)
          actions.resetForm()
          props.history.push('/summary')
        }}
      >
        {({values, handleChange}) => {
          let disabled = !CarSchema.isValidSync(values)
          let modelEnabled = values.make.length > 0

          return (
            <div className="car-form-page-container">
              <div className="text-container">
                <div className="header-container">
                  We get it, looking for a car is hard. Let us help.
                </div>
                <div className="detail-container">
                  Just let us know what you're looking for and we will contact
                  you as soon as we find a match.
                </div>
              </div>
              <Form className="car-form">
                <div className="make-container">
                  <Field
                    className="form-control"
                    component="select"
                    name="make"
                    placeholder="Make"
                  >
                    <option key="old" value="">
                      Any Make
                    </option>
                    {carBrands.map(brand => (
                      <option key={brand} vaue={brand}>
                        {brand}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="model-container">
                  <Field
                    className="form-control"
                    component="select"
                    name="model"
                    placeholder="Model"
                    disabled={!modelEnabled}
                  >
                    <option key="old" value="">
                      Any Model
                    </option>
                    {values.make &&
                      carList[values.make].map(model => (
                        <option key={model} vaue={model}>
                          {model}
                        </option>
                      ))}
                  </Field>
                </div>
                <div className="years-mileage-container">
                  <div className="years-container">
                    <div className="years-text">
                      <label htmlFor="years">Years</label>
                    </div>
                    <div className="years-select">
                      <div className="min-years-select">
                        <Field
                          className="form-control"
                          component="select"
                          name="minYear"
                        >
                          <option key="old" value="">
                            Add Year
                          </option>
                          {calcYears(1970, values.maxYear).map(year => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="to-text">to</div>
                      <div className="min-years-select">
                        <Field
                          className="form-control"
                          component="select"
                          name="maxYear"
                        >
                          <option key="new" value="">
                            Add Year
                          </option>
                          {calcYears(values.minYear, 2019).map(year => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div className="mileage-container">
                    <div className="mileage-text">
                      <label htmlFor="maxMileage">Maximum Mileage</label>
                    </div>
                    <div className="mileage-slider">
                      <input
                        type="range"
                        id="start"
                        name="maxMileage"
                        min="0"
                        step="5000"
                        max="200000"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mileage-number">{values.maxMileage}</div>
                  </div>
                </div>
                <div className="budget-zip-container">
                  <div className="budget-container">
                    <div className="budget-text">
                      <label htmlFor="years">Budget</label>
                    </div>
                    <div className="budget-select">
                      <div className="min-budget-select">
                        <Field
                          className="form-control"
                          component="select"
                          name="minBudget"
                        >
                          <option key="start" value="">
                            ---
                          </option>
                          {calcBudget(0, values.maxBudget).map(budget => (
                            <option key={budget} value={budget}>
                              {budget}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="to-text">to</div>
                      <div className="max-budget-select">
                        <Field
                          className="form-control"
                          component="select"
                          name="maxBudget"
                        >
                          <option key="end" value="">
                            ---
                          </option>
                          {calcBudget(values.minBudget, 100000).map(budget => (
                            <option key={budget} value={budget}>
                              {budget}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div className="zip-container">
                    <Field
                      className="form-control"
                      name="zip"
                      placeholder="zip"
                    />
                  </div>
                </div>
                <div className="button-container">
                  <button
                    className="next-btn"
                    type="submit"
                    disabled={disabled}
                  >
                    Submit
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

const mapDispatch = {addCar}

export default withRouter(connect(null, mapDispatch)(CarForm))
