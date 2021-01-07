/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListServicios() {
    return request({
        url: '/servicios',
        method: 'get'
    });
}

export function getServicio(id) {
    return request({
        url: '/servicio/detalle',
        method: 'get',
        params: { 'idservicio': id }
    });
}

export function createServicio(data) {
    return request({
        url: '/servicios',
        method: 'post',
        data
    });
}

export function updateServicio(data) {
    return request({
        url: '/servicios',
        method: 'put',
        data
    });
}

export function deleteServicio(id) {
    return request({
        url: '/servicios',
        method: 'delete',
        params: { 'idservicio': id }
    });
}