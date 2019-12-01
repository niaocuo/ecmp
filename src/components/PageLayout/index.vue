<template>
  <div class="app-container clearfix">
    <div class="item leftFix" :style="`min-height:${asildHeight}`">
      <slot name="leftTree" />
      <el-tree
        ref="tree"
        :expand-on-click-node="false"
        class="filter-tree"
        :data="treeData"
        node-key="id"
        :props="defaultProps"
        :highlight-current="true"
        default-expand-all
        @node-click="handleNodeClick"
      />
    </div>
    <div class="rightFix">
      <slot name="rightContent" />
    </div>
  </div>
</template>
<script>

export default {
  props: {
    defaultProps: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label'
        }
      }
    },
    treeData: {
      type: Array,
      default() {
        return [{
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
        }]
      }
    }
  },
  data() {
    return {
      scrollHeight: '' // 网页高度
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    asildHeight() {
      if (this.scrollHeight) {
        const asildh = this.scrollHeight - 151
        return asildh + 'px'
      }
    }
  },
  watch: {
    treeData() {
      // 数据加载完成后默认选择一条数据
      this.$nextTick(() => {
        const lastNode = this.getFirstNode(this.treeData) // 第一条数据 最小子集
        this.$refs.tree.setCurrentKey(lastNode.id) // 传入节点ID
        this.handleNodeClick(lastNode)
      })
    }
  },
  mounted() {
  },
  methods: {
    // 获取第一条数据
    getFirstNode(tree) {
      const temp = []
      const forFn = function(arr) {
        if (arr && arr.length > 0) {
          temp.push(arr[0])
          if (arr[0].children) {
            forFn(arr[0].children)
          }
        }
      }
      forFn(tree)
      return temp[temp.length - 1]
    },
    // 树节点点击
    handleNodeClick(nodedata) {
      this.$emit('handleNodeClick', nodedata)
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
  min-height: calc(100vh - 50px - 20px - 61px);
  float: left;
  width: 340px;
}
</style>
<style lang="scss">
.rightFix{
   float: right;
    width: calc(100% - 350px);
  h2{
    font-size: 17px;
    margin-top: 0;
  }
}
</style>

