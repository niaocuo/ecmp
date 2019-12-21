<template>
  <div :class="{'has-logo':showLogo}" class="topscrollbarauto">
    <el-scrollbar wrap-class="scrollbar-wrapper" class="topmenuBar">
      <logo :collapse="isCollapse" />
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
        <top-nav-item v-for="(route,index) in navList" :key="index" :ind="index.toString()" :item="route" :base-path="route.link" style="display:inline-block" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '../Sidebar/Logo'
import TopNavItem from '../Sidebar/TopNavItem'
import variables from '@/styles/variables.scss'
import { getMenuTree } from '@/api/menu'
import { constantRoutes } from '@/router'
export default {
  components: { TopNavItem, Logo },
  data() {
    return {
      navList: []
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
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const res = await getMenuTree()
      this.navList = constantRoutes.concat(res.data)
    }
  }

}
</script>

<style  lang="scss" scoped>
@import '@/styles/variables.scss';
.el-scrollbar{
  width: 100%;
  // min-width: 1400px;
  // margin: 0 auto;

}
.topscrollbarauto{
  height: 56px;
  overflow: hidden;
  background: $menuBg;
  .topmenuBar{
    padding-left: 240px;
  }
}
</style>
