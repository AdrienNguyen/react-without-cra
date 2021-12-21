import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import App from '@/App'

const renderer = createRenderer()

it('renders <App /> without crashing', () => {
    renderer.render(<App />)
    const renderOutput = renderer.getRenderOutput()
    expect(renderOutput).toMatchSnapshot()
})
