/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListTiposancion() {
    return request({
        url: '/tiposancion',
        method: 'get'
    });
}