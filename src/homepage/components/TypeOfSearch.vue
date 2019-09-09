<template>
  <div>
    <div class="fixtop tableul">
      <ul>
        <li>告警设备</li>
        <li>告警类型</li>
        <li>发生时间</li>
        <li>描述</li>
        <li>已处理</li>
      </ul>
    </div>
    <div class="main tableul">
      <div class="show1">
        <ul>
          <li>告警设备告警设备</li>
          <li>告警类型</li>
          <li>2019-8-23</li>
          <li>描述描述描述描述</li>
          <li>已处理</li>
        </ul>
        <ul>
          <li>新闻2</li>
          <li>新闻2</li>
          <li>新闻2</li>
          <li>新闻2</li>
          <li>新闻2</li>
        </ul>
        <ul>
          <li>新闻3</li>
          <li>新闻3</li>
          <li>新闻3</li>
          <li>新闻3</li>
          <li>新闻3</li>
        </ul>
        <ul>
          <li>新闻4</li>
          <li>新闻4</li>
          <li>新闻4</li>
          <li>新闻4</li>
          <li>新闻4</li>
        </ul>
        <ul>
          <li>新闻5</li>
          <li>新闻5</li>
          <li>新闻5</li>
          <li>新闻5</li>
          <li>新闻5</li>
        </ul>
        <ul>
          <li>新闻6</li>
          <li>新闻6</li>
          <li>新闻6</li>
          <li>新闻6</li>
          <li>新闻6</li>
        </ul>
        <ul>
          <li>新闻7</li>
          <li>新闻7</li>
          <li>新闻7</li>
          <li>新闻7</li>
          <li>新闻7</li>
        </ul>
        <ul>
          <li>新闻8</li>
          <li>新闻8</li>
          <li>新闻8</li>
          <li>新闻8</li>
          <li>新闻8</li>
        </ul>
      </div>
      <div class="show2" />
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    // this.scrollInfinite()
  },
  methods: {
    scrollInfinite() {
      var main = document.getElementsByClassName('main')[0]
      var show1 = document.getElementsByClassName('show1')[0]
      var show2 = document.getElementsByClassName('show2')[0]
      var timeId
      show2.innerHTML = show1.innerHTML
      timeId = setInterval(play, 50)
      function play() {
        if (main.scrollTop >= show1.offsetHeight) {
          main.scrollTop = 0
        } else {
          main.scrollTop++
        }
      }
      play()
      main.onmouseover = function() {
        clearInterval(timeId)
      }
      main.onmouseout = function() {
        timeId = setInterval(play, 50)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
ul li,
ol li {
  list-style-type: none;
}
a {
  text-decoration: none;
}
/*代码主体*/
.main {
  height: 200px;
  overflow-y: hidden;
}
.show1 li,
.show2 li {
  width: 100%;
  height: 26px;
  border-bottom: 1px solid #19b1c9;
  box-sizing: border-box;
  text-align: center;
  line-height: 26px;
  font-size: 12px;
  cursor: pointer;
}

.fixtop.tableul {
  width: 436px;
  height: 20px;
  background-color: #19b1c9;
  ul li {
    line-height: 20px;
    font-size: 16px;
  }
}
.tableul {
  ul {
    font-size: 0;
    li {
      display: inline-block;
      color: #fff;
      font-size: 14px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:nth-child(1) {
        width: 24%;
      }
      &:nth-child(2) {
        width: 18%;
      }
      &:nth-child(3) {
        width: 18%;
      }
      &:nth-child(4) {
        width: 22%;
      }
      &:nth-child(5) {
        width: 18%;
      }
    }
  }
}
</style>
