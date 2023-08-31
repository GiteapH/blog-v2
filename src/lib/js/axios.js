// http.js封装axios的请求方式(get请求、post请求) 
// 封装axios超时请求时间
// token设置


import axios from 'axios' // 引用axios
import config from '@/api/config'

const _baseUrl = config.baseUrl.dev // 使用到代理
const apiUrl = _baseUrl
// axios 配置
axios.defaults.timeout = 120000 // 设置接口响应时间
axios.defaults.baseURL = 'http://10.18.250.39:8088' // 这是调用数据接口,公共接口url+调用接口名
axios.defaults.headers.post['Content-Type'] = 'application/json';



// 封装get请求
export function get(url, params = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl + url, {
        params: params,
        headers: headers
      })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 封装post请求
export function post(url, data = {}, headers = {}, params = {}) {
  
  return new Promise((resolve, reject) => {
    axios.post(apiUrl + url, data, {
      headers: headers,
      params: params
    }).then(
      response => {
        // 
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}
export function put(url, data = {}, params = {}) {
  return new Promise((resolve, reject) => {
    axios.put(apiUrl + url, data, {
      params: params
    }).then(
      response => {
        // 
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}

export function del(url, data = {}, params = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(apiUrl + url, {
      data: data,
      params: params
    }).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err)
      }
    )
  })
}
export function uploadFile(file) {
  let form = new FormData()
  form.append('file', file)
  return new Promise((resolve, reject) => {
    axios.post(apiUrl + '/upload/file', null, {
      headers: { 'content-type': 'multipart/form-data' },
      data: form
    }).then(({ data }) => {
      
      if (data.resultCode == 200) {
        resolve(data.data)
      } else {
        reject(data.message)
      }
    })
  })
}
export function uploadFiles(files = []) {

  axios.create()
  let form = new FormData()
  for (let file of files) {
    
    form.append('files', file)
  }

  
  return new Promise((resolve, reject) => {
    axios.post(apiUrl + '/upload/files', form).then(({ data }) => {
      
      if (data.resultCode == 200) {
        resolve(data.data)
      } else {
        reject(data.message)
      }
    })
  })
}