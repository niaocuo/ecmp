<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名称">
        <el-select v-model="formInline.userId" filterable clearable size="small" placeholder="请选择">
          <el-option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="formInline.createTime"
          size="small"
          type="daterange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item label="登陆名称">
        <el-input v-model="formInline.loginName" size="small" placeholder="用户名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        <el-button size="small" @click="handleAddRole">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 用户列表 -->
    <el-table v-loading="listLoading" :data="userList" style="width: 100%;margin-top:30px;" stripe>
      <el-table-column prop="trueName" align="center" label="用户名称" width="120" />
      <el-table-column prop="updateTime" align="center" label="性别" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.sex==1">男</span>
          <span v-else> 女</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间" width="180" />
      <el-table-column prop="updateTime" align="center" label="更新时间" width="180" />
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
    <!-- 弹窗 -->
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑用户':'新增用户'">
      <el-form ref="userForm" :rules="rules" :model="form" label-width="80px" label-position="left">
        <el-form-item label="真实姓名">
          <el-input v-model="form.trueName" placeholder="真实姓名" />
        </el-form-item>
        <el-form-item label="登录名称">
          <el-input v-model="form.loginName" placeholder="登录名称" />
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input
            v-model="form.email"
            placeholder="邮箱地址"
          />
        </el-form-item>
        <el-form-item label="用户描述">
          <el-input
            v-model="form.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="用户描述"
          />
        </el-form-item>
        <el-form-item label="角色权限">
          <el-checkbox-group v-model="form.roleIds">
            <el-checkbox v-for="role in roles" :key="role.id" :label="role.id">{{ role.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible=false">取消</el-button>
        <el-button size="small" type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSelectUsers } from '@/api/common'
import { mapGetters } from 'vuex'
import { getUsers, saveUser, removeUser, getRoleIds, getUserById } from '@/api/user'
export default {
  name: 'UserManage',
  data() {
    return {
      // 查询条件表单
      formInline: {
        userId: '',
        loginName: '',
        createTime: ''
      },
      roles: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6// 如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
      users: [],
      page: {
        currentPage: 1,
        pageSize: 5
      },
      total: 0,
      listLoading: true,
      // 新增修改用户表单
      form: {
        id: '',
        trueName: '',
        loginName: '',
        password: '',
        phone: '',
        email: '',
        sex: 1,
        areaId: '',
        status: 1,
        avatar: '',
        roleIds: []
      },
      // 用户列表
      userList: [],
      routes: [],
      rules: {
        loginName: [
          { required: true, message: '登陆名不能为空', trigger: 'blur' }
        ],
        trueName: [
          { required: true, message: '用户真是姓名不能为空', trigger: 'blur' }
        ]
      },
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
  watch: {
    page: {
      handler(val, oldVal) {
        this.getUsers()
      }, deep: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getSelectUsers().then((respone) => {
        if (respone.success) {
          this.users = respone.data
        }
      })
      getRoleIds().then((respone) => {
        if (respone.success) {
          this.roles = respone.data
        }
      })
      this.getUsers()
    },
    onSubmit() {
      this.getUsers()
    },
    handleSizeChange(val) {
      this.page.pageSize = val
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
    },
    // 获取用户列表
    async getUsers() {
      this.userList = []
      this.listLoading = true
      const user = Object.assign(this.page, this.formInline)
      const res = await getUsers(user)
      this.listLoading = false
      this.userList = res.data.listData
      this.total = res.data.total
    },
    // 新增用户
    handleAddRole() {
      this.form = { roleIds: [] }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    // 编辑用户
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      const roleIds = []
      getUserById(scope.row.id).then((respone) => {
        if (respone.success) {
          respone.data.roles.forEach((role) => {
            roleIds.push(role.id)
          })
        }
      })
      this.form = Object.assign(scope.row, { roleIds: roleIds, roles: [] })
    },
    // 删除用户
    handleDelete(scope) {
      this.$confirm('确定删除该用户?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const { success } = await removeUser(scope.row.id)
          if (success) {
            this.getUsers()
          }
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
        const { success } = await saveUser(this.form)
        if (success) {
          this.getUsers()
        }
      } else {
        const { success } = await saveUser(this.form)
        if (success) {
          this.getUsers()
        }
      }
      this.dialogVisible = false
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
