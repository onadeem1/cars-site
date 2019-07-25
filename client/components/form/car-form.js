import React from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'

const CarSchema = Yup.object().shape({
  make: Yup.string().required('Required'),
  model: Yup.string().required('Required'),
  minYear: Yup.number().required('Required'),
  maxYear: Yup.number().required('Required'),
  minBudget: Yup.number().required('Required'),
  maxMileage: Yup.number().required('Required'),
  zip: Yup.number().required('Required')
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

const CarForm = () => (
  <div>
    <Formik
      initialValues={{
        make: '',
        model: '',
        minYear: '',
        maxYear: '',
        minBudget: '',
        maxBudget: '',
        maxMileage: '',
        zip: ''
      }}
      validationSchema={CarSchema}
      onSubmit={(values, actions, handleChange) => {}}
    >
      {({values, errors, handleChange}) => {
        let disabled = !CarSchema.isValidSync(values)
        console.log(values)
        console.log(errors)
        return (
          <Form>
            <Field name="make" placeholder="Make" />
            <Field name="model" placeholder="Model" />
            <Field component="select" name="minYear">
              <option key="old" value="">
                Add Year
              </option>
              {calcYears(1970, values.maxYear).map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Field>
            <Field component="select" name="maxYear">
              <option key="new" value="">
                Add Year
              </option>
              {calcYears(values.minYear, 2019).map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Field>
            <Field component="select" name="minBudget">
              <option key="start" value="">
                ---
              </option>
              {calcBudget(0, values.maxBudget).map(budget => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </Field>
            <Field component="select" name="maxBudget">
              <option key="end" value="">
                ---
              </option>
              {calcBudget(values.minBudget, 100000).map(budget => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </Field>
            <label htmlFor="maxMileage">Maximum Mileage</label>
            <input
              type="range"
              id="start"
              name="maxMileage"
              min="0"
              step="5000"
              max="200000"
              onChange={handleChange}
            />
            {values.maxMileage}
            <Field name="zip" placeholder="zip" />
            <button type="submit" disabled={disabled}>
              Submit
            </button>
          </Form>
        )
      }}
    </Formik>
  </div>
)

export default CarForm
