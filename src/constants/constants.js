/* jshint esversion: 6 */
/* eslint-disable */
export const CONSTANTS = {
    tableColumnsAdmin: [{
            label: 'Factura',
            prop: 'idfactura',
            width: '',
            filter: 'filterFactura'
        },
        {
            label: 'Cliente',
            prop: 'cliente',
            width: 350,
            filter: 'filterCliente'
        },
        {
            label: 'Emisión',
            prop: 'f_emision',
            width: '',
            filter: 'filterFcreacion'
        },
        {
            label: 'Total',
            prop: 'total',
            width: '',
            filter: 'filterTotal'
        },
        {
            label: 'Vendedor',
            prop: 'usuario',
            width: '',
            filter: 'filterVendedor'
        }
    ],
    tableColumnsAbogado: [{
            label: 'Numeración',
            prop: 'idfactura',
            width: '',
            filter: 'filterFactura'
        },
        {
            label: 'Cliente / CUFE',
            prop: 'cliente',
            width: 350,
            filter: 'filterCliente'
        },
        {
            label: 'Creacion',
            prop: 'f_emision',
            width: '',
            filter: 'filterFcreacion'
        },
        {
            label: 'Total',
            prop: 'total',
            width: '',
            filter: 'filterTotal'
        },
        {
            label: 'Vendedor',
            prop: 'usuario',
            width: '',
            filter: 'filterVendedor'
        }
    ],
    tableColumnsEtapas: [{
            label: '#',
            prop: 'idetapa',
            width: 70
        },
        {
            label: 'Radicado',
            prop: 'radicadoEtapa'
        },
        {
            label: 'Etapa',
            prop: 'nombreEtapa',
            width: 300
        },
        {
            label: 'Fecha de inicio',
            prop: 'fechaInicioEtapa'
        },
        {
            label: 'Fecha fin',
            prop: 'fechaFinEtapa'
        },
        {
            label: 'Observación',
            prop: 'observacionEtapa',
            width: 300
        }
    ],
    filter: [
        { text: 'Energía', value: 'Energía' },
        { text: 'Gas', value: 'Gas' },
        { text: 'GLP', value: 'GLP' },
    ],
    rulesFormProceso: {
        // idfactura: [
        //     { required: true, message: 'Ingrese numeración', trigger: 'blur' },
        //     // { min: 17, max: 17, message: 'La longitud del expediente debe ser de 17 caracteres', trigger: 'blur' }
        // ],
        cliente: [{
            required: true,
            message: 'Seleccione un cliente',
            trigger: 'change'
        }],
        divisa: [{
            required: true,
            message: 'Seleccione una divisa',
            trigger: 'change'
        }],
        f_emision: [{
            // type: 'date',
            required: true,
            message: 'Ingrese una fecha válida',
            trigger: 'change'
        }],
        usuario: [{
            required: true,
            message: 'Seleccione un usuario',
            trigger: 'change'
        }],
    },
    formAgregar: {
        // idfactura: '',
        cliente: '',
        divisa: '',
        f_emision: '',
        usuario: ''
    },
    formUsuario: {
        usuario: '',
        idfactura: ''
    },
    formDetalleProceso: {
        idfactura: '',
        cliente: '',
        divisa: '',
        f_emision: '',
        f_vencimiento: '',
        idusuario: '',
        descripcion: '',
        metodopago: '',
        mediopago: '',
        f_pago: '',
        // total: ''
    },
    rulesDetalleProceso: {
        cliente: [{
            required: false,
            message: 'Seleccione un cliente',
            trigger: 'change'
        }],
        divisa: [{
            required: false,
            message: 'Seleccione una divisa',
            trigger: 'change'
        }],
        f_emision: [{
            // type: 'date',
            required: true,
            message: 'Ingrese una fecha válida',
            trigger: 'change'
        }],
        f_vencimiento: [{
            // type: 'date',
            required: true,
            message: 'Ingrese una fecha válida',
            trigger: 'change'
        }],
        usuario: [{
            required: false,
            message: 'Seleccione un usuario',
            trigger: 'change'
        }],
        metodopago: [{
            required: true,
            message: 'Seleccione un método de pago',
            trigger: 'change'
        }],
        mediopago: [{
            required: true,
            message: 'Seleccione un medio de pago',
            trigger: 'change'
        }],
        f_pago: [{
            // type: 'date',
            required: true,
            message: 'Ingrese una fecha válida',
            trigger: 'change'
        }],
        descripcion: [
            { required: false, message: 'Ingrese una nota', trigger: 'change' },
            { min: 10, max: 140, message: 'La longitud de la nota debe ser mínimo de 10 caracteres', trigger: 'blur' }
        ],
    },
    formAgregarEtapa: {
        etapa: '',
        fechaInicioEtapa: null,
        fechaFinEtapa: null,
        observacionEtapa: ''
    },
    rulesFormEtapa: {
        etapa: [{
            required: true,
            message: 'Seleccione una etapa',
            trigger: 'change'
        }],
        fechaInicioEtapa: [{
            required: true,
            message: 'Ingrese una fecha válida',
            trigger: 'change'
        }],
        observacionEtapa: [{
            required: false,
            message: 'Ingrese una observación',
            trigger: 'blur'
        }]
    },
    formUser: {
        nombre: '',
        apellido: '',
        genero: '',
        nickname: '',
        contrasena: '',
        rol: '',
        descripcion: '',
        avatar: '',
        token: ''
    },
    rulesFormUser: {
        nombre: [
            { required: true, message: 'Ingrese nombre', trigger: 'blur' }
        ],
        apellido: [
            { required: true, message: 'Ingrese apellido', trigger: 'blur' }
        ],
        genero: [{
            required: true,
            message: 'Seleccione un género',
            trigger: 'change'
        }],
        rol: [{
            required: true,
            message: 'Seleccione un rol',
            trigger: 'change'
        }],
        descripcion: [{
            required: true,
            message: 'Ingrese una descripción del usuario',
            trigger: 'change'
        }],
    },
    dataGenero: [{
            idgenero: 1,
            nombre: 'Hombre'
        },
        {
            idgenero: 2,
            nombre: 'Mujer'
        }
    ]
};