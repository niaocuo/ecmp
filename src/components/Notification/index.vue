<template>
  <div />
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      websock: null,
      notifyInstance: ''
    }
  },
  created() {
    this.initWebSocket()
  },
  destroyed() {
    this.websock.close()
    this.notifyInstance.close()
  },
  methods: {
    initWebSocket() {
      this.websock = new WebSocket(`ws://${location.host}/wsUrl/websocket/${getToken()}`)
      this.websock.onmessage = this.websocketMessage
      this.websock.onopen = this.websocketOpen
      this.websock.onerror = this.websocketError
      this.websock.onclose = this.websocketClose
    },
    websocketOpen() { // 连接建立之后执行send方法发送数据
      this.websocketSend('test')
    },
    websocketError() { // 连接建立失败重连
      this.initWebSocket()
    },
    websocketMessage(e) { // 数据接收
      this.openNotify(e.data)
    },
    websocketSend(Data) { // 数据发送
      this.websock.send(Data)
    },
    websocketClose(e) { // 关闭
      console.log('断开连接', e)
    },
    openNotify(data) {
      this.notifyInstance = this.$notify({
        title: '告警窗口',
        position: 'bottom-right',
        duration: 0,
        customClass: 'ecmp-notify-warning',
        dangerouslyUseHTMLString: true,
        message: `<p>${data}</p>`
      })
    }
  }
}
</script>
<style lang="scss">
  /* 自定义告警通知样式 */
  .ecmp-notify-warning{
    &.el-notification{
      padding: 0;
      &.right{
        right: 20px;
      }
    }
    .el-notification__group{
      width: 100%;
      margin: 0;
      .el-notification__title{
        text-align: center;
        background: #ff4f00;
        color: #fff;
        font-weight: normal;
        padding: 15px;
      }
      .el-notification__content{
        padding:10px 15px 15px;
      }
      .el-notification__closeBtn{
        color: #fff;
      }
    }
  }
</style>
