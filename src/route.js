import React from 'react';

const SignIn = React.lazy(() => import('./pages/SignIn/SignIn'));

const route = [
    { path: '/login', exact: true, name: 'Login', component: SignIn }
];

export default route;
