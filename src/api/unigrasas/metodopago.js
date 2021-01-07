/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListMetodopago() {
    return request({
        url: '/metodopago',
        method: 'get'
    });
}