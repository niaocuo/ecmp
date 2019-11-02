<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="item leftFix">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="用户名称">
              <el-input v-model="formInline.name" size="small" placeholder="用户名称" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
          <el-tree
            ref="tree"
            class="filter-tree"
            :data="data"
            node-key="id"
            :props="defaultProps"
            :highlight-current="true"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="18" class="rightFix">
        <div style="margin-bottom:10px" class="item">
          <ExhArchives />
        </div>
        <div class="item">
          <MeasuringPointData />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ExhArchives from './components/ExhArchives'
import MeasuringPointData from './components/MeasuringPointData'
// 获取第一条数据
const getFirstNode = (tree) => {
  var temp = []
  var forFn = function(arr) {
    if (arr && arr.length > 0) {
      temp.push(arr[0])
      if (arr[0].children) {
        forFn(arr[0].children)
      }
    }
  }
  forFn(tree)
  return temp[temp.length - 1]
}
export default {
  name: 'Exhibition',
  components: { ExhArchives, MeasuringPointData },
  data() {
    return {
      filterText: '',
      formInline: {
        name: ''
      },
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    const lastNode = getFirstNode(this.data) // 第一条数据 最小子集
    // 数据加载完成后默认选择一条数据
    this.$nextTick(() => {
      this.$refs.tree.setCurrentKey(lastNode.id) // 传入节点ID
      this.handleNodeClick(lastNode)
    })
  },
  methods: {
    // 查询树节点
    onSubmit() {
      console.log(this.formInline.name)
    },
    // 树节点 点击
    handleNodeClick(data) {
      if (!data.children) { // 只有最小子集可触发 & !data.children.length
        console.log(data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.item{
  padding:20px;
  background: #fff;
  border-radius: 10px;
}
.leftFix{
  height: calc(100vh - 50px - 20px - 61px);
}
</style>
<style lang="scss">
.rightFix{
  h2{
    font-size: 17px;
    margin-top: 0;
  }
}
</style>

