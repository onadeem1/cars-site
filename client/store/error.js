/* Action Types */
const FETCH_FAILURE = 'FETCH_FAILURE'
const RESET_ERROR = 'RESET_ERROR'

/* Action Creators */
export const fetchFailure = error => {
  return {
    type: FETCH_FAILURE,
    message: error.message || 'Something went wrong.'
  }
}

export const resetError = () => {
  return { type: RESET_ERROR }
}

/* Reducer */
export default function(state = null, action) {
  switch (action.type) {
    case RESET_ERROR:
      return null
    case FETCH_FAILURE:
      return action.message
    default:
      return state
  }
}
