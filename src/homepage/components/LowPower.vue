<template>
    <div class="content-item">
        <el-row :gutter="15">
            <el-col :span="8">
                <div class="item">
                    <p>今日</p>
                    <p>279kWh</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="item">
                    <p>本月</p>
                    <p>279kWh</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="item">
                    <p>年累计</p>
                    <p>279kWh</p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss" scoped>
    .content-item{
        padding: 8px 16px;
        .item{
            text-align: centerl;
            height: 82px;
            background-image: linear-gradient(90deg, 
                rgba(100, 18, 250, 0.58) 0%, 
                rgba(24, 152, 216, 0.58) 100%), 
            linear-gradient(
                #000000, 
                #000000);
            padding-top: 10px;
                p{
                    font-size: 22px;
                    margin: 0;
                    text-align: center;
                    line-height: 30px;
                    &:first-child {
                       font-size: 18px;
                    }
                }  
        }
    }
</style>