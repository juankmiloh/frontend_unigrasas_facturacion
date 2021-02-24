/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListClienteProducto(data) {
    return request({
        url: '/producto_cliente',
        method: 'post',
        data
    });
}

export function getListProductoCliente(data) {
    return request({
        url: '/cliente_producto',
        method: 'post',
        data
    });
}

export function getListClienteVendedor(data) {
    return request({
        url: '/vendedor_cliente',
        method: 'post',
        data
    });
}