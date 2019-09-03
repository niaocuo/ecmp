import Vue from 'vue'
const router = {
  getList: function () {
    return new Promise((resolve, reject) => {
      Vue.axios.get(api).then((response) => {
        // 成功
        resolve(response.data)
      }).catch(res => {
        // 失败
        reject(res)
      })
    })
  }
}
export default router
