/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListClientes() {
    return request({
        url: '/clientes',
        method: 'get'
    });
}

export function createCliente(data) {
    return request({
        url: '/clientes',
        method: 'post',
        data
    });
}

export function updateCliente(data) {
    return request({
        url: '/clientes',
        method: 'put',
        data
    });
}

export function deleteCliente(data) {
    return request({
        url: '/clientes',
        method: 'delete',
        data
    });
}