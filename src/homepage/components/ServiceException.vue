<template>
    <div>
       <!-- 运维服务 -->
       <div id="echart-serve"></div>
    </div>
</template>
<script>
var echarts = require('echarts');
export default {
    data(){
        return {

        }
    },
    mounted(){
        this.drawEchart()
    },
    methods:{
        drawEchart(){
            var chart = echarts.init(document.getElementById('echart-serve'));
            var seriesLabel = {
                normal: {
                        show: true,
                        textBorderColor: '#333',
                        textBorderWidth: 2
                    }
            }
            let option = {
                // backgroundColor: '#2c343c',

                // title: {
                //     text: 'Customized Pie',
                //     left: 'center',
                //     top: 20,
                //     textStyle: {
                //         // color: '#ccc'
                //     }
                // },

                tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series : [
                    {
                        name:'',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data:[
                            {value:335, name:'安全巡视'},
                            {value:310, name:'预防性试验'},
                            {value:274, name:'抢修'},
                            {value:235, name:'设备采购'},
                            // {value:400, name:'搜索引擎'}
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 1)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                // color: '#c23531',
                                // shadowBlur: 200,
                                // shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },

                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            };
            chart.setOption(option);
        }
    }
}
</script>
<style scoped>
#echart-serve{
    height:257px;
}
</style>