/* jshint esversion: 6 */
/* eslint-disable */
import Mock from 'mockjs'
import { deepClone } from '../../src/utils/index.js'
import { asyncRoutes, constantRoutes } from './routes.js'

const routes = deepClone([...constantRoutes, ...asyncRoutes])

// son los permisos del rol que se pueden modificar desde la vista -> '/permission/role' src\views\permission\role.vue
const roles = [{
        key: '1',
        name: 'administrador',
        description: 'Juan Camilo Realizará la administración del aplicativo',
        routes: routes
    },
    {
        key: '2',
        name: 'usuario',
        description: 'Usuario regular es aquel que puede manejar los procesos que tenga asignados ',
        routes: routes
    },
    {
        key: '3',
        name: 'editor',
        description: 'Normal Editor. Can see all pages except permission page',
        routes: routes.filter(i => i.path !== '/permission') // just a mock
    },
    // {
    //   key: 'visitor',
    //   name: 'visitor',
    //   description: 'Just a visitor. Can only see the home page and the document page',
    //   routes: [{
    //     path: '',
    //     redirect: 'dashboard',
    //     children: [
    //       {
    //         path: 'dashboard',
    //         name: 'Dashboard',
    //         meta: { title: 'dashboard', icon: 'dashboard' }
    //       }
    //     ]
    //   }]
    // }
]

export default [
    // mock get all routes form server
    {
        url: '/routes',
        type: 'get',
        response: _ => {
            return {
                code: 20000,
                data: routes
            }
        }
    },

    // mock get all roles form server
    {
        url: '/roles',
        type: 'get',
        response: _ => {
            return {
                code: 20000,
                data: roles
            }
        }
    },

    // add role
    {
        url: '/role',
        type: 'post',
        response: {
            code: 20000,
            data: {
                key: Mock.mock('@integer(300, 5000)')
            }
        }
    },

    // update role
    {
        url: '/role/[A-Za-z0-9]',
        type: 'put',
        response: {
            code: 20000,
            data: {
                status: 'success'
            }
        }
    },

    // delete role
    {
        url: '/role/[A-Za-z0-9]',
        type: 'delete',
        response: {
            code: 20000,
            data: {
                status: 'success'
            }
        }
    }
]