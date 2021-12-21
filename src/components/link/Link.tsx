import React, { ReactElement, useState } from 'react'

interface ILinkProps {
    page: string
}

interface IProps extends ILinkProps {
    children: ReactElement | string
}

const STATUS = {
    HOVERED: 'hovered',
    NORMAL: 'normal',
}

const Link: React.FC<IProps & React.HTMLAttributes<HTMLLinkElement>> = ({
    page,
    children,
}) => {
    const [status, setStatus] = useState(STATUS.NORMAL)

    const onMouseEnter = () => {
        setStatus(STATUS.HOVERED)
    }

    const onMouseLeave = () => {
        setStatus(STATUS.NORMAL)
    }

    return (
        <a
            className={status}
            href={page || '#'}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </a>
    )
}

export default Link
