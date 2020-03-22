<template>
  <PageLayout :tree-data="treeData" @handleNodeClick="handleNodeClick">
    <div slot="rightContent" class="rightContent">
      <div class="bg-item">
        <h3>基本信息</h3>
        <div class="base_info_class">
          <p>客户编号：132132</p>
          <p>客户名称：132132</p>
          <p>所属行业：132132</p>
        </div>
        <div class="base_info_class">
          <p>合同容量：132132</p>
          <p>用电地址：132132</p>
        </div>
      </div>
      <div class="bg-item">
        <h3>网关列表</h3>
        <el-row :gutter="10">
          <el-col :span="6">
            <div class="gatewayItem addGateway">
              <i class="el-icon-plus" />
              新增网关
            </div>
          </el-col>
          <el-col v-for="(item,index) in gatewayList" :key="index" :span="6">
            <div class="gatewayItem">
              <h4>资产编号:{{ item.name }}</h4>
              <p>设备型号:{{ item.type }}</p>
              <p>生产厂家:{{ item.manufacturer }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="bg-item">
        <h3>终端列表</h3>
        <div class="tableSearch">
          <el-form ref="treeform" :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="资产编号">
              <el-input v-model="formInline.name" size="mini" style="width:150px" placeholder="资产编号" />
            </el-form-item>
            <el-form-item label="安装位置">
              <el-input v-model="formInline.position" size="mini" style="width:150px" placeholder="安装位置" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="onSubmit('treeform')">查询</el-button>
            </el-form-item>
            <div class="operation_button">
              <el-button type="primary" size="mini" @click="onSubmit('treeform')">新增</el-button>
              <el-button type="primary" size="mini" @click="onSubmit('treeform')">修改</el-button>
              <el-button type="primary" size="mini" @click="onSubmit('treeform')">删除</el-button>
            </div>
          </el-form>
        </div>
        <el-table
          v-loading="terminalTableListLoading"
          :data="terminalTableList"
          element-loading-text="Loading"
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="序号" type="index" width="50" />
          <el-table-column prop="rsubdistrict.consNo" align="center" label="资产编号" width="150" />
          <el-table-column prop="rsubdistrict.consNo" align="center" label="终端名称" />
          <el-table-column prop="rsubdistrict.consNo" align="center" label="安装位置" />
          <el-table-column prop="rsubdistrict.consNo" align="center" label="终端类型" />
          <el-table-column prop="rsubdistrict.consNo" align="center" label="所属网关" width="95" />
        </el-table>
      </div>
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/PageLayout'
import { getAreaToEquipmentTree } from '@/api/station'
export default {
  components: { PageLayout },
  data() {
    return {
      terminalTableListLoading: false,
      treeData: [],
      gatewayList: [
        {
          name: '资产编号',
          type: '设备型号',
          manufacturer: '生产厂家'
        },
        {
          name: '资产编号',
          type: '设备型号',
          manufacturer: '生产厂家'
        },
        {
          name: '资产编号',
          type: '设备型号',
          manufacturer: '生产厂家'
        }
      ],
      formInline: {
        name: '',
        position: ''
      },
      terminalTableList: [
        {
          consNo: 132233 // 资产编号
        },
        {
          consNo: 132233 // 资产编号
        },
        {
          consNo: 132233 // 资产编号
        },
        {
          consNo: 132233 // 资产编号
        }
      ]
    }
  },
  mounted() {
    this.getAreaToEquipmentTree()
  },
  methods: {
    // 查询左侧树数据
    async getAreaToEquipmentTree() {
      const result = await getAreaToEquipmentTree(0)
      this.treeData = result.data
    },
    // 树节点点击
    handleNodeClick(data) {
      console.log(data)
    },
    // 表格查询
    onSubmit() {

    }
  }
}
</script>
<style lang="scss" scoped>
  .bg-item{
    margin-bottom: 10px;
    color: #fff;
    h3{
      font-size: 16px;
    }

    .base_info_class{
      display: flex;
      padding-left: 80px;
      p{
        min-width: 33.3%;
      }

    }
    .gatewayItem{
      padding: 20px 20px 2px 20px;
      height: 135px;
      background:#162b3c ;
      border-radius:10px;
      overflow: hidden;
      h4{
        margin: 0;
        border-bottom:1px solid #666666;
        padding-bottom: 10px;
      }
    }
    .addGateway{
      text-align: center;
      cursor: pointer;
      color: #999;
      .el-icon-plus{
        display: block;
        font-size: 50px;
        margin-top: 10px;
        margin-bottom: 5px;
      }
    }
    .operation_button{
      float: right;
      margin-top: 10px;
    }
  }
</style>
