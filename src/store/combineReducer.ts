import languageReducer from '@/common-states/language/reducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    language: languageReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
