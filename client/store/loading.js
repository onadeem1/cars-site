/* Action Types */
const SET_LOADING_TRUE = 'SET_LOADING_TRUE'
const SET_LOADING_FALSE = 'SET_LOADING_FALSE'

/* Initial State */
const defaultLoading = false

/* Action Creators */
export const setLoadingTrue = () => ({type: SET_LOADING_TRUE, bool: true})
export const setLoadingFalse = () => ({type: SET_LOADING_FALSE, bool: false})

/* Reducer */
export default function(state = defaultLoading, action) {
  switch (action.type) {
    case SET_LOADING_TRUE:
      return action.bool

    case SET_LOADING_FALSE:
      return action.bool

    default:
      return state
  }
}
