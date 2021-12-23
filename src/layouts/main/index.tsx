import React from 'react'

interface IMain {
    children: React.ReactElement
}

const Main: React.FC = ({ children }: IMain) => {
    return (
        <main>
            <section>Main title</section>
            <section>{children}</section>
        </main>
    )
}

export default Main
