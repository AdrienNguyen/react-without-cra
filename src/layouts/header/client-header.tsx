import { LANGUAGE_CHANGE } from '@/common-states/language/actions'
import React, { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'wouter'

const ChooseLanguage = () => {
    const dispatch = useDispatch()
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: LANGUAGE_CHANGE,
            payload: {
                locale: e.target.value,
            },
        })
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
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <ChooseLanguage />
                </li>
            </ul>
        </header>
    )
}

export default ClientHeader
