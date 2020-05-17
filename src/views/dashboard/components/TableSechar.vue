<template>
  <div style="margin-bottom:20px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline.subdistrictName" size="mini" placeholder="用户名" />
      </el-form-item>
      <el-form-item label="行业">
        <el-select v-model="formInline.industry" filterable clearable size="mini" placeholder="请选择">
          <el-option
            v-for="item in industrys"
            :key="item.codeId"
            :label="item.codeName"
            :value="item.codeValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="地区">

        <el-cascader
          v-model="areaId"
          size="mini"
          placeholder="请选择"
          :options="areas"
          :props="{ checkStrictly: true }"
          clearable
        />

        <!--        <el-select v-model="formInline.areaId" filterable clearable size="mini" placeholder="请选择">-->
        <!--          <el-option-->
        <!--            v-for="item in areas"-->
        <!--            :key="item.areaId"-->
        <!--            :label="item.areaName"-->
        <!--            :value="item.areaId"-->
        <!--          />-->
        <!--        </el-select>-->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="getRsubdistricts">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" stripe :header-cell-style="headerStyle" :cell-style="headerStyle" :data="tableData" size="mini">
      <el-table-column label="序号" width="80" type="index" />
      <el-table-column label="户号" prop="consNo" />
      <el-table-column label="用户名">
        <template slot-scope="scope">
          <el-link type="primary" @click="jumpExhibition(scope.row.subdistrictId)">{{ scope.row.subdistrictName }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="行业" prop="bseInd" />
      <el-table-column label="申报需量" prop="decCapacity" width="120" />
      <el-table-column label="联系人" prop="linkmanName" width="120" />
      <el-table-column label="电话" prop="linkmanPhone" />
      <el-table-column label="地区" prop="rarea.areaName" width="80" />
      <el-table-column label="用电地址" prop="subdistrictAddress" />
      <el-table-column label="坐标" prop="lng" width="80" />
    </el-table>
    <div style="float: right;margin-top:10px">
      <el-pagination
        :current-page="page.currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getRsubdistricts } from '@/api/subdistricts'
import { getCodeByCodeSortId } from '@/api/pcode'
import { getAreaCascadeById } from '@/api/area'
export default {
  data() {
    return {
      // 下拉表
      industrys: [],
      areas: [],
      areaId: [],
      // 查询条件表单
      formInline: {
        areaId: '',
        subdistrictName: '',
        industry: ''
      },
      listLoading: true,
      page: {
        currentPage: 1,
        pageSize: 5
      },
      total: 0,
      tableData: []
    }
  },
  watch: {
    page: {
      handler(val, oldVal) {
        this.getRsubdistricts()
      }, deep: true
    }
  },
  mounted() {
    this.getCodeByCodeSortId()
    this.getRsubdistricts()
    this.getAreaCascadeById()
  },
  methods: {
    async getCodeByCodeSortId() {
      const res = await getCodeByCodeSortId(10084)
      this.industrys = res.data
    },
    async getAreaCascadeById() {
      const result = await getAreaCascadeById(1)
      this.areas = result.data
    },
    async getRsubdistricts() {
      this.listLoading = true
      if (this.areaId.length > 0) {
        this.formInline.areaId = this.areaId[this.areaId.length - 1]
      }
      const res = await getRsubdistricts(Object.assign(this.page, this.formInline))
      this.listLoading = false
      this.tableData = res.data.listData
      this.total = res.data.total
    },
    jumpExhibition(id) {
      this.$router.push({
        name: 'Exhibition',
        params: {
          id: id
        }
      })
    },
    handleSizeChange(val) {
      this.page.pageSize = val
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
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
