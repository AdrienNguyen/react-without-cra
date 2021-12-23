import React, { ReactElement } from 'react'

interface ILayout {
    header: ReactElement | boolean
    footer: ReactElement | boolean
    children: ReactElement
}

const Layout: React.FC<ILayout> = ({ header, footer, children }) => {
    return (
        <>
            {!!header && header}
            {children}
            {!!footer && footer}
        </>
    )
}

export default Layout
