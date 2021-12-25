import { t } from '@/locales'
import { useUpdateLocale } from '@/locales/context'
import React, { ChangeEvent, useState } from 'react'
import { Link } from 'wouter'

const ChooseLanguage = () => {
    const [locale, setLocale] = useState(localStorage.lang || 'en')

    const updateLocale = useUpdateLocale()
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const locale = e.target.value
        setLocale(locale)
        updateLocale(locale)
    }
    return (
        <>
            <select onChange={handleSelect} value={locale}>
                <option value="en">English</option>
                <option value="vi">Vietnamese</option>
            </select>
        </>
    )
}

const ClientHeader: React.FC = () => {
    return (
        <header className="client-header">
            <ul>
                <li>
                    <Link to="/">{t('HOME')}</Link>
                </li>
                <li>
                    <Link to="/about">{t('ABOUT')}</Link>
                </li>
                <li>
                    <ChooseLanguage />
                </li>
            </ul>
        </header>
    )
}

export default ClientHeader
