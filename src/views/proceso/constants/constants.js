/* jshint esversion: 6 */
/* eslint-disable */
export const CONSTANTS = {
    tableColumnsItems: [{
            label: 'Código',
            prop: 'coditem',
            width: 94,
            width_xs: 100
        },
        {
            label: 'Producto',
            prop: 'item',
            width: 235,
            width_xs: 200
        },
        {
            label: 'Cantidad',
            prop: 'cantidad',
            // width: 110
            width_xs: 110
        },
        {
            label: 'Precio',
            prop: 'precio',
            // width: 98
            width_xs: 110
        },
        {
            label: 'Valor',
            prop: 'total',
            // width: 110
            width_xs: 150
        }
    ],
    formItem: {
        idfactura: '',
        iditem: '',
        cantidad: '',
        precio: ''
    },
    domItem: [{
            type: 'select',
            prop: 'iditem',
            label: 'Producto',
            placeholder: 'Seleccione un producto'
        },
        {
            type: 'number',
            prop: 'cantidad',
            label: 'Cantidad',
            placeholder: 'Ingrese cantidad de producto'
        },
        {
            type: 'decimal',
            prop: 'precio',
            label: 'Precio',
            placeholder: 'Ingrese el precio'
        },
    ],
    rulesFormItem: {
        iditem: [{
            required: true,
            message: 'Seleccione un producto',
            trigger: 'change'
        }],
        cantidad: [
            { required: true, message: 'Ingrese la cantidad' },
            { type: 'number', message: 'Este campo debe ser numérico' }
        ],
        precio: [
            { required: true, message: 'Ingrese un precio' },
            { type: 'number', message: 'Este campo debe ser numérico' }
        ]
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
        ]
    }
};