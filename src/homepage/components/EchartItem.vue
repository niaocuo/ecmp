<template>
  <div>
    <p class="title">{{ title }}</p>
    <div class="item-content" :style="styleType()">
      <slot name="content" />
    </div>
  </div>
</template>
<script>
import bigbg from '../../assets/dapiimg/bg-big.png'
import smallbg from '../../assets/dapiimg/bg-small.png'
export default {
  name: 'EchartItem',
  props: {
    title: {
      type: String,
      default: '基本信息'
    },
    size: {
      type: String,
      default: ''
    }
  },
  mounted() {
  },
  methods: {
    styleType() {
      if (this.size === 'small') {
        return {
          height: '108px',
          minHeight: '108px',
          background: `url(${smallbg}) no-repeat`,
          backgroundSize: '100%'
        }
      } else if (this.size === 'big') {
        return {
          height: '434px',
          minHeight: '434px',
          background: `url(${bigbg}) no-repeat`,
          backgroundSize: '100%'
        }
      } else if (this.size === 'midden') {
        return {
          height: '280px',
          minHeight: '280px'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.title{
    background: url('../../assets/dapiimg/echart-item-tit.png') no-repeat;
    margin: 0;
    font-family: SourceHanSansCN-Bold;
    color: #fff;
    font-size: 18px;
    height: 28px;
    line-height: 25px;
    padding-left: 65px
}
.item-content{
    background: url('../../assets/dapiimg/echart-item-bg.png') no-repeat;
    min-height: 268px;
    background-size: 100% 100%;
    margin-top: 5px;
    margin-bottom: 15px;
    color: #fff;
}
</style>
