import React, { lazy, Suspense } from 'react'

import AdminFooter from '@/layouts/footer/admin-footer'
import AdminHeader from '@/layouts/header/admin-header'
import ClientFooter from '@/layouts/footer/client-footer'
import ClientHeader from '@/layouts/header/client-header'
import { PageLoading } from '@/common-components'
import { Router, Switch } from 'wouter'
import PublicRoute from '@/routes/PublicRoute'
import PrivateRoute from '@/routes/PrivateRoute'

const Components: any = {
    AdminHome: lazy(
        () =>
            import(
                /* webpackPrefetch: true */ '@/modules/admin/containers/AdminHome'
            ),
    ),
    Login: lazy(
        () =>
            import(
                /* webpackPrefetch: true */ '@/modules/auth/containers/login'
            ),
    ),
    Register: lazy(
        () =>
            import(
                /* webpackPrefetch: true */ '@/modules/auth/containers/register'
            ),
    ),
    ClientHome: lazy(
        () =>
            import(
                /* webpackPrefetch: true */ '@/modules/client/containers/ClientHome'
            ),
    ),
    About: lazy(
        () =>
            import(
                /* webpackPrefetch: true */ '@/modules/client/containers/About'
            ),
    ),
    NotFound: lazy(
        () =>
            import(/* webpackPrefetch: true */ '@/common-components/not-found'),
    ),
}

const LazyCompoent = ({ component = 'NotFound', ...props }) => {
    const View = Components[component] || Components['NotFound']
    return (
        <Suspense fallback={<PageLoading />}>
            <View {...props} />
        </Suspense>
    )
}

const Routes: React.FC = () => {
    return (
        <Suspense fallback={<PageLoading />}>
            <Router>
                <Switch>
                    <PublicRoute
                        exact
                        path="/login"
                        header={false}
                        footer={false}
                        component={() => <LazyCompoent component="Login" />}
                    />
                    <PublicRoute
                        exact
                        path="/register"
                        header={false}
                        footer={false}
                        component={() => <LazyCompoent component="register" />}
                    />
                    <PublicRoute
                        exact
                        path="/"
                        header={<ClientHeader />}
                        footer={<ClientFooter />}
                        component={() => (
                            <LazyCompoent component="ClientHome" />
                        )}
                    />
                    <PublicRoute
                        exact
                        path="/about"
                        header={<ClientHeader />}
                        footer={<ClientFooter />}
                        component={() => <LazyCompoent component="About" />}
                    />
                    <PrivateRoute
                        exact
                        path="/admin"
                        header={<AdminHeader />}
                        footer={<AdminFooter />}
                        component={() => <LazyCompoent component="AdminHome" />}
                    />
                    <PublicRoute
                        path="/:rest*"
                        header={false}
                        footer={false}
                        component={() => <LazyCompoent component="NotFound" />}
                    />
                </Switch>
            </Router>
        </Suspense>
    )
}

export default Routes
