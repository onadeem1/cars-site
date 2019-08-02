import React from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { addCar, updateCar } from '../../store'
import { withRouter } from 'react-router-dom'
import carList from '../carList'
import carImage from '../../images/car-background.jpeg'
import './css/car-form.css'

const CarSchema = Yup.object().shape({
  make: Yup.string().required('Required'),
  model: Yup.string().required('Required'),
  minYear: Yup.number().required('Required'),
  maxYear: Yup.number().required('Required'),
  minBudget: Yup.number().required('Required'),
  maxBudget: Yup.number().required('Required'),
  maxMileage: Yup.number().required('Required')
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

const convertNumber = number => {
  let result = number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  return result
}

const carBrands = Object.keys(carList)

const generateKey = pre => {
  return `${pre}_${new Date().getTime()}`
}

// eslint-disable-next-line complexity
const CarForm = props => {
  let {
    make,
    carKey,
    model,
    minYear,
    maxYear,
    minBudget,
    maxBudget,
    maxMileage
  } = props.selected

  return (
    <div className="car-form-page">
      <img className="car-background" src={carImage} />
      <Formik
        initialValues={{
          make: make || '',
          model: model || '',
          minYear: minYear || '',
          maxYear: maxYear || '',
          minBudget: minBudget || '',
          maxBudget: maxBudget || '',
          maxMileage: maxMileage || ''
        }}
        validationSchema={CarSchema}
        onSubmit={(values, actions) => {
          carKey
            ? props.updateCar({ ...values, carKey })
            : props.addCar({ ...values, carKey: generateKey(values.model) })
          actions.resetForm()
          props.history.push('/summary')
        }}
      >
        {({ values, handleChange }) => {
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
                  <img
                    className="arrow"
                    src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
                  />
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
                  <img
                    className="arrow"
                    src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
                  />
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
                        <img
                          className="arrow-year"
                          src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
                        />
                        <Field
                          className="form-control"
                          component="select"
                          name="minYear"
                        >
                          <option key="old" value="" disabled hidden>
                            year
                          </option>
                          {calcYears(1970, values.maxYear).map(year => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="to-text">to</div>
                      <div className="max-years-select">
                        <img
                          className="arrow-year"
                          src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
                        />
                        <Field
                          className="form-control"
                          component="select"
                          name="maxYear"
                        >
                          <option key="new" value="" disabled hidden>
                            year
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
                        value={values.maxMileage || 0}
                        onChange={handleChange}
                        className="form-control-range"
                      />
                    </div>
                    <div className="mileage-number">
                      {convertNumber(values.maxMileage)} miles
                    </div>
                  </div>
                </div>
                <div className="budget-zip-container">
                  <div className="budget-container">
                    <div className="budget-text">
                      <label htmlFor="years">Budget</label>
                    </div>
                    <div className="budget-select">
                      <div className="min-budget-select">
                        <img
                          className="arrow-year"
                          src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
                        />
                        <Field
                          className="form-control"
                          component="select"
                          name="minBudget"
                        >
                          <option disabled hidden key="start" value="">
                            low
                          </option>
                          {calcBudget(0, values.maxBudget).map(budget => (
                            <option key={budget} value={budget}>
                              $ {convertNumber(budget)}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="to-text">to</div>
                      <div className="max-budget-select">
                        <img
                          className="arrow-year"
                          src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
                        />
                        <Field
                          className="form-control"
                          component="select"
                          name="maxBudget"
                        >
                          <option key="end" disabled hidden value="">
                            high
                          </option>
                          {calcBudget(values.minBudget, 100000).map(budget => (
                            <option key={budget} value={budget}>
                              $ {convertNumber(budget)}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="button-container">
                  <button
                    className="next-btn"
                    type="submit"
                    disabled={disabled}
                  >
                    Next
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

const mapState = state => ({
  selected: state.cars.selected
})

const mapDispatch = { addCar, updateCar }

export default withRouter(connect(mapState, mapDispatch)(CarForm))
