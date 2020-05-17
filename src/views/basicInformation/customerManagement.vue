<template>
  <div class="app-container">
    <div class="bg-item">
      <h3>查询条件</h3>
      <el-form ref="treeform" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="客户编号">
          <el-input v-model="formInline.consNo" size="mini" style="width:150px" placeholder="请输入客户编号" />
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="formInline.subdistrictName" size="mini" style="width:150px" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="所属地区">
          <el-cascader
            v-model="areaId"
            size="mini"
            placeholder="请选择"
            :options="areas"
            :props="{ checkStrictly: true }"
            clearable
          />
        </el-form-item>
        <el-form-item label="所属行业">
          <el-select v-model="formInline.industry" filterable clearable size="mini" placeholder="请选择">
            <el-option
              v-for="item in industrys"
              :key="item.codeId"
              :label="item.codeName"
              :value="item.codeValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="onQuery()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="bg-item">
      <h3>客户信息列表</h3>
      <div class="operation_button">
        <el-button type="primary" size="mini" @click="addSubdistrict()">新增</el-button>
        <el-button type="primary" size="mini" @click="updateSubdistrict()">修改</el-button>
        <el-button type="primary" size="mini" @click="onSubmit()">删除</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        element-loading-text="Loading"
        fit
        highlight-current-row
        @current-change="currentChangeData"
      >
        <el-table-column align="center" label="序号" type="index" width="50" />
        <el-table-column prop="consNo" align="center" label="户号" />
        <el-table-column prop="subdistrictName" align="center" label="客户名称" />
        <el-table-column prop="subdistrictCode" align="center" label="客户代码" />
        <el-table-column prop="bseInd" align="center" label="所属行业" :formatter="formatter" />
        <el-table-column prop="subdistrictAddress" align="center" label="用电地址" />
        <el-table-column prop="linkmanName" align="center" label="联系人" width="95" />
        <el-table-column prop="linkmanPhone" align="center" label="联系电话" />
        <el-table-column prop="rarea.areaName" align="center" label="所属地区" width="95" />
        <!--        <el-table-column prop="consNo" align="center" label="业务配置" />-->
      </el-table>
      <div style="float: right;margin-top:10px">
        <el-pagination
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 50,100]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="650px"
      center
    >
      <div class="dialogDiv">
        <el-form ref="form" :label-position="labelPosition" :model="form" label-width="80px">
          <el-row :gutter="gutter">
            <el-col :span="12">
              <el-form-item label="户号">
                <el-input v-model="form.consNo" size="mini" style="width:200px" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户名称">
                <el-input v-model="form.subdistrictName" size="mini" style="width:200px" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="gutter">
            <el-col :span="12">
              <el-form-item label="用户代码">
                <el-input v-model="form.subdistrictCode" size="mini" style="width:200px" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同容量">
                <el-input v-model="form.decCapacity" size="mini" style="width:200px" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="gutter">
            <el-col :span="12">
              <el-form-item label="所属行业">
                <el-select v-model="form.bseInd" filterable clearable size="mini" style="width:200px" placeholder="请选择">
                  <el-option
                    v-for="item in industrys"
                    :key="item.codeId"
                    :label="item.codeName"
                    :value="item.codeValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用电地址">
                <el-input v-model="form.subdistrictAddress" size="mini" style="width:200px" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="gutter">
            <el-col :span="12">
              <el-form-item label="所属地区">
                <el-cascader
                  v-model="form.areaId"
                  size="mini"
                  placeholder="请选择"
                  :options="areas"
                  :props="{ checkStrictly: true }"
                  clearable
                />
                <!--                <el-select v-model="form.areaId" filterable clearable size="mini" style="width:200px" placeholder="请选择">-->
                <!--                  <el-option-->
                <!--                    v-for="item in areas"-->
                <!--                    :key="item.areaId"-->
                <!--                    :label="item.areaName"-->
                <!--                    :value="item.areaId"-->
                <!--                  />-->
                <!--                </el-select>-->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人">
                <el-input v-model="form.linkmanName" size="mini" style="width:200px" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="gutter">
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input v-model="form.linkmanPhone" size="mini" style="width:200px" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="经度">
                <el-input v-model="form.lng" size="mini" style="width:200px" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="gutter">
            <el-col :span="12">
              <el-form-item label="维度">
                <el-input v-model="form.lat" size="mini" style="width:200px" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业简介">
                <el-input v-model="form.bseDes" size="mini" style="width:200px" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="gutter">
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input v-model="form.remark" type="textarea" size="mini" style="width:200px" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业logo">
                <el-upload
                  class="avatar-uploader"
                  :action="action"
                  :headers="headers"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRsubdistricts, saveRsubdistrict, getRsubdistrictById } from '@/api/subdistricts'
