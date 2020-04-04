import { Application } from '../pages';
import MainLayout from '../layouts';

export const routes = [{
    path: '/',
    exact: true,
    layout: MainLayout,
    component: Application,
}];
