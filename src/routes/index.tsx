import React, { lazy, Suspense } from 'react'

import AdminFooter from '@/layouts/footer/admin-footer'
import AdminHeader from '@/layouts/header/admin-header'
import ClientFooter from '@/layouts/footer/client-footer'
import ClientHeader from '@/layouts/header/client-header'
import { PageLoading } from '@/components'
import { Router, Switch } from 'wouter'
import PublicRoute from '@/routes/PublicRoute'
import PrivateRoute from '@/routes/PrivateRoute'

const AdminHome = lazy(() => import('@/modules/admin/containers/AdminHome'))
const Login = lazy(() => import('@/modules/auth/containers/login'))
const Register = lazy(() => import('@/modules/auth/containers/register'))
const ClientHome = lazy(() => import('@/modules/client/containers/ClientHome'))
const About = lazy(() => import('@/modules/client/containers/About'))
const NotFound = lazy(() => import('@/components/not-found'))

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
                        component={Login}
                    />
                    <PublicRoute
                        exact
                        path="/register"
                        header={false}
                        footer={false}
                        component={Register}
                    />
                    <PublicRoute
                        exact
                        path="/"
                        header={<ClientHeader />}
                        footer={<ClientFooter />}
                        component={ClientHome}
                    />
                    <PublicRoute
                        exact
                        path="/about"
                        header={<ClientHeader />}
                        footer={<ClientFooter />}
                        component={About}
                    />
                    <PrivateRoute
                        exact
                        path="/admin"
                        header={<AdminHeader />}
                        footer={<AdminFooter />}
                        component={AdminHome}
                    />
                    <PublicRoute
                        path="/:rest*"
                        header={false}
                        footer={false}
                        component={NotFound}
                    />
                </Switch>
            </Router>
        </Suspense>
    )
}

export default Routes
