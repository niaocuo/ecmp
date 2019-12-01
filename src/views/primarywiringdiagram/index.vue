<template>
  <!-- 一次接线图 -->
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
        dad
      </div>
      <div class="top-search-form rightContent-item">
        <!-- 告警表格 -->
        asd
      </div>
    </div>
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/PageLayout'
import { getStationTree } from '@/api/station'
export default {
  components: { PageLayout },
  data() {
    return {
      logPageId: 1, // 告警id
      treeData: [],
      formInline: {
        name: '' // 客户名称
      },
      topsearchHeight: 71
    }
  },
  computed: {
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

</style>
<style lang="scss">
.rightContent{
  .el-form-item{
      margin-bottom: 0
    }
}
</style>
