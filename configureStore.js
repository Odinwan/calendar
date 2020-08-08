// configureStore.js

import { createStore } from 'redux'
import rootReducer from './src/reducers'

export default function configureStore() {
  let store = createStore(rootReducer)
  return store
}
