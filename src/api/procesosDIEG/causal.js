/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListCausal() {
    return request({
        url: '/causal',
        method: 'get'
    });
}