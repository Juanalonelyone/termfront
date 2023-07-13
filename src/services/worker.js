import {ADD_WORKER,DELETE_WORKER,UPDATE_WORKER,SELECT_WORKER,SELECT_ALL_WORKER} from './api'
import {METHOD, request} from '@/utils/request'

export async function addWorker(worker) {
  return request(ADD_WORKER, METHOD.POST, worker)
}

export async function deleteWorker(id) {
  return request(DELETE_WORKER + id, METHOD.DELETE)
}

export async function updateWorker(worker) {
  return request(UPDATE_WORKER, METHOD.PUT, worker)
}

export async function selectWorker(parameter) {
  return request(SELECT_WORKER + parameter, METHOD.GET)
}

export async function selectAllWorker() {
  return request(SELECT_ALL_WORKER, METHOD.GET)
}
