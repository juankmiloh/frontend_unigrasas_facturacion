/* jshint esversion: 6 */
/* eslint-disable */
export const CONSTANTS = {
    tableColumnsItems: [{
            label: 'Nombre',
            prop: 'nombre',
            width: 300
        },
        {
            label: 'Nit',
            prop: 'nit',
            width: 110
        },
        {
            label: 'Direccion',
            prop: 'direccion',
            // width: 200
        },
        {
            label: 'Email',
            prop: 'email',
            // width: 125
        },
        {
            label: 'Teléfono',
            prop: 'telefono',
            width: 110
        },
        {
            label: 'Registro',
            prop: 'registro',
            width: 110
        }
    ],
    formItem: {
        idcliente: '',
        tipopersona: '',
        nit: '',
        nombre: '',
        direccion: '',
        email: '',
        telefono: ''
    },
    domItem: [{
            type: 'radiogroup',
            prop: 'tipopersona',
            label: ' '
        },
        {
            type: 'text',
            prop: 'nit',
            label: 'Nit',
            placeholder: 'Nit del cliente'
        },
        {
            type: 'text',
            prop: 'nombre',
            label: 'Nombre',
            placeholder: 'Nombre del cliente'
        },
        {
            type: 'text',
            prop: 'direccion',
            label: 'Dirección',
            placeholder: 'Dirección del cliente'
        },
        {
            type: 'text',
            prop: 'email',
            label: 'Email',
            placeholder: 'Correo electrónico'
        },
        {
            type: 'number',
            prop: 'telefono',
            label: 'Teléfono',
            placeholder: 'Teléfono del cliente'
        },
    ],
    rulesFormItem: {
        tipopersona: [{
            required: true,
            message: 'Seleccione un tipo de persona',
            trigger: 'change'
        }],
        nombre: [
            { required: true, message: 'Ingrese un nombre', trigger: 'blur' }
        ],
        direccion: [
            { required: true, message: 'Ingrese una dirección', trigger: 'blur' }
        ],
        nit: [
            { required: true, message: 'Ingrese el NIT', trigger: 'blur' }
        ],
        email: [
            { type: "email", required: true, message: 'Ingrese un correo electrónico válido', trigger: 'blur' },
        ],
        telefono: [
            { required: true, message: 'Ingrese número de teléfono' },
            { type: 'number', message: 'Este campo debe ser numérico' }
        ],
    },
    dataFormItem: {
        tipopersona: [{
                id: 1,
                label: 'Persona natural',
                value: 1
            },
            {
                id: 2,
                label: 'Persona jurídica',
                value: 2
            }
        ],

    }
};