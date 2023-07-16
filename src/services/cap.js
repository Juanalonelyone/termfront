import {METHOD, request} from "@/utils/request";
import {ADD_CAP, CLOSE, DELETE_CAP, OPEN, SELECT_ALL_CAP, SELECT_CAP, UPDATE_CAP} from "@/services/api";


export async function addCap(cap) {
    return request(ADD_CAP, METHOD.POST, cap)
}

export async function deleteCap(id) {
    return request(DELETE_CAP + id, METHOD.DELETE)
}

export async function updateCap(cap) {
    return request(UPDATE_CAP, METHOD.PUT, cap)
}

export async function selectAllCap() {
    return request(SELECT_ALL_CAP, METHOD.GET)
}

export async function selectCap(id) {
    return request(SELECT_CAP + id, METHOD.GET)
}


export async function Open() {
    return request(OPEN, METHOD.GET)
}


export async function Close() {
    return request(CLOSE, METHOD.GET)
}
