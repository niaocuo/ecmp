<template>
  <PageLayout :tree-data="treeData" @handleNodeClick="handleNodeClick">
    <div slot="rightContent" class="rightContent">
      <div class="bg-item">
        <h3>基本信息</h3>
        <div class="base_info_class">
          <p>站点名称：132132</p>
          <p>电压等级：132132</p>
          <p>运行状态：132132</p>
          <p>备注：132132</p>
        </div>
      </div>
      <div class="bg-item">
        <h3>变压器列表</h3>
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
          <el-table-column prop="rsubdistrict.consNo" align="center" label="资产编号" width="95" />
          <el-table-column prop="rsubdistrict.consNo" align="center" label="变压器名称" width="150" />
          <el-table-column prop="rsubdistrict.consNo" align="center" label="变压器类型" width="150" />
          <el-table-column prop="rsubdistrict.consNo" align="center" label="变压器卷数" />
          <el-table-column prop="rsubdistrict.consNo" align="center" label="容量" />
          <el-table-column prop="rsubdistrict.consNo" align="center" label="生产厂家" width="50" />
          <el-table-column prop="rsubdistrict.consNo" align="center" label="运行状态" width="95" />
        </el-table>
      </div>
      <div class="bg-item">
        <h3>线路列表</h3>
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
          <el-table-column prop="rsubdistrict.consNo" align="center" label="线路名称" />
          <el-table-column prop="rsubdistrict.consNo" align="center" label="线路类型" />
          <el-table-column prop="rsubdistrict.consNo" align="center" label="电压等级" />
          <el-table-column prop="rsubdistrict.consNo" align="center" label="运行状态" width="95" />
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
        min-width: 25%;
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
