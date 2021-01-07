/* jshint esversion: 6 */
/* eslint-disable */
import request from '@/utils/request';

export function getListDecision() {
    return request({
        url: '/decision',
        method: 'get'
    });
}