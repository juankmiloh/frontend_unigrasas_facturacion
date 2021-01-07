/* jshint esversion: 6 */
/* eslint-disable */
const tokens = {
    administrador: {
        token: 'administrador-token'
    },
    usuario: {
        token: 'usuario-token'
    },
    revisor: {
        token: 'revisor-token'
    },
    aprobador: {
        token: 'aprobador-token'
    },
    consultor: {
        token: 'consultor-token'
    },
    editor: {
        token: 'editor-token'
    },
    visitor: {
        token: 'visitor-token'
    },
    juank: {
        token: 'juank-token'
    },
}

const users = {
    'administrador-token': {
        roles: ['administrador'],
        introduction: 'Es un adminsitrador del sistema',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Administrador'
    },
    'usuario-token': {
        roles: ['usuario'],
        introduction: 'Soy un usuario regular de los datos',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Usuario'
    },
    'revisor-token': {
        roles: ['revisor'],
        introduction: 'Soy un revisor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Revisor'
    },
    'aprobador-token': {
        roles: ['aprobador'],
        introduction: 'Soy un aprobador',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Aprobador'
    },
    'consultor-token': {
        roles: ['consultor'],
        introduction: 'Soy un consultor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Consultor'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    },
    'visitor-token': {
        roles: ['visitor'],
        introduction: 'I am an visitor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Visitor'
    },
    'juank-token': {
        roles: ['administrador'],
        introduction: 'I am an visitor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Visitor'
    }
}

export default [
    // user login
    // {
    //     url: '/user/login',
    //     type: 'post',
    //     response: config => {
    //         console.log('config login -> ', config);
    //         const { username } = config.body
    //         console.log({ username });
    //         const token = tokens[username]

    //         console.log(config);

    //         // mock error
    //         if (!token) {
    //             return {
    //                 code: 60204,
    //                 message: 'Usuario y contraseña incorrectos.'
    //             }
    //         }

    //         return {
    //             code: 20000,
    //             data: token
    //         }
    //     }
    // },

    // get user info
    // {
    //     url: '/user/info\.*',
    //     type: 'get',
    //     response: config => {
    //         const { token } = config.query
    //         const info = users[token]

    //         console.log('entro al token!');

    //         // mock error
    //         if (!info) {
    //             return {
    //                 code: 50008,
    //                 message: 'Error de inicio de sesión, no se pueden obtener los detalles del usuario.'
    //             }
    //         }

    //         return {
    //             code: 20000,
    //             data: info
    //         }
    //     }
    // },

    // user logout
    {
        url: '/user/logout',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    }
]