import React from 'react'
import Routes from '@/routes'
import { RootState } from '@/store/combineReducer'
import { useSelector } from 'react-redux'
import { useUpdateLocale } from '@/locales/context'

import '@/styles/App.scss'

const Language = ({ children }: any) => {
    const primaryLocale = localStorage.lang ? localStorage.lang : 'en'
    const locale = useSelector((state: RootState) => state.language.locale)
    const updateLocale = useUpdateLocale()
    updateLocale(primaryLocale)
    return <React.Fragment key={locale}>{locale && children}</React.Fragment>
}

const App: React.FC = () => {
    return (
        <React.Fragment>
            <Language>
                <Routes />
            </Language>
        </React.Fragment>
    )
}

export default App
