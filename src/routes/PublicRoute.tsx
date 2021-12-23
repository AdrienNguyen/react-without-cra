import Layout from '@/layouts'
import React from 'react'
import { Route } from 'wouter'

const PublicRoute = ({
    component: Component,
    header,
    footer,
    ...rest
}: any) => {
    const renderChildren = (props: any) => (
        <Layout header={header} footer={footer}>
            <Component {...props} />
        </Layout>
    )
    return <Route {...rest}>{renderChildren}</Route>
}

export default PublicRoute
