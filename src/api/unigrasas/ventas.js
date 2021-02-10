/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListAnios() {
    return request({
        url: '/ventas_lista_anos',
        method: 'get'
    });
}

export function getListMeses(ano) {
    return request({
        url: '/ventas_lista_meses',
        method: 'get',
        params: { 'ano': ano }
    });
}

export function getListClientes(data) {
    return request({
        url: '/ventas_clientes',
        method: 'get',
        params: data
    });
}

export function getListUsuarios(data) {
    return request({
        url: '/ventas_usuarios',
        method: 'get',
        params: data
    });
}

export function getListProductos(data) {
    return request({
        url: '/ventas_productos',
        method: 'get',
        params: data
    });
}

export function getListVentas(data) {
    return request({
        url: '/ventas',
        method: 'get',
        params: data
    });
}