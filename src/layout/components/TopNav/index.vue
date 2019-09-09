<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="horizontal"
      >
        <top-nav-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          style="display: inline-block"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '../Sidebar/Logo'
import TopNavItem from '../Sidebar/TopNavItem'
import variables from '@/styles/variables.scss'

export default {
  components: { TopNavItem, Logo },
  data() {
    return {
      navList: [{
        'path': '/form',
        meta: { title: '表单父级', icon: 'example' },
        'children': [
          {
            'path': '/form',
            'name': 'Form',
            'meta': {
              'title': '表单',
              'icon': 'form'
            }
          }
        ]
      },
      {
        path: '/example',
        'meta': { 'title': '菜单3' },
        'children': [
          {
            'path': '/table',
            'name': 'Menu1-1',
            'meta': { 'title': '菜单2' }
          },
          {
            'path': '/tree',
            'name': 'Menu1-2',
            'meta': { 'title': '菜单2' }
          }
        ]
      },
      {
        path: '/sysManage',
        'meta': { 'title': '系统管理' },
        'children': [
          {
            'path': '/userManage',
            'name': 'UserManage',
            'meta': { 'title': '用户管理' }
          },
          {
            'path': '/roleManage',
            'name': 'RoleManage',
            'meta': { 'title': '角色管理' }
          },
          {
            'path': '/menuManage',
            'name': 'MenuManage',
            'meta': { 'title': '角色管理' }
          }
        ]
      }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routes'
    ]),
    // routes() {
    //   return this.$router.options.routes
    // },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    // console.log(this.permission_routes)
  }
}
</script>
