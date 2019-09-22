<template>
  <div class="home-main clearfix row" :style="fluStyle">
    <div class="clo clo-side" style="margin-top:100px">
      <echart-item title="基本信息">
        <base-info slot="content" />
      </echart-item>
      <echart-item title="环境安防" size="midden">
        <EnvironmentalProtect slot="content" />
      </echart-item>
    </div>
    <div class="clo">
      <Map />
    </div>
    <div class="clo clo-side" style="margin-top:100px">
      <echart-item title="电量分析" size="small">
        <MaLowPowerp slot="content" />
      </echart-item>
      <echart-item title="实时负荷">
        <InfoPanelLoadGraph slot="content" />
      </echart-item>
    </div>
    <div class="clo clo-footer">
      <div style="padding-right: 7px">
        <echart-item title="运行概况">
          <RunnableBlock slot="content" />
        </echart-item>
      </div>
      <div style="padding:0 7px;width:26%">
        <echart-item title="配变重过载">
          <ContextLoader slot="content" />
        </echart-item>
      </div>
      <div style="padding:0 7px;width:26%">
        <echart-item title="运维服务">
          <ServiceException slot="content" />
        </echart-item>
      </div>
      <div style="padding-left: 10px;position:absolute;right: 0px;top: -164px;">
        <echart-item title="告警事件" size="big">
          <AlarmStatus slot="content" />
        </echart-item>
      </div>
    </div>
  </div>
</template>
<script>
import { Map,
  EchartItem,
  BaseInfo,
  EnvironmentalProtect,
  MaLowPowerp,
  InfoPanelLoadGraph,
  RunnableBlock,
  ContextLoader,
  ServiceException,
  AlarmStatus
} from './components'
export default {
  name: 'Home',
  components: {
    Map,
    EchartItem,
    BaseInfo,
    EnvironmentalProtect,
    MaLowPowerp,
    InfoPanelLoadGraph,
    RunnableBlock,
    ContextLoader,
    ServiceException,
    AlarmStatus
  },

  data() {
    return {

    }
  },
  computed: {
    fluStyle() {
      var scale, marginTop, marginLeft, screenWidth, domWidth, domHeight, styleWidth
      screenWidth = document.body.clientWidth
      domWidth = 1920
      domHeight = 1080

      // if (screenWidth === 1920) {
      //   styleWidth = 1920
      // } else {
      //   styleWidth = 1920
      // }
      scale = screenWidth / 1920
      marginTop = (domHeight - (domHeight * scale)) / 2 * (-1)
      marginLeft = (domWidth - (domWidth * scale)) / 2 * (-1)
      document.body.style.overflowX = 'hidden'
      // if (screenWidth === 1920) {
      //   marginLeft = (domWidth - (domWidth * scale)) / 2 * (-1)
      // } else {
      //   marginLeft = (domWidth - (domWidth * scale)) / 2 * (-1) + 10
      // }
      return {
        transform: `scale(${scale})`,
        marginTop: marginTop + 'px',
        marginLeft: marginLeft + 'px'
      }
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.home-main{
    // width: 100%;
    width: 1920px;
    // min-width: 1900px;
    padding: 20px;
    height: 1080px;
    margin: 0 auto;
    background: url('../assets/main-bg.png') no-repeat;
    background-size: cover;
    transform: scale()
}
.row{
    .clo{
        float: left;
        width: 53%;
    }
    .clo-side{
        width: 23.5%;
    }
    .clo-footer{
        width: 100%;
        position: relative
    }
    .clo-footer > div{
        width: 24%;
        float: left;
    }
}
</style>
