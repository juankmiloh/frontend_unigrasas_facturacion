/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListProcesosEmpresa(idservicio) {
    return request({
        url: '/procesos_empresa',
        method: 'get',
        params: { 'idservicio': idservicio }
    });
}

export function getListProcesosCausal(idservicio) {
    return request({
        url: '/procesos_causal',
        method: 'get',
        params: { 'idservicio': idservicio }
    });
}

export function getListProcesosEstado(idservicio) {
    return request({
        url: '/procesos_estado',
        method: 'get',
        params: { 'idservicio': idservicio }
    });
}

export function getListProcesosUsuario(idservicio) {
    return request({
        url: '/procesos_usuario',
        method: 'get',
        params: { 'idservicio': idservicio }
    });
}

export function getListCantidadProcesos(idservicio) {
    return request({
        url: '/cantidad_procesos',
        method: 'get',
        params: { 'idservicio': idservicio }
    });
}