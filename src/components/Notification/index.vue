<template>
  <div />
</template>
<script>
export default {
  props: {
    warningMessage: {
      type: String,
      default: '重大警告测试'
    }
  },
  created() {
    this.openNotify()
  },
  methods: {
    openNotify() {
      this.$notify({
        title: '告警窗口',
        position: 'bottom-right',
        duration: 0,
        customClass: 'ecmp-notify-warning',
        dangerouslyUseHTMLString: true,
        message: `<p>${this.warningMessage}</p>`
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
        right: 30px;
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
