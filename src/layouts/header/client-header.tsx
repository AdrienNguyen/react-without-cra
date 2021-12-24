import { t } from '@/locales'
import { useUpdateLocale } from '@/locales/context'
import React, { ChangeEvent } from 'react'
import { Link } from 'wouter'

const ChooseLanguage = () => {
    const updateLocale = useUpdateLocale()
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        updateLocale(e.target.value)
    }
    return (
        <>
            <select onChange={handleSelect}>
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
