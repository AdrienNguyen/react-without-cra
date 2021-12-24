import { Action } from 'redux'
import { LANGUAGE_CHANGE } from '@/common-states/language/actions'

interface ILanguageState {
    locale: 'en' | 'vi'
}

interface ILanguageAction extends Action {
    payload: any
}

const initState: ILanguageState = {
    locale: 'en',
}

const languageReducer = (state = initState, action: ILanguageAction) => {
    switch (action.type) {
        case LANGUAGE_CHANGE:
            return {
                ...state,
                locale: action.payload.locale,
            }
        default:
            return state
    }
}

export default languageReducer
