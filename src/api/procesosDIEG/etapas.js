/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListEtapas() {
    return request({
        url: '/etapas',
        method: 'get'
    });
}

export function getEtapaProceso(id) {
    return request({
        url: '/etapa_proceso',
        method: 'get',
        params: { 'idProceso': id }
    });
}

export function createEtapa(data) {
    return request({
        url: '/etapas',
        method: 'post',
        data
    });
}

export function updateEtapa(data) {
    return request({
        url: '/etapas/update',
        method: 'put',
        data: data
    });
}

export function deleteEtapa(etapa) {
    return request({
        url: '/etapas',
        method: 'delete',
        data: etapa
    });
}