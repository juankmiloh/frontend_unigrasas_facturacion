/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListItems() {
    return request({
        url: '/items',
        method: 'get'
    });
}

export function createItem(data) {
    return request({
        url: '/items',
        method: 'post',
        data
    });
}

export function updateItem(data) {
    return request({
        url: '/items',
        method: 'put',
        data
    });
}

export function deleteItem(data) {
    return request({
        url: '/items',
        method: 'delete',
        data
    });
}