/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListEstado() {
    return request({
        url: '/estados',
        method: 'get'
    });
}