import { getCodeByCodeSortId } from '@/api/pcode'
import { getAreaCascadeById } from '@/api/area'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      listLoading: false,
      dialogFormVisible: false,
      dialogTitle: '新增用户',
      labelPosition: 'right',
      gutter: 30,
      currentRow: {},
      areas: [],
      action: process.env.VUE_APP_BASE_API + '/file/uploadPicture',
      imageUrl: '',
      headers: {
        ecmp_login_token: getToken()
      },
      industrys: [],
      areaId: [],
      formInline: {
        consNo: '',
        subdistrictName: '',
        areaId: '',
        industry: ''
      },
      form: {
      },
      areIdInd: 0,
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 10
      },
      total: 0
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
    handleSizeChange(val) {
      this.page.pageSize = val
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
    },
    onQuery() {
      this.page.currentPage = 1
      this.getRsubdistricts()
    },
    formatter(row) {
      let name = ''
      this.industrys.forEach(industry => {
        if (industry.codeValue === row.bseInd) {
          name = industry.codeName
        }
      })
      return name
    },
    addSubdistrict() {
      this.clean()
      this.dialogTitle = '新增用户'
      this.dialogFormVisible = true
    },
    async updateSubdistrict() {
      if (Object.keys(this.currentRow).length === 0) {
        this.$message('请单机选择需要修改的客户后点击修改')
        return
      }
      this.clean()
      this.dialogTitle = '修改用户'
      this.dialogFormVisible = true
      const result = await getRsubdistrictById(this.currentRow.subdistrictId)
      if (result.success) {
        this.form = result.data
        this.form.areaId = this.findCascade(this.areas, result.data.rarea.areaId)
      }
    },
    findCascade(areas, areaId) {
      let areaIdMap = {}
      areas.forEach((childrenCascade, index) => {
        const map = this.foreachCascade(childrenCascade, areaId, {}, index)
        if (this.areIdInd === index) {
          areaIdMap = map
        }
      })
      const areaIds = []
      this.getAreaIdArray(areaIdMap, areaIds)
      return areaIds
    },
    getAreaIdArray(map, areaIds) {
      areaIds.push(map.key)
      if (map.hasOwnProperty('map')) {
        this.getAreaIdArray(map.map, areaIds)
      }
    },
    foreachCascade(cascade, areaId, map, index) {
      map = {
        isEnd: false,
        key: cascade.value
      }
      if (cascade.value === areaId.toString()) {
        map.isEnd = true
        this.areIdInd = index
      } else if (cascade.children !== null) {
        cascade.children.forEach(childrenCascade => {
          const tMap = this.foreachCascade(childrenCascade, areaId, {}, index)
          map.map = tMap
        })
      }
      return map
    },

    handleAvatarSuccess(res, file) {
      if (res.success) {
        this.form.bseLogo = res.data
        this.imageUrl = URL.createObjectURL(file.raw)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    currentChangeData(val) {
      this.currentRow = val
    },
    clean() {
      this.form = {}
    },
    async onSubmit() {
      this.dialogFormVisible = false
      if (this.form.areaId.length > 0) {
        this.form.areaId = this.form.areaId[this.form.areaId.length - 1]
      }
      const result = await saveRsubdistrict(this.form)
      if (result.success) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.getRsubdistricts()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialogDiv{
    height: 380px;
    overflow-x: hidden;
  }
  .bg-item{
    color: #fff;
    &:not(:last-child){
      margin-bottom: 10px;
    }
    h3{
      font-size: 16px;
    }
    .operation_button{
      float: right;
      margin-top: 10px;
      margin-bottom: 20px;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
</style>
