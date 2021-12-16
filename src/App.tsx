import React from 'react'
import Button from '@/components/button'
import Banner from '@/static/images/banner.png'
import Github from '@/static/icons/github.svg'
// import { a } from '@/utils/test'

import '@/styles/App.scss'

const App: React.FC = () => {
    const onFocus = () => {}

    const onBlur = () => {}

    return (
        <React.Fragment>
            <Button danger>My Button</Button>
            <h1>This is the first time</h1>
            <h2>This is second time</h2>
            <img className="banner" src={Banner} />
            <Github />
            <input
                className="phuongna"
                type="text"
                id="input-1"
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </React.Fragment>
    )
}

export default App
