import { Application, SignIn } from '../pages';
import MainLayout from '../layouts';

export const routes = [
    {
        path: '/auth',
        exact: true,
        layout: MainLayout,
        component: SignIn,
    },
    {
        path: '/',
        exact: false,
        layout: MainLayout,
        component: Application,
    },
];

