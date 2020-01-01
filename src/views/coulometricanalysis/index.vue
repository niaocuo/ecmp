<template>
  <!-- 电量分析 path:coulometricanalysis-->
  <PageLayout :tree-data="treeData" @handleNodeClick="handleNodeClick">
    <div slot="leftTree">
      <el-form ref="treeform" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="客户名称">
          <el-input v-model="formInline.name" size="mini" style="width:150px" placeholder="客户名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="onSubmit('treeform')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div slot="rightContent" class="rightContent">
      <div ref="topsearch" class="top-search-form">
        <h2>电量分析</h2>
        <el-form ref="rightform" :inline="true" :model="rightform" class="demo-form-inline">
          <el-form-item label="数据时间">
            <el-date-picker v-model="rightform.timer" value-format="yyyy-MM-dd" size="mini" placeholder="数据时间" style="width: 150px;" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="rightformsearch">查询</el-button>
            <el-button type="primary" size="mini" @click="download">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="rightContent-item" style="">
        <el-row :gutter="10">
          <el-col :span="20">
            <BarChart :axis-data="axisData" :echarts-value="echartsvalue" />
          </el-col>
          <el-col :span="4">
            <!-- 月度总电量 -->
            <el-card :body-style="{ padding: '0px' }" class="electric-card" style="margin-bottom:10px">
              <span class="title">月度总电量</span>
              <el-row>
                <el-col :span="12">
                  <img width="40px" :src="require('@/assets/png_icon/statistical.png')" class="image">
                </el-col>
                <el-col :span="12">
                  <span class="electric-number">180KW</span>
                </el-col>
                <el-col :span="12">
                  <span class="rate-electric">
                    环比:15%
                    <i class="el-icon-top" />
                  </span>
                </el-col>
                <el-col :span="12">
                  <span class="rate-electric">
                    同比:-15%
                    <i class="el-icon-bottom" />
                  </span>
                </el-col>
              </el-row>
            </el-card>
            <!-- 月度最大电量 -->
            <el-card :body-style="{ padding: '0px' }" class="electric-card">
              <span class="title">月度最大电量</span>
              <el-row>
                <el-col :span="12">
                  <img width="40px" :src="require('@/assets/png_icon/statistical.png')" class="image">
                </el-col>
                <el-col :span="12">
                  <span class="electric-number">180KW</span>
                </el-col>
              </el-row>
              <div class="time">
                <time>2019年10月19日</time>
                <br>
                <time>{{ monthMastElectric.currentDate }}</time>
              </div>
            </el-card>
            <!-- 月度最大电量 -->
          </el-col>
        </el-row>
      </div>
      <div class="top-search-form rightContent-item">
        <!-- 表格 -->
        <el-table
          v-loading="TableListLoading"
          :data="TableList"
          element-loading-text="Loading"
          :style="`width:100%; min-height:${tableHeight}`"
          border
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="序号" type="index" width="50" />
          <el-table-column align="center" label="客户编号" />
          <el-table-column align="center" label="客户名称" />
          <el-table-column align="center" label="额定电量" />
          <el-table-column align="center" label="数据时间" prop="timer" />
        </el-table>
      </div>
    </div>
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/PageLayout'
import BarChart from './components/BarChart'
import { getStationTree } from '@/api/station'

export default {
  components: { PageLayout, BarChart },
  data() {
    return {
      logPageId: 1, // 告警id
      TableListLoading: true,
      TableList: [],
      treeData: [], // 表格数据
      echartsvalue: [79, 52, 200, 334, 390, 9, 52, 200, 334, 390, 9, 52, 200, 334, 390, 9, 52, 200, 334, 390, 9, 52, 200, 334, 390, 9, 52, 200, 334, 390], // 电量数据
      axisData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 28, 30], // X轴坐标
      formInline: {
        name: '' // 客户名称
      },
      rightform: {
        timer: new Date()
      },
      monthTltElectric: { // 月度总电量
        title: '月度总电量',
        currentDate: '2017-09-12'
      },
      monthMastElectric: { // 月度最大电量
        title: '月度最大电量',
        currentDate: '18:20:32'

      }
    }
  },
  computed: {
    tableHeight() {
      // :header-cell-style="headerStyle"

      const clientHeight = document.body.clientHeight
      const tableh = clientHeight - 630
      return tableh + 'px'
    }
  },
  mounted() {
    this.getStationTree()
    this.TableListLoading = false // 表格数据加载完成
  },
  methods: {
    // 搜索 ref=formName：表单名称
    onSubmit(formName) {
      console.log(formName)
    },
    // 查询
    rightformsearch() {
      console.log(this.rightform.timer)
    },
    // 查询左侧树数据
    async getStationTree() {
      const result = await getStationTree(this.logPageId)
      this.treeData = result.data
    },
    // 树节点点击
    handleNodeClick(nodedata) {
      console.log(nodedata)
    },
    // 导出
    download() {

    }
  }
}
</script>
<style lang="scss" scoped>
.rightContent{
  &>div{
    background: #fff;
    border-radius: 10px;
    padding: 15px;
  }
  .rowbutton{
    cursor: pointer;
    &:hover{
      color: #409EFF;
    }
  }
  .rightContent-item{
    margin-top: 15px
  }
   .electric-card{
     text-align: center;
     .title{
       display: block;
       margin: 10px;
       text-align: left
     }
     .el-icon-top,.el-icon-bottom{
       font-size: 18px;
        position: relative;
       top: 1px;
     }
     .rate-electric{
       margin: 20px 0;
       display: inline-block
     }
      .time{
        text-align: left;
        margin: 20px 0;
        padding-left: 10px
      }
      .electric-number{
        line-height: 40px;
        font-size: 18px;
        font-weight: 700;
      }
     .el-icon-top{
       top: 2px;
      color: #e45a5a
     }
     .el-icon-bottom{
       color: #409EFF
     }
     img,span{
       vertical-align: middle
     }
   }
}

</style>
<style lang="scss">
.rightContent{
  .el-form-item{
      margin-bottom: 0
    }

}
</style>
