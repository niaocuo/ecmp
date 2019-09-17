<template>
  <div>
    <el-row>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="角色名称">
          <el-input v-model="formInline.roleName" size="small" placeholder="角色名称" />
        </el-form-item>
        <el-form-item label="创建人">
          <el-select v-model="formInline.creator" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in creators"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="更新人">
          <el-select v-model="formInline.updator" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in updators"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" @click="getTableData">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" icon="el-icon-plus" @click="addRole">新增角色</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table v-loading="loading" :data="tableData" style="width: 100%;margin-top:30px;" border>
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="creatorName" label="创建人" width="150" />
        <el-table-column prop="createTime" label="创建日期" width="180" />
        <el-table-column prop="updatorName" label="更新人" width="150" />
        <el-table-column prop="updateTime" label="更新日期" width="180" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editorRole(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="removeRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right">
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
    </el-row>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <el-divider />
      <el-tree
        v-if="dialogFormVisible"
        ref="tree"
        node-key="id"
        :load="loadNode"
        lazy
        highlight-current
        default-expand-all
        check-on-click-node
        :props="defaultProps"
        :default-checked-keys="menuKeys"
        show-checkbox
      />
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getSelectUsers } from '@/api/common'
import { getRoles, saveRole, deleteRole, getRoleById } from '@/api/role'
import { getMenuByParentId } from '@/api/menu'
export default {
  name: 'RoleManage',
  data() {
    return {
      formInline: {
        roleName: '',
        creator: '',
        updator: ''
      },
      dialogTitle: '新增角色',
      creators: [],
      updators: [],
      loading: false,
      page: {
        currentPage: 1,
        pageSize: 5
      },
      total: 0,
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: ''
      },
      roleId: null,
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      },
      menuKeys: [-1],
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    page: {
      handler(val, oldVal) {
        this.getTableData()
      }, deep: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getSelectUsers().then((respone) => {
        if (respone.success) {
          this.creators = respone.data
          this.updators = respone.data
        }
      })
      // 初始化列表
      this.getTableData()
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{
          id: -1,
          name: 'XX管理系统',
          leaf: false
        }])
      }
      getMenuByParentId(node.data.id).then((respone) => {
        resolve(respone.data)
      })
    },
    handleSizeChange(val) {
      this.page.pageSize = val
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
    },
    getTableData() {
      this.loading = true
      const role = Object.assign(this.page, this.formInline)
      getRoles(role).then((response) => {
        if (response.success) {
          this.tableData = response.data.listData
          this.total = response.data.total
        }
        this.loading = false
      })
    },
    addRole() {
      this.form.name = ''
      this.roleId = null
      this.dialogFormVisible = true
      this.dialogTitle = '新增角色'
      this.menuKeys = [-1]
    },
    editorRole(row) {
      this.menuKeys = []
      this.dialogFormVisible = true
      this.dialogTitle = '修改角色'
      getRoleById(row.id).then((result) => {
        if (result.success) {
          this.form.name = result.data.name
          this.roleId = result.data.id
          result.data.menus.forEach((menu) => {
            this.menuKeys.push(menu.id)
          })
        }
      })
    },
    removeRole(row) {
      this.$confirm('确认删除？').then(() => {
        deleteRole(row.id).then((result) => {
          if (result.success) {
            this.getTableData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          this.menuKeys = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
          const role = {
            id: this.roleId,
            name: this.form.name,
            menuIds: this.menuKeys
          }
          saveRole(role).then((result) => {
            if (result.success) {
              this.getTableData()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
