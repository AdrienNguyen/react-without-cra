import React from 'react'
import { Spinner } from '@/components'

interface IProps {
    show?: boolean
}

const PageLoading: React.FC<IProps> = () => {
    return (
        <div className="page-loading">
            <div className="loading-content">
                <Spinner />
            </div>
        </div>
    )
}

export default PageLoading
