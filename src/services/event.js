import {METHOD, request} from "@/utils/request";
import {DELETE_EVENT, SELECT_ALL_EVENT, SELECT_EVENT} from "@/services/api";

export async function selectEvent(parameter) {
    return request(SELECT_EVENT + parameter, METHOD.GET)
}

export async function selectAllEvent() {
    return request(SELECT_ALL_EVENT, METHOD.GET)
}

export async function deleteEvent(id) {
    return request(DELETE_EVENT + id, METHOD.DELETE)
}
