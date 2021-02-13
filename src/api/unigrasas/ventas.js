/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListAnios() {
    return request({
        url: '/ventas_lista_anos',
        method: 'get'
    });
}

export function getListMeses(data) {
    return request({
        url: '/ventas_lista_meses',
        method: 'post',
        data
    });
}

export function getListClientes(data) {
    return request({
        url: '/ventas_clientes',
        method: 'post',
        data
    });
}

export function getListUsuarios(data) {
    return request({
        url: '/ventas_usuarios',
        method: 'post',
        data
    });
}

export function getListProductos(data) {
    return request({
        url: '/ventas_productos',
        method: 'post',
        data
    });
}

export function getListVentasAno(data) {
    return request({
        url: '/ventas_ano',
        method: 'post',
        data
    });
}

export function getListVentasAnoMes(data) {
    return request({
        url: '/ventas_ano_mes',
        method: 'post',
        data
    });
}