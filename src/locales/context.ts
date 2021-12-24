import { LANGUAGE_CHANGE } from '@/common-states/language/actions'
import lang from '@/locales/default-lang'
import { useDispatch } from 'react-redux'

const fetchLang = async (locale: string) => {
    let primaryLangs = require(`@p/languages/${locale}.json`)
    primaryLangs = Object.values(primaryLangs).reduce(
        (pre, cur) => Object.assign(pre, cur),
        {},
    )
    console.log(primaryLangs)
    return primaryLangs
}

export const useUpdateLocale = () => {
    const dispatch = useDispatch()
    const updateLocale = (newLocale: string) => {
        fetchLang(newLocale).then((newLang) => {
            Object.assign(lang, newLang)
            localStorage.lang = newLocale
            dispatch({
                type: LANGUAGE_CHANGE,
                payload: {
                    locale: newLocale,
                },
            })
        })
    }
    return updateLocale
}
