import React from 'react'
import Banner from '@p/static/images/banner.png'
import { t } from '@/locales'

const ClientHome: React.FC = () => {
    return (
        <>
            <h1>{t('NAME')}</h1>
            <img src={Banner} alt="banner" />
        </>
    )
}

export default ClientHome
