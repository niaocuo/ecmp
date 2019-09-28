<template>
  <div>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="告警类型">
        <el-input v-model="formInline.type" size="mini" placeholder="告警类型" />
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input v-model="formInline.mane" size="mini" placeholder="设备名称" />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="formInline.user" size="mini" placeholder="用户名" />
      </el-form-item>
      <el-form-item label="发生时间">
        <el-date-picker
          v-model="formInline.time"
          size="mini"
          class="form-date-picker"
          placeholder="发生时间"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="mini"
          @click="onSubmit"
        >查询 </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="userName"
        label="用户名"
        width="100"
        align="center"
      />
      <el-table-column
        prop="equipmenName"
        label="设备名称"
        width="180"
        align="center"
      />
      <el-table-column
        prop="waringType"
        label="告警类型"
        align="center"
      />
      <el-table-column
        prop="describe"
        label="描述"
        align="center"
      />
      <el-table-column
        prop="occurrenceTime"
        label="发生时间"
        align="center"
      />
      <el-table-column
        prop="processingState"
        label="处理状态"
        align="center"
      />
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: '',
        type: '',
        name: '',
        time: new Date()
      },
      tableData: [
        {
          userName: 'admin',
          equipmenName: '一号电机',
          waringType: '电机',
          describe: '电机故障',
          occurrenceTime: '2019-10-1',
          processingState: '未处理'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style>
.el-date-editor.el-input.form-date-picker{
  width: 163px;
}
</style>
