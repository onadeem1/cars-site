/* eslint-disable complexity */

/* helper funcs for car form */

export const calcYears = (minYear = 1970, maxYear = 2019) => {
  if (minYear === '') minYear = 1970
  if (maxYear === '') maxYear = 2019
  let arr = []
  let i
  for (i = minYear; i <= maxYear; i++) {
    arr.push(i)
  }
  return arr.reverse()
}

export const calcBudget = (minBudget = 0, maxBudget = 100000) => {
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

export const convertNumber = number => {
  let result = number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  return result
}

export const generateKey = pre => {
  return `${pre}_${new Date().getTime()}`
}

export const timeframeOptions = [
  'ASAP',
  '1 month',
  '2 months',
  '3 months',
  '4 months',
  '5 months',
  '6 months',
  '7 months',
  '8 months',
  '9 months',
  '10 months',
  '11 months',
  '1 year'
]
