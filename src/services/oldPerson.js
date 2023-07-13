import {ADD_OLD,DELETE_OLD,UPDATE_OLD,SELECT_OLD,SELECT_ALL_OLD} from './api'
import {METHOD, request} from '@/utils/request'

export async function addOld(formData) {
  return request(ADD_OLD, METHOD.POST, formData)
}

export async function deleteOld(id) {
  return request(DELETE_OLD + id, METHOD.DELETE)
}

export async function updateOld(formData) {
  return request(UPDATE_OLD, METHOD.PUT, formData)
}

export async function selectOld(parameter) {
  return request(SELECT_OLD + parameter, METHOD.GET)
}

export async function selectAllOld() {
  return request(SELECT_ALL_OLD, METHOD.GET)
}
