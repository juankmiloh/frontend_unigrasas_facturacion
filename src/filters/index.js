/* jshint esversion: 6 */
/* eslint-disable */
// import parseTime, formatTime and set to filter
import moment from 'moment';
export { parseTime, formatTime }
from '@/utils';

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }
    return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour')
    } else {
        return pluralize(~~(between / 86400), ' day')
    }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
    const si = [
        { value: 1E18, symbol: 'E' },
        { value: 1E15, symbol: 'P' },
        { value: 1E12, symbol: 'T' },
        { value: 1E9, symbol: 'G' },
        { value: 1E6, symbol: 'M' },
        { value: 1E3, symbol: 'k' }
    ]
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
        }
    }
    return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case
 * @param {String} string
 */
export function uppercase(string) {
    return string.toUpperCase()
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
    const text = string.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Lower case first char
 * @param {String} string
 */
export function lowercaseFirst(string) {
    return string.charAt(0).toLowerCase() + string.slice(1)
}

/**
 * Formatear fecha
 * @param {String} string
 */
export function formatDate(string) {
    return moment(string).format('DD/MM/YYYY');
}

/**
 * Formatear fecha
 * @param {String} string
 */
export function formatDateHour(string) {
    return moment(string).format('DD/MM/YYYY hh:mm:ss');
}

/**
 * Obtener hora de fecha
 * @param {String} string
 */
export function getHour(string) {
    return moment(string).format('hh:mm:ss');
}

/**
 * Obtener dia de fecha
 * @param {String} string
 */
export function getDay(string) {
    return moment(string).format('DD');
}

/**
 * Obtener mes de fecha
 * @param {String} string
 */
export function getMonth(string) {
    return moment(string).format('MM');
}

/**
 * Obtener año de fecha
 * @param {String} string
 */
export function getYear(string) {
    return moment(string).format('YYYY');
}

/**
 * Formatear numero
 * @param {number} number
 */
export function formatNumber(number) {
    return new Intl.NumberFormat('de-DE').format(number);
}