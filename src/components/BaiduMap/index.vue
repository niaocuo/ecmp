<template>
  <div class="app-content">
    <!--  //地图的容器 -->
    <div id="allmap" class="baidumap" />
  </div>
</template>

<script>
// import BMap from 'vue-baidu-map'
export default {
  name: 'PmDistribution',
  props: {
    pointValue: {
      type: Array,
      default: () => {
        return [
          { a: 1, b: 2, c: 3, d: 4 },
          { a: 2, b: 2, c: 3, d: 4 },
          { a: 3, b: 2, c: 3, d: 4 },
          { a: 4, b: 2, c: 3, d: 4 },
          { a: 5, b: 2, c: 3, d: 4 },
          { a: 6, b: 2, c: 3, d: 4 }
        ]
      }
    },
    mapPoints: {
      type: Array,
      default: () => {
        return [
          { x: 32.02021, y: 118.833109 },
          { x: 32.312903, y: 118.033109 },
          { x: 32.215855, y: 118.133109 },
          { x: 32.18015, y: 118.433109 },
          { x: 32.324994, y: 118.833109 },
          { x: 32.24884, y: 118.633109 }
        ]
      }
    }
  },
  mounted() {
    this.baiduMap()
  },
  methods: {
    baiduMap() {
      var map = new BMap.Map('allmap') // 创建地图实例
      var mapPoints = this.mapPoints
      // 函数 创建多个标注
      var markerFun = (points, i) => {
        const markers = new BMap.Marker(points)
        map.addOverlay(markers)
        var infoWindows = new BMap.InfoWindow(`<div>
        <p style='margin-top:2px;color:#fff'>${this.pointValue[i]['title']}</p>
        <p style='margin:2px;color:#fff'>实时负荷:${this.pointValue[i]['a']}</p>
        <p style='margin:2px;color:#fff'>配变总容量:${this.pointValue[i]['b']}</p>
        <p style='margin:2px;color:#fff'>客户总数:${this.pointValue[i]['c']}</p>
        <p style='margin:2px;color:#fff'>配变总数:${this.pointValue[i]['d']}</p>
      </div>`)
        // 鼠标移上标注点要发生的事
        markers.addEventListener('mouseover', function() {
          this.openInfoWindow(infoWindows)
        })
        // 鼠标移开标注点要发生的事
        markers.addEventListener('mouseout', function() {
          this.closeInfoWindow(infoWindows)
        })
      }
      var i = 0
      for (;i < mapPoints.length; i++) {
        var points = new BMap.Point(mapPoints[i].y, mapPoints[i].x)// 创建坐标点
        markerFun(points, i)
      }
      map.centerAndZoom(points, 10) // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放

      map.addControl(new BMap.NavigationControl())
      map.addControl(new BMap.ScaleControl())
      map.addControl(new BMap.OverviewMapControl())
      // map.addControl(new BMap.MapTypeControl())
      map.setMapStyle({ style: 'midnight' }) // 地图风格
    }
  }
}
</script>

<style lang="scss">
.baidumap {
    // height: 500px;
    height: calc(100vh - 160px);
}

/* 去除百度地图版权那行字 和 百度logo */
.baidumap > .BMap_cpyCtrl {
    display: none !important;
}
.baidumap > .anchorBL {
    display: none !important;
}

/*地图标题*/
.BMap_bubble_title {
	color:white;
	font-size:13px;
	font-weight:bold;
	text-align:left;
	padding-left:5px;
	padding-top:5px;
	border-bottom:1px solid gray;
	background-color:#0066b3;
}
/* 消息内容 */
.BMap_bubble_content {
	background-color:white;
	padding-left:5px;
	padding-top:5px;
	padding-bottom:10px;
  overflow: hidden;
  background: #264861;
}
/* 内容 */
.BMap_pop div:nth-child(9) {
	top:35px !important;
	border-radius:7px;
  background: #264861;
}

/* 左上角删除按键 */
.BMap_pop img {
	top:43px !important;
	left:215px !important;
}
.BMap_top {
	display:none;
}
.BMap_bottom {
	display:none;
}
.BMap_center {
	display:none;
}
/* 隐藏边角 */
.BMap_pop div:nth-child(1) div {
	display:none;
}
.BMap_pop div:nth-child(5) {
	display: none;
}
.BMap_pop div:nth-child(3) {
	display:none;
}
.BMap_pop div:nth-child(7) {
	display:none;
}
.BMap_pop div:nth-child(8) {
	img{
    display: none
  }
  transform: rotate(62deg);
  background: #264861
}
</style>
