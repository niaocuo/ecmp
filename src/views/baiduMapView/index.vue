<template>
  <!-- 电量分析 -->
  <div class="app-container">
    <div class="map-content">
      <BaiduMap :map-points="mapPoints" :point-value="pointValue" />
    </div>
  </div>
</template>
<script>
import BaiduMap from '@/components/BaiduMap'
export default {
  components: { BaiduMap },
  data() {
    return {
      mapPoints: [ // 位置点坐标
        { x: 32.02021, y: 118.833109 },
        { x: 32.312903, y: 118.033109 },
        { x: 32.215855, y: 118.133109 },
        { x: 32.18015, y: 118.433109 },
        { x: 32.324994, y: 118.833109 },
        { x: 32.24884, y: 118.633109 }
      ],
      pointValue: [ // 位置点数据 // a:实时负荷 b:配变总容量 c:客户总数 d：配变总数
        { title: '位置一', a: 1, b: 2, c: 3, d: 4123 },
        { title: '位置二', a: 2, b: 2, c: 3, d: 1123 },
        { title: '位置三', a: 3, b: 2, c: 3, d: 123123 },
        { title: '位置四', a: 4, b: 2, c: 3, d: 4 },
        { title: '位置五', a: 5, b: 2, c: 3, d: 4 },
        { title: '位置六', a: 6, b: 2, c: 3, d: 4 }
      ]
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.map-content{
    background: #264861;
    border-radius: 10px;
}
</style>
