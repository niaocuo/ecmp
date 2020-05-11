<template>
  <div class="EditOsWorkFLows">
    <object id="EditOsWorkFLows" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%">
      <param name="movie" :value="`/EditOsWorkFLows.swf?tranId=${stationId}`">
      <param name="quality" value="high">
      <param name="allowScriptAccess" value="sameDomain">
      <param name="wmode" value="transparent">
      <embed
        :src="`/ShowOsWorkFlow.swf?tranId=${stationId}&cabinetId=${cabinetId}`"
        width="100%"
        height="800"
        quality="high"
        bgcolor="#6e6e6e"
        name="EditOsWorkFLows"
        align="middle"
        play="true"
        loop="false"
        allowScriptAccess="sameDomain"
        type="application/x-shockwave-flash"
      >
    </object>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stationId: 5,
      cabinetId: 6
    }
  }
}
</script>

<style lang="scss" scoped>
.EditOsWorkFLows{
  color: #ffffff;
  padding: 20px;
}
</style>
