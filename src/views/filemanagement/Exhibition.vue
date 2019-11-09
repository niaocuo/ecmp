<template>
  <div class="app-container clearfix">
    <div class="item leftFix">
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
    <div class="rightFix">
      <div style="margin-bottom:10px" class="item">
        <!-- 设备档案 -->
        <ExhArchives :equipment="equipment" :title="title" />
      </div>
      <div class="item">
        <!-- 测点数据 -->
        <MeasuringPointData :mt-id="mtId" />
      </div>
    </div>
  </div>
</template>
<script>
import ExhArchives from './components/ExhArchives'
import MeasuringPointData from './components/MeasuringPointData'
import { getStationTree } from '@/api/station'
import { getTransformerByTrId } from '@/api/transformer'
import { getRbsByBsId } from '@/api/rbs'
import { getRBreakerByBreakerId } from '@/api/rBreaker'

export default {
  name: 'Exhibition',
  components: { ExhArchives, MeasuringPointData },
  data() {
    return {
      filterText: '',
      title: '变压器容量',
      formInline: {
        name: ''
      },
      subdistrictId: this.$route.params.id,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      mtId: 0,
      equipment: {
        category: '',
        name: '',
        serialNumber: '',
        type: '',
        vendor: '',
        capacity: '',
        gatewayIp: '',
        number: ''
      }
    }
  },
  mounted() {
    this.getStationTree()
  },
  methods: {
    // 查询树节点
    onSubmit() {
    },
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
    async getStationTree() {
      const result = await getStationTree(this.subdistrictId)
      this.data = result.data
      const lastNode = this.getFirstNode(this.data) // 第一条数据 最小子集
      // 数据加载完成后默认选择一条数据
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(lastNode.id) // 传入节点ID
        this.handleNodeClick(lastNode)
      })
    },
    // 树节点 点击
    async handleNodeClick(data) {
      let result = {}
      switch (data.type) {
        case 3:
          result = await getTransformerByTrId(data.entityId)
          this.equipment.name = result.data.trName
          this.equipment.category = '变压器'
          this.title = '变压器容量'
          this.equipment.serialNumber = result.data.trNo
          this.equipment.type = result.data.trType === '1' ? '干式' : '油浸式'
          this.equipment.vendor = result.data.rfactory.facName
          this.equipment.capacity = result.data.trCapacity
          if (result.data.rmeteruseinfo != null) {
            this.mtId = result.data.rmeteruseinfo.mtId
            this.equipment.gatewayIp = result.data.rmeteruseinfo.rtmnl.tmnlIp
            this.equipment.number = result.data.rmeteruseinfo.mtCode
          } else {
            this.equipment.gatewayIp = ''
            this.equipment.number = ''
            this.mtId = 0
          }
          break
        case 4:
          result = await getRbsByBsId(data.entityId)
          this.equipment.name = result.data.bsName
          this.equipment.category = '母线'
          this.title = '电压等级'
          this.equipment.serialNumber = result.data.bsNo
          switch (result.data.voltType) {
            case '1':
              this.equipment.capacity = '10kV'
              break
            case '2':
              this.equipment.capacity = '0.4kV'
              break
            case '3':
              this.equipment.capacity = '0.38kV'
              break
            case '4':
              this.equipment.capacity = '0.22kV'
              break
          }
          switch (result.data.bsType) {
            case '1':
              this.equipment.type = '母线'
              break
            case '2':
              this.equipment.type = '进线'
              break
            case '3':
              this.equipment.type = '出线'
              break
            case '4':
              this.equipment.type = '电网线路'
              break
          }
          this.equipment.vendor = ''
          if (result.data.rmeteruseinfo != null) {
            this.mtId = result.data.rmeteruseinfo.mtId
            this.equipment.gatewayIp = result.data.rmeteruseinfo.rtmnl.tmnlIp
            this.equipment.number = result.data.rmeteruseinfo.mtCode
          } else {
            this.equipment.gatewayIp = ''
            this.equipment.number = ''
            this.mtId = 0
          }
          break
        case 5:
          result = await getRBreakerByBreakerId(data.entityId)
          this.equipment.name = result.data.breakerName
          this.equipment.category = '开关'
          this.title = '分合闸状态'
          this.equipment.serialNumber = result.data.bkNo
          switch (result.data.breakerType) {
            case '1':
              this.equipment.type = '普通开关'
              break
            case '2':
              this.equipment.type = '小车开关'
              break
            case '3':
              this.equipment.type = '母联/分段/旁路开关'
              break
            case '4':
              this.equipment.type = '变压器分支'
              break
            case '5':
              this.equipment.type = '电容器'
              break
          }
          this.equipment.vendor = result.data.rfactory.facName
          this.equipment.capacity = result.data.status === '0' ? '分闸' : '合闸'
          if (result.data.rmeteruseinfo != null) {
            this.mtId = result.data.rmeteruseinfo.mtId
            this.equipment.gatewayIp = result.data.rmeteruseinfo.rtmnl.tmnlIp
            this.equipment.number = result.data.rmeteruseinfo.mtCode
          } else {
            this.equipment.gatewayIp = ''
            this.equipment.number = ''
            this.mtId = 0
          }
          break
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

