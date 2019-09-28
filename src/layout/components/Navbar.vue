<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <!-- 告警按钮 -->
      <span style="vertical-align: top;" @click="opendialogVisible">
        <el-badge
          :value="5"
          :max="99"
          class="badge-item"
        >
          <i class="el-icon-bell" />
        </el-badge>
      </span>
      <el-dropdown class="avatar-container" trigger="click">

        <div class="avatar-wrapper">
          <p class="loginName">
            {{ name }}
          </p>
          <p class="loginTime loginName">
            {{ loginTime }}
          </p>
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <!-- <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu
          slot="dropdown"
          class="user-dropdown"
          placement="bottom-start"
        >
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <!-- <a target="_blank" href="https://github.com/niaocuo/ecmp/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://github.com/niaocuo/ecmp/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
          <el-dropdown-item>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="告警查询"
      width="1100px"
      :append-to-body="true"
    >
      <WaringDialog />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'
import WaringDialog from './WaringDialog'
export default {
  components: {
    WaringDialog
    // Hamburger
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'loginTime',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },

    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    opendialogVisible() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>

.loginName{
  margin: 0;
  padding: 0;
  line-height: 15px;
  text-align: center;
}
.loginTime{
  margin-top: 5px;
}
.badge-item{
  line-height: 0;
  color: #F56C6C;
  font-size: 20px;
  margin-right: 15px;
  cursor: pointer;
}
.navbar {
  height: 57px;
  overflow: hidden;
  // position: relative;
  padding: 0 30px;
  // background: #fff;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);
  // width: 100%;
  // min-width: 1400px;
  // margin: 0 auto;
  position: absolute;
  top: 0;
  z-index: 999;
  right: 0;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 57px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      // margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        padding: 13px 0;
        position: relative;
        cursor: pointer;
        color: #ffffff;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          margin: 0 0 0 10px;
          vertical-align: middle;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 23px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
