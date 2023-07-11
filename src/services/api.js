//跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL = 'http://127.0.0.1:8000'
module.exports = {
  //管理员操作
  LOGIN: `${BASE_URL}/login/`,
  // 老人表操作
  ADD_OLD: `${BASE_URL}/add_oldPerson/`,
  DELETE_OLD: `${BASE_URL}/delete_oldPerson/`,
  UPDATE_OLD: `${BASE_URL}/update_oldPerson/`,
  SELECT_OLD:`${BASE_URL}/select_old/`,
  SELECT_ALL_OLD:`${BASE_URL}/select_allOld/`,
  //todo:其他表操作
}
