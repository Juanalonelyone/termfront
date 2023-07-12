import {ADD_VOL, DELETE_VOL, SELECT_ALL_VOL, SELECT_VOL, UPDATE_VOL} from './api'
import {METHOD, request} from '@/utils/request'

export async function addVol(vol) {
    return request(ADD_VOL, METHOD.POST, vol)
}

export async function deleteVol(id) {
    return request(DELETE_VOL + id, METHOD.DELETE)
}

export async function updateVol(vol) {
    return request(UPDATE_VOL, METHOD.PUT, vol)
}

export async function selectVol(parameter) {
    return request(SELECT_VOL + parameter, METHOD.GET)
}

export async function selectAllVol() {
    return request(SELECT_ALL_VOL, METHOD.GET)
}
