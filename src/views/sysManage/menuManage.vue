<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="6">
        <div>
          <el-tree
            ref="tree"
            node-key="id"
            :load="loadNode"
            lazy
            highlight-current
            :props="defaultProps"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
            @node-contextmenu="rightClick"
          />
          <div v-show="menuVisibleGroup">
            <div id="groupMune" class="nodeMenu">
              <a><div class="node-menu-item" @click="addGroup"><i class="el-icon-folder-add" />&nbsp;新增菜单</div></a>
              <a><div class="node-menu-item" @click="removeGroup"><i class="el-icon-delete" />&nbsp;删除菜单</div></a>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <el-form ref="menuForm" :model="menuForm" :rules="rules" label-width="100px">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="menuForm.name" />
          </el-form-item>
          <el-form-item label="链接地址" prop="link">
            <el-input v-model="menuForm.link" />
          </el-form-item>
          <el-form-item label="图片" prop="iconUrl">
            <el-input v-model="menuForm.iconUrl" />
          </el-form-item>
          <el-form-item v-show="isUpdatMenu" label="同级序号" prop="menuOrder">
            <el-input v-model="menuForm.menuOrder" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="menuForm.description" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm('menuForm')">确定</el-button>
            <el-button size="small" @click="resetForm('menuForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { saveMenu, getMenuByParentId, removeMenu } from '@/api/menu'
export default {
  name: 'MenuManage',
  data() {
    return {
      menuId: null,
      parentId: -1,
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      },
      isUpdatMenu: false,
      operationNode: '',
      tmpResolve: {},
      menuVisibleGroup: false, // 打开右键弹框
      menuForm: {
        name: '',
        link: '',
        iconUrl: '',
        description: '',
        menuOrder: ''
      },
      rules: {
        name: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.tmpResolve['-1'] = resolve
        return resolve([{
          id: -1,
          name: '电力运维系统',
          leaf: false
        }])
      }
      this.tmpResolve[node.data.id] = resolve
      getMenuByParentId(node.data.id).then((respone) => {
        resolve(respone.data)
      })
    },
    handleNodeClick(data, node) {
      this.menuVisibleGroup = false
      if (data.id === -1) {
        this.isUpdatMenu = false
        this.$refs['menuForm'].resetFields()
      } else {
        this.isUpdatMenu = true
        this.parentId = data.parentId
        this.menuId = data.id
        this.menuForm.name = data.name
        this.menuForm.link = data.link
        this.menuForm.iconUrl = data.iconUrl
        this.menuForm.description = data.description
        this.menuForm.menuOrder = data.menuOrder
        this.operationNode = node.parent
      }
    },
    rightClick(e, data, node) {
      this.$refs.tree.setCurrentKey(data.id)
      if (data.id === -1) {
        this.operationNode = node
      } else {
        this.operationNode = node.parent
      }
      this.menuVisibleGroup = true
      this.menuId = data.id
      const menuD = document.querySelector('#groupMune')
      menuD.style.left = e.clientX + 'px'
      menuD.style.top = e.clientY + 'px'
      document.addEventListener('click', this.fooGroup)
    },
    addGroup() {
      this.$refs['menuForm'].resetFields()
      this.isUpdatMenu = false
      this.parentId = this.menuId
      this.menuId = null
    },
    removeGroup() {
      this.$confirm('确认删除？').then(() => {
        removeMenu(this.menuId).then((respone) => {
          if (respone.success) {
            if (this.operationNode === '') {
              this.operationNode === -1
            }
            getMenuByParentId(this.operationNode.data.id).then((respone) => {
              this.tmpResolve[this.operationNode.data.id](respone.data)
            })
            this.$refs['menuForm'].resetFields()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    fooGroup() {
      this.menuVisibleGroup = false
      document.removeEventListener('click', this.fooGroup)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const menu = Object.assign({}, this.menuForm)
          menu.id = this.menuId
          menu.parentId = this.parentId
          saveMenu(menu).then((respone) => {
            if (respone.success && !this.isUpdatMenu) {
              getMenuByParentId(this.operationNode.data.id).then((respone) => {
                if (this.operationNode === '') {
                  this.tmpResolve[-1](respone.data)
                } else {
                  this.tmpResolve[this.operationNode.data.id](respone.data)
                }
              })
              this.$refs['menuForm'].resetFields()
            } else if (respone.success && this.isUpdatMenu) {
              getMenuByParentId(this.operationNode.data.id).then((respone) => {
                this.tmpResolve[this.operationNode.data.id](respone.data)
                this.$refs.tree.setCurrentKey(menu.id)
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
    .nodeMenu{
      background: #fff;
      position: fixed;
      border: 1px solid #ccc;
      z-index: 10;
    }
  }
</style>
