/* jshint esversion: 6 */
/* eslint-disable */
export const CONSTANTS = {
    tableColumnsItems: [{
            label: 'Nombre',
            prop: 'label',
            width: 300
        },
        {
            label: 'Identificador',
            prop: 'id',
            // width: 270
        },
        {
            label: 'Precio',
            prop: 'precio',
            // width: 125
        },
        {
            label: 'Descripción',
            prop: 'descripcion',
            // width: 110
        },
        {
            label: 'Fecha registro',
            prop: 'registro',
            // width: 110
        }
    ],
    formItem: {
        value: '',
        label: '',
        id: '',
        precio: '',
        descripcion: ''
    },
    domItem: [{
            type: 'text',
            prop: 'label',
            label: 'Nombre',
            placeholder: 'Nombre del item'
        },
        {
            type: 'number',
            prop: 'id',
            label: 'Identificador',
            placeholder: 'Código item'
        },
        {
            type: 'number',
            prop: 'precio',
            label: 'Precio',
            placeholder: 'Precio del item'
        },
        {
            type: 'textarea',
            prop: 'descripcion',
            label: 'Descripción',
            placeholder: 'Ingrese una descripción'
        },
    ],
    rulesFormItem: {
        label: [
            { required: true, message: 'Ingrese un nombre', trigger: 'blur' }
        ],
        id: [
            { required: true, message: 'Ingrese el identificador' },
            { type: 'number', message: 'Este campo debe ser numérico' }
        ],
        precio: [
            { required: true, message: 'Ingrese el precio' },
            { type: 'number', message: 'Este campo debe ser numérico' }
        ],
        descripcion: [
            { required: false, message: 'Ingrese un nombre', trigger: 'blur' }
        ],
    },
    dataFormItem: {
        iditem: [{
                id: 1,
                label: 'Producto1',
                value: 1
            },
            {
                id: 2,
                label: 'Producto2',
                value: 2
            }
        ],
    }
};