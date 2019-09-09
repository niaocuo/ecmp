<template>
  <div>
    <!-- 基本信息 -->
    <div class="top-item clearfix">
      <div class="number-info fl user-number">
        <p>用户数量</p>
        <p style="font-size: 22px;">32户</p>
      </div>
      <div class="fr item user-number " style="margin-bottom:10px">
        <p>配电所 <span class="fr">30户</span></p>
      </div>
      <div class="fr item user-number ">
        <p>110kV交电站 <span class="fr">2座</span></p>
      </div>
    </div>
    <div class="bot-item">
      <div style="border-bottom: 2px solid #bc7724;"><img src="@/assets/dapiimg/icon1.png">变压器数量 <span class="fr">756台</span></div>
      <div><img src="@/assets/dapiimg/icon2.png">总额定容量<span class="fr">2500kVA</span></div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.top-item {
  padding: 10px 20px;
  p{
    margin: 0;
    text-align: center;
    font-size: 18px;
    line-height: 40px
  }
  .user-number {
    width: 144px;
    height: 129px;
    padding: 25px 0;
    background-image: linear-gradient(90deg,rgba(100, 18, 250, 0.58) 0%,rgba(24, 152, 216, 0.58) 100%),linear-gradient(#0a274f, #0a274f);
  }
  .item{
    width: 245px;
    height: 59px;
    padding: 0;
    p{
        line-height: 59px;
        text-align: left;
        font-size: 18px;
        padding: 0 20px
    }
  }
}
.bot-item{
    div{
        line-height: 60px;
        text-align: left;
        padding: 0 20px;
        padding-right: 40px
    }
    img{
      vertical-align: sub;
      width: 20px;
      margin-right: 5px
    }
}

</style>
