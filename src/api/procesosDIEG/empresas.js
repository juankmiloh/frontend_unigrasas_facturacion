/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListEmpresas(idservicio) {
    return request({
        url: '/empresa',
        method: 'get',
        params: { 'servicio': idservicio }
    });
}

export function getAllEmpresas() {
    return request({
        url: '/empresa',
        method: 'get'
    });
}