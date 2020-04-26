<template>
  <div class="FooterBottom">
    底部
    <Notification/>
  </div>
</template>
<script>
import Notification from '@/components/Notification'
export default {
  name: 'FooterBottom',
  components: { Notification }
}
</script>
<style lang="scss" scoped>
.FooterBottom{
    height: 20px;
    border-top: 1px solid #999;
    text-align: center;
    // line-height: 100px
}
</style>
