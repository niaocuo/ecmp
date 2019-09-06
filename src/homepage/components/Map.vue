<template>
  <div id="jiangsumap" ref="map" />
</template>
<script>
import echarts from 'echarts'
import 'echarts-gl'
import '@/homepage/data/jiangsu'

export default {
  name: 'Map',
  data() {
    return {}
  },
  mounted() {
    this.drawMap()
  },
  methods: {
    drawMap() {
      var chart = echarts.init(document.getElementById('jiangsumap'))
      var jiangsucity = [
        { 'lat': 31.704402, 'lng': 119.452753, 'name': '镇江市', type: 'warning' },
        { 'lat': 31.199379, 'lng': 120.619585, 'name': '苏州市' },
        { 'lat': 33.363008, 'lng': 118.575162, 'name': '宿迁市' },
        { 'lat': 32.004882, 'lng': 119.995176, 'name': '泰州市' },
        { 'lat': 32.797506, 'lng': 119.021265, 'name': '淮安市', type: 'warning' },
        { 'lat': 33.000631, 'lng': 120.039998, 'name': '盐城市' },
        { 'lat': 34.000018, 'lng': 119.178821, 'name': '连云港市' },
        { 'lat': 34.061792, 'lng': 117.184811, 'name': '徐州市' },
        { 'lat': 31.541544, 'lng': 118.767413, 'name': '南京市' },
        { 'lat': 31.374729, 'lng': 120.301663, 'name': '无锡市' },
        { 'lat': 31.616212, 'lng': 120.864608, 'name': '南通市' },
        { 'lat': 32.093159, 'lng': 119.421003, 'name': '扬州市' },
        { 'lat': 31.372752, 'lng': 119.546973, 'name': '常州市' }
      ]
      var mtPath = 'path://M435.205 255.99c-6.003 2.861-11.799 6.004-17.375 9.525-7.532 4.659-9.794 14.466-5.16 21.949a15.921 15.921 0 0 0 13.524 7.52c2.897 0 5.796-0.758 8.413-2.36a144.277 144.277 0 0 1 14.355-7.85c7.948-3.79 11.286-13.303 7.483-21.252-3.791-7.948-13.28-11.409-21.24-7.532z M876.832 765.444c-14.99-5.918-78.966-36.462-78.966-127.729V395.972c0-117.557-95.865-226.016-215.183-258.371v-1.993c0-39.557-32.195-71.74-71.728-71.74-0.123 0-0.269 0.012-0.392 0.012-0.147 0-0.256-0.012-0.416-0.012-39.532 0-71.728 32.183-71.728 71.74v1.993c-119.3 32.354-215.189 140.813-215.189 258.371v241.743c0 91.268-63.981 121.812-78.985 127.729-10.913 5.551-18.415 16.825-18.415 29.934 0 18.561 15.028 33.675 33.632 33.675h702.182c18.623 0 33.639-15.114 33.639-33.675-0.011-13.108-7.518-24.383-18.451-29.934z m-346.508-0.172H245.511c23.526-30.422 41.47-72.203 41.47-127.57V432.595c0.263 0.073 0.525 0.122 0.789 0.207v-36.817c0-105.048 108.221-204.361 222.795-204.606 114.536 0.245 222.764 99.558 222.764 204.606v36.817c0.269-0.085 0.538-0.134 0.795-0.207v205.12c0 55.367 17.938 97.136 41.464 127.558H530.324v-0.001z M392.249 306.172c-7.104-5.283-17.07-3.815-22.364 3.167-22.97 30.582-35.075 66.922-35.075 105.22v159.425c0 8.791 7.11 15.944 15.939 15.944 8.816 0 15.92-7.153 15.92-15.944V414.559c0-31.352 9.953-61.09 28.686-86.059 5.332-7.08 3.901-17.058-3.106-22.328zM615.221 844.949H569.6c-2.006 0.183-3.79 0.904-5.308 2.03-0.194-0.368-0.439-0.661-0.647-1.003-3.045 1.124-5.588 3.252-6.407 6.529-3.583 22.181-22.39 39.397-45.413 40.18-23.025-0.782-41.832-17.999-45.402-40.18-0.807-3.277-3.351-5.405-6.432-6.529-0.196 0.342-0.416 0.635-0.612 1.003a10.465 10.465 0 0 0-5.331-2.03h-45.609c-4.769 0.293-8.241 3.875-8.975 8.462 4.414 57.506 52.09 103.079 110.685 103.079 0.563 0 1.125-0.049 1.688-0.049 0.562 0 1.113 0.049 1.675 0.049 58.607 0 106.296-45.586 110.697-103.079-0.734-4.598-4.231-8.169-8.988-8.462z'
      var serverPath = 'path://M212.609771 512.001023c0 165.366282 134.024459 299.388694 299.389717 299.388695s299.389718-134.023436 299.389718-299.388695c0-165.367305-134.024459-299.391764-299.389718-299.391764S212.609771 346.633718 212.609771 512.001023z'
      var color = ['#5aaeef', '#ffa022', '#46bee9']// 字体的颜色
      var convertData = function(data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        console.log(res)
        return res
      }

      var series = []

      jiangsucity.forEach(function(item, i) {
        series.push(
          {
            type: 'scatter3D',
            coordinateSystem: 'geo3D',
            ylevel: 10,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: item.type ? 'red' : color[0], // 地图初始化区域字体颜色
                  fontSize: 14,
                  backgroundColor: 'rgba(0,0,0,0)'
                },
                position: 'right',
                distance: 1,
                formatter: '{b}'
              }
            },
            symbolSize: 16,
            data: [{
              symbol: (item.type == 'warning') ? mtPath : serverPath,

              itemStyle: {
                normal: { color: item.type ? 'red' : color[0] }
              },
              name: item.name,
              value: [item.lng].concat([item.lat]).concat(1)
            }]

          }
        )
      })

      var option = {
        title: {
          text: '',
          x: 'center',
          top: '0',
          textStyle: {
            color: '#000',
            fontSize: 24
          }
        },
        tooltip: {
          show: false
          // formatter:(params)=>{
          //   let data = "测试1:"+params.name + "<br/>"+"值:"+ params.value[2]+"<br/>"+"地理坐标:[" + params.value[0]+","+params.value[1] +"]";
          //   return data;
          // },
        },

        geo3D: {
          map: '江苏',
          roam: true,
          top: '0%',
          left: '0%',
          itemStyle: {
            areaColor: 'rgb(5,101,123)',
            opacity: 1,
            color: '#014b84',
            borderWidth: 0.8,
            borderColor: 'rgb(62,215,213)'
          },
          emphasis: { // 当鼠标放上去  地区区域是否显示名称
            label: {
              show: false
            }
          },
          shading: 'lambert',
          light: { // 光照阴影
            main: {
              color: '#fff', // 光照颜色
              intensity: 0.9, // 光照强度
              shadowQuality: 'high', // 阴影亮度
              shadow: true, // 是否显示阴影
              alpha: 55,
              beta: 10

            },
            ambient: {
              intensity: 0.3
            }
          },
          viewControl: {
            rotateSensitivity: 0, // 无法旋转
            distance: 80,
            center: [15, -5, 15]
          }

        },
        series: series

      }
      chart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
#jiangsumap{
    width: 856px;
	height: 637px;
    margin: 0 auto;
    margin-top: 100px
}
</style>

