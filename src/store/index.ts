import { createStore } from 'redux'
import rootReducer from '@/store/combineReducer'

const store = createStore(rootReducer)

export default store
