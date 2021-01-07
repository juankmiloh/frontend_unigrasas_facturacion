/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListUsuarios() {
    return request({
        url: '/usuarios',
        method: 'get'
    });
}

export function getAllUsuarios() {
    return request({
        url: '/lista_usuarios',
        method: 'get'
    });
}

export function getListNicknames() {
    return request({
        url: '/nicknames',
        method: 'get'
    });
}

export function getListRol() {
    return request({
        url: '/rol',
        method: 'get'
    });
}

export function getUsuario(id) {
    return request({
        url: '/usuario/detalle',
        method: 'get',
        params: { 'idusuario': id }
    });
}

export function createUsuario(data) {
    return request({
        url: '/usuarios',
        method: 'post',
        data
    });
}

export function updateUsuario(data) {
    return request({
        url: '/usuarios',
        method: 'put',
        data
    });
}

export function deleteUsuario(id) {
    return request({
        url: '/usuarios',
        method: 'delete',
        params: { 'idusuario': id }
    });
}

export function createUser(data) {
    return request({
        url: '/user/create',
        method: 'post',
        data
    });
}