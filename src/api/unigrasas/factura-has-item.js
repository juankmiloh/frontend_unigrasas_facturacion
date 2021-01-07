/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListFacturaItems(id) {
    return request({
        url: '/facturaHasItems/detalle',
        method: 'get',
        params: { 'idproceso': id }
    });
}

export function createFacturaItems(data) {
    return request({
        url: '/facturaHasItems',
        method: 'post',
        data
    });
}

export function updateFacturaItems(data) {
    return request({
        url: '/facturaHasItems/update',
        method: 'put',
        data: data
    });
}

export function deleteFacturaItems(data) {
    return request({
        url: '/facturaHasItems',
        method: 'delete',
        data: data
    });
}