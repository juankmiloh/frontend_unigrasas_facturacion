/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getTercerosProceso(id) {
    return request({
        url: '/terceros_proceso',
        method: 'get',
        params: { 'idProceso': id }
    });
}

export function createTercero(data) {
    return request({
        url: '/terceros',
        method: 'post',
        data
    });
}

export function updateTercero(data) {
    return request({
        url: '/terceros',
        method: 'put',
        data: data
    });
}

export function deleteTercero(id) {
    return request({
        url: '/terceros',
        method: 'delete',
        params: { 'idtercero': id }
    });
}