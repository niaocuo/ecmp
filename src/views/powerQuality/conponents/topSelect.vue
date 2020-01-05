<template>
  <div>
    <!-- 头部电表选择 -->
    <el-form ref="treeform" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="站点名称">
        <el-select v-model="formInline.statename" size="mini" placeholder="请选择" @change="changeRsubdistrict">
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="配电房">
        <el-select v-model="formInline.distributionRoom" size="mini" placeholder="请选择" @change="changeRstation">
          <el-option
            v-for="item in distributionRoomOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="电表">
        <el-select v-model="formInline.watthourmeter" size="mini" placeholder="请选择">
          <el-option
            v-for="item in watthourmeterOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit('treeform')">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getRsubdistrictLaber, getRstationLaber, getRmeteruseinfoLaber } from '@/api/common'
export default {
  data() {
    return {
      formInline: {
        statename: '', // 站点
        distributionRoom: '', // 配电房
        watthourmeter: '' // 电表
      },
      watthourmeterOptions: [], // 电表下拉
      distributionRoomOptions: [], // 配电房下拉
      stateOptions: [] // 站点下拉
    }
  },
  // watch: {
  //   formInline: {
  //     deep: true,
  //     handler(val) {
  //       this.$emit('valueChange', val)
  //     }
  //   }
  // },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const result = await getRsubdistrictLaber()
      this.stateOptions = result.data
      // const res = await getRstationLaber()
      // this.distributionRoomOptions = res.data
      // const data = await getRtransformerLaber()
      // this.transformerOptions = data.data
    },
    async changeRsubdistrict(val) {
      const result = await getRstationLaber(val)
      this.formInline.distributionRoom = ''
      this.formInline.transformer = ''
      this.watthourmeterOptions = []
      this.distributionRoomOptions = result.data
    },
    async changeRstation(val) {
      const result = await getRmeteruseinfoLaber(val)
      this.formInline.transformer = ''
      this.watthourmeterOptions = result.data
    },
    onSubmit() {
      this.$emit('valueChange', this.formInline)
    }
  }
}
</script>

<style>

</style>
