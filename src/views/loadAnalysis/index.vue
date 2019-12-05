<template>
  <!-- 负荷分析 path:loadAnalysis -->
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
        <h2>负荷分析</h2>
        <el-row :gutter="10">
          <el-col v-for="item in topCard" :key="item.title" :span="6">
            <el-card shadow="always">
              <div class="topCard-content">
                <p>{{ item.title }}</p>
                <p>{{ item.value }}</p>
                <p v-if="item.time" class="time">时间:{{ item.time }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="top-search-form rightContent-item" :style="`min-height:${tableHeight}`">
        <h2>实时负荷</h2>
        <TablineEcharts :tree-node-id="Treenodeid" />
      </div>
    </div>
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/PageLayout'
import TablineEcharts from './TablineEcharts'
import { getStationTree } from '@/api/station'
export default {
  components: { PageLayout, TablineEcharts },
  data() {
    return {
      logPageId: 1, // 告警id
      treeData: [],
      formInline: {
        name: '' // 客户名称
      },
      Treenodeid: -1,
      topsearchHeight: 71,
      topCard: [
        {
          title: '额定电量',
          value: '567KVa'
        },
        {
          title: '实时负荷',
          value: '567KW'
        },
        {
          title: '当日最大负荷',
          value: '782KW',
          time: '13:25:57'
        },
        {
          title: '历史最大负荷',
          value: '150KW',
          time: '2019年9月10日,13:25:57'
        }
      ]
    }
  },
  computed: {
    tableHeight() {
      const clientHeight = document.body.clientHeight
      const tableh = clientHeight - 333
      return tableh + 'px'
    }
  },
  mounted() {
    this.getStationTree()
  },
  methods: {
    // 搜索 ref=formName：表单名称
    onSubmit(formName) {
      console.log(formName)
    },
    // 查询左侧树数据
    async getStationTree() {
      const result = await getStationTree(this.logPageId)
      this.treeData = result.data
    },
    // 树节点点击
    handleNodeClick(nodedata) {
      console.log(nodedata)
      this.Treenodeid = nodedata.id
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
}
.topCard-content{
  position: relative;
.time{
  position: absolute;
  bottom: -40px;
  right: 0;
  color: #999;
  font-size: 14px;
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
