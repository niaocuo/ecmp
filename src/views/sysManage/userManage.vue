<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline.roleName" size="small" placeholder="角色名称" />
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="formInline.phone" size="small" placeholder="手机号码" />
      </el-form-item>
      <el-form-item label="角色">
        <el-input v-model="formInline.role" size="small" placeholder="角色" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        <el-button size="small" @click="handleAddRole">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 用户列表 -->
    <el-table v-loading="listLoading" :data="userList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="用户id" width="80">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名称" width="120">
        <template slot-scope="scope">
          {{ scope.row.trueName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户手机号" width="120">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="用户说明">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑角色':'新增角色'">
      <el-form :model="form" label-width="80px" label-position="left">
        <el-form-item label="真实姓名">
          <el-input v-model="form.trueName" placeholder="真实姓名" />
        </el-form-item>
        <el-form-item label="登录名称">
          <el-input v-model="form.loginName" placeholder="登录名称" />
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="form.password" type="password" placeholder="登录密码" />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            v-model="form.phone"
            placeholder="手机号码"
          />
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input
            v-model="form.email"
            placeholder="邮箱地址"
          />
        </el-form-item>
        <!-- <el-form-item label="用户描述">
          <el-input
            v-model="form.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="用户描述"
          />
        </el-form-item> -->
        <el-form-item label="角色权限">
          <el-checkbox-group v-model="form.roleIds">
            <el-checkbox label="复选框 A" />
            <el-checkbox label="复选框 B" />
            <el-checkbox label="复选框 C" />
            <el-checkbox label="禁用" />
            <el-checkbox label="选中且禁用" />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// addRole, deleteRole, updateRole
import { mapGetters } from 'vuex'
// import path from 'path'
import { deepClone } from '@/utils'
import { getUsers, getUserById, deleteAndupdateRole, removeUser } from '@/api/user'
const defaultUser = {
  id: '',
  trueName: 'sd',
  loginName: '',
  password: '',
  phone: '',
  email: '',
  sex: 1,
  areaId: '',
  status: 1,
  avatar: '',
  roleIds: ['复选框 A']
}
export default {
  name: 'RoleManage',
  data() {
    return {
      // 查询条件表单
      formInline: {
        roleName: '',
        phone: '',
        role: ''
      },
      listLoading: true,
      // 新增修改用户表单
      form: Object.assign({}, defaultUser),
      // 用户列表
      userList: [],
      routes: [],

      dialogType: 'edit', // 默认弹出编辑角色 new === 新增角色
      dialogVisible: false,
      checkStrictly: false

    }
  },
  computed: {
    routesData() {
      return this.routes
    },
    ...mapGetters([
      'permission_routes'
    ])
  },
  created() {
    // 获取所有角色与角色列表
    this.getUsers()
    this.getUserById()
  },
  methods: {
    onSubmit() {
      this.getUsers()
      // console.log('submit!')
    },
    // 获取用户列表
    async getUsers() {
      this.userList = []
      this.listLoading = true
      const res = await getUsers()
      this.listLoading = false
      // this.serviceRoutes = res.data
      this.userList = res.data
      // this.routes = this.generateRoutes(this.permission_routes)
    },
    // 获取用户信息
    async getUserById() {
      const res = await getUserById()
      console.log(res)
    },

    // 新增用户
    handleAddRole() {
      this.form = Object.assign({}, defaultUser)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    // 编辑用户
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.form = deepClone(scope.row)
      if (!this.form.roleIds) {
        this.form.roleIds = defaultUser.roleIds
      }
      console.log(this.form)
    },
    // 删除用户
    handleDelete({ $index, row }) {
      this.$confirm('确定删除该用户?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // row.id
          await removeUser(3)
          this.userList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    },
    // 确认提交
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'
      if (isEdit) {
        await deleteAndupdateRole(this.form)
        for (let index = 0; index < this.userList.length; index++) {
          if (this.userList[index].id === this.form.id) {
            this.userList.splice(index, 1, Object.assign({}, this.form))
            break
          }
        }
      } else {
        const { data } = await deleteAndupdateRole(this.form)
        this.user.id = data.id
        this.userList.push(this.form)
      }
      // const { description, key, name } = this.role
      this.dialogVisible = false
      // this.$notify({
      //   title: 'Success',
      //   dangerouslyUseHTMLString: true,
      //   message: `
      //       <div>Role Key: ${key}</div>
      //       <div>Role Name: ${name}</div>
      //       <div>Description: ${description}</div>
      //     `,
      //   type: 'success'
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
