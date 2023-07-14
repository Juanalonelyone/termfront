import {METHOD, request} from "@/utils/request";
import {ADD_CAP, DELETE_CAP, SELECT_ALL_CAP, SELECT_CAP, UPDATE_CAP} from "@/services/api";


export async function addCap(cap) {
    return request(ADD_CAP, METHOD.GET,cap)
}

export async function deleteCap(id) {
    return request(DELETE_CAP + id, METHOD.GET)
}

export async function updateCap() {
    return request(UPDATE_CAP, METHOD.GET)
}

export async function selectAllCap() {
    return request(SELECT_ALL_CAP, METHOD.GET)
}

export async function selectCap(id) {
    return request(SELECT_CAP + id, METHOD.GET)
}
