<template>
  <div>
    <h2>测点数据</h2>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="测点名称">
        <el-input v-model="formInline.mpName" size="small" placeholder="测点名称" />
      </el-form-item>
      <el-form-item label="测点类型">
        <el-select v-model="formInline.mpType" clearable size="small" placeholder="测点类型">
          <el-option label="遥测" value="1" />
          <el-option label="遥信" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="getRMpDefinInfos">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      border
      :height="tableHeight"
      :header-cell-style="headerStyle"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
        label="序号"
      />
      <el-table-column
        prop="mpName"
        label="测点名称"
        width="180"
      />
      <el-table-column
        prop="mpCode"
        label="测点编码"
      />
      <el-table-column
        prop="collNo"
        label="测点地址"
      />
      <el-table-column
        prop="rMpData.collDataTime"
        label="数据时间"
      />
      <el-table-column
        prop="rMpData.dataValue"
        label="当前数值"
      />
      <el-table-column
        prop="modulus"
        label="系数"
        width="180"
      />
      <el-table-column
        prop="mpType"
        label="测点类型"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.mpType==='2'">遥信</span>
          <span v-else>遥测</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getRMpDefinInfos } from '@/api/rMpDefinInfo'
export default {
  props: {
    mtId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      formInline: {
        mpName: '',
        mpType: ''
      },
      tableData: []
    }
  },
  computed: {
    tableHeight() {
      const clientHeight = document.body.clientHeight
      const tableh = clientHeight - 470
      return tableh + 'px'
    }
  },
  watch: {
    mtId: {
      deep: true,
      handler(val) {
        this.getRMpDefinInfos()
      }
    }
  },
  methods: {
    async getRMpDefinInfos() {
      this.formInline.mtId = this.mtId
      const result = await getRMpDefinInfos(this.formInline)
      this.tableData = result.data
    },
    headerStyle() {
      return {
        color: '#000',
        textAlign: 'center'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
