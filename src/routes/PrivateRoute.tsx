import NotFound from '@/common-components/not-found'
import Layout from '@/layouts'
import React from 'react'
import { Route } from 'wouter'

const PrivateRoute = ({
    component: Component,
    header,
    footer,
    ...rest
}: any) => {
    const role = localStorage.getItem('role')
    const renderChildren = (props: any) =>
        !!role ? (
            <Layout header={header} footer={footer}>
                <Component {...props} />
            </Layout>
        ) : (
            <NotFound />
        )
    return <Route {...rest}>{renderChildren}</Route>
}

export default PrivateRoute
