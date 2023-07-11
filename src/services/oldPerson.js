import {ADD_OLD,DELETE_OLD,UPDATE_OLD,SELECT_OLD,SELECT_ALL_OLD} from './api'
import {METHOD, request} from '@/utils/request'

export async function addOld(old) {
  return request(ADD_OLD, METHOD.POST, old)
}

export async function deleteOld(id) {
  return request(DELETE_OLD + id, METHOD.DELETE)
}

export async function updateOld(old) {
  return request(UPDATE_OLD, METHOD.PUT, old)
}

export async function selectOld(parameter) {
  return request(SELECT_OLD + parameter, METHOD.GET)
}

export async function selectAllOld() {
  return request(SELECT_ALL_OLD, METHOD.GET)
}
