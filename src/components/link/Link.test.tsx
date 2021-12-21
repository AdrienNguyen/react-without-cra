import React from 'react'
import renderer from 'react-test-renderer'
import Link from './Link'

test('Link changes the class when hovered', () => {
    const component = renderer.create(
        <Link page="http://wwww.facebook.com">Facebook</Link>,
    )
    let tree = component.toJSON() as any

    expect(tree).toMatchSnapshot()

    renderer.act(() => {
        tree.props.onMouseEnter()
    })

    tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    renderer.act(() => {
        tree.props.onMouseLeave()
    })

    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})
