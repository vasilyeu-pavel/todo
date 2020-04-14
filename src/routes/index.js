import React, { Suspense } from 'react';
import Preloader from '../components/Preloader/Preloader';
import MainLayout from '../layouts';

const Application = React.lazy(() => import('../pages/Application'));
const SignIn = React.lazy(() => import('../pages/SignIn'));

export const routes = [
    {
        path: '/auth',
        exact: true,
        layout: MainLayout,
        component: (props) => (
            <div>
                <Suspense fallback={<Preloader />}>
                    <SignIn {...props} />
                </Suspense>
            </div>
        ),
    },
    {
        path: '/',
        exact: false,
        layout: MainLayout,
        component: (props) => (
            <div style={{ width: '100%' }}>
                <Suspense fallback={<Preloader />}>
                    <Application {...props} />
                </Suspense>
            </div>
        ),
    },
];

