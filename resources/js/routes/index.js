import { createRouter, createWebHistory } from 'vue-router';

import AuthLayout from '../layouts/AuthLayout'
import GuestLayout from '../layouts/GuestLayout'
// import App from '../layouts/App'

import Steps from '../pages/Steps/Index';
import About from '../pages/Steps/About'
import Create from '../pages/Steps/Create'
import Edit from '../pages/Steps/Edit'
import Show from '../pages/Steps/Show'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Register from '../pages/Register'

function auth(to,from,next){
    if(localStorage.getItem('token')){
        next()
        return
    }
    next('/login')
    return
}

const routes = [
    {
        redirect: {name: 'home'},
        component: GuestLayout,
        children: [
            {
                path: '/',
                name: 'home',
                component: Home,
                meta: {title:'Home'},
            },
            {
                path: '/about',
                name: 'about',
                component: About,
                meta: {title:'About us'},
            },
            {
                path: '/login',
                name: 'login',
                component: Login,
                meta: {title:'Login'},
            },
            {
                path: '/register',
                name: 'register',
                component: Register,
                meta: {title:'Register'},
            },
        ]
    },
    {
        component: AuthLayout,
        beforeEnter: auth,
        children: [
            {
                path: '/steps',
                name: 'steps',
                component: Steps,
                meta: {title:'Steps List'},
            },
            {
                path: '/steps/create',
                name: 'step.create',
                component: Create,
                meta: {title:'Create Step'},
            },
            {
                path: '/steps/edit/:id',
                name: 'step.edit',
                component: Edit,
                meta: {title:'Edit Step'},
            },
            {
                path: '/steps/show/:id',
                name: 'step.show',
                component: Show,
                meta: {title:'Show Step'},
            }
        ]
    },

];

export default createRouter({
    history: createWebHistory(),
    routes
})