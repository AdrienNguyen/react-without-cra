import React from 'react'
import Routes from '@/routes'
import { RootState } from '@/store/combineReducer'
import { useSelector } from 'react-redux'

import '@/styles/App.scss'

const Language = ({ children }: any) => {
    const locale = useSelector((state: RootState) => state.language.locale)

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
