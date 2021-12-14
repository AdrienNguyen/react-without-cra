import React from 'react'
import Button from '@/components/button'
import Banner from '@/static/images/banner.png'
import Github from '@/static/icons/github.svg'

import '@/styles/App.scss'

const App: React.FC = () => {
    return (
        <React.Fragment>
            <Button danger>My Button</Button>
            <h1>This is the first time</h1>
            <h2>This is second time</h2>
            <img className="banner" src={Banner} />
            <Github />
        </React.Fragment>
    )
}

export default App
