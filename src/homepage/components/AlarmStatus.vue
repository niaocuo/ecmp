<template>
    <div>
        <!-- 告警事件 -->
        <div class="top">
            <div id="echartsAlarm"></div>
            <type-of-search />
        </div>
    </div>
</template>
<script>
var echarts = require('echarts');
import TypeOfSearch from './TypeOfSearch'
export default {
    components:{TypeOfSearch},
    data(){
        return {

        }
    },
    mounted(){
        this.drawEchart()
    },
    methods:{
        drawEchart(){
            var chart = echarts.init(document.getElementById('echartsAlarm'));
            let option = {
                title : {
                    text: '60',
                    y:'center',
                    x:'center',
                    textStyle: {
                         color: '#fff',
                    }
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        color:['#fdd100','#3fecff','#7351e3','#DF86F0','#F5A7C1'],
                        radius: ['40%', '55%'],
                        label: {
                            normal: {
                                formatter: ' {b|{b} }\n{hr|}\n{c|{c}}',
                                rich: {
                                    b: {
                                        align: 'center',
                                        lineHeight: 22,
                                        color:'#fff'
                                    },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    c: {
                                        align: 'center',
                                        lineHeight: 22,
                                        color:'#fff'
                                    },
                                }
                            }
                        },
                        data:[
                            {value:20, name:'直达'},
                            {value:10, name:'邮件营销'},
                            {value:30, name:'联盟广告'},
                        ]
                    }
                ]
            };
          
            chart.setOption(option);
        }
    }
}
</script>
<style lang="scss" scoped>
.top{
    overflow: hidden;
}
#echartsAlarm{
    height: 200px;
}
</style>