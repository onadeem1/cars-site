import * as Yup from 'yup'

export const CarSchema = Yup.object().shape({
  make: Yup.string().required('Required'),
  model: Yup.string().required('Required'),
  minYear: Yup.number().required('Required'),
  maxYear: Yup.number().required('Required'),
  minBudget: Yup.number().required('Required'),
  maxBudget: Yup.number().required('Required'),
  maxMileage: Yup.number().required('Required')
})

export const UserSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string()
    .required('Required')
    .email('Email Format please :)'),
  phoneNumber: Yup.string().required('Required'),
  zip: Yup.number()
    .required('Required')
    .test('len', 'Must be exactly 5 characters', val => {
      if (val) return val.toString().length === 5
    })
})
