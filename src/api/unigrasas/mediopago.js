/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListMediopago() {
    return request({
        url: '/mediopago',
        method: 'get'
    });
}