<template>
  <div v-if="pageIsShow" class="home-content bg">
    <div id="box" />
    <div class="canvas" style="opacity: .9">
      <canvas id="canv" width="1920" height="572" />
    </div>
    <div class="head">
      <h1>张 力 器 监 控 系 统</h1>
      <div class="weather">
        <span id="showTime"> {{ nowTime }}</span>
      </div>
    </div>
    <div class="mainbox">
      <ul class="clearfix">
        <li>
          <div class="boxall" style="height: 3.2rem">
            <div class="alltitle">报 警 统 计(W)</div>
            <div id="echart1" class="allnav" />
            <div class="boxfoot" />
          </div>
        </li>
        <li>
          <div class="map">
            <div class="boxall" style="height: 3.2rem">
              <div style="height: 3.2rem">
                <div style="color: #fff; font-size: 0.22rem; text-align: center;margin-top: 0.125rem">苏 州 创 易 技 研 股 份 有 限 公 司</div>
                <div class="barbox" style="margin-top: 0.2rem;">
                  <ul class="clearfix">
                    <li class="pulll_left counter counter-list">
                      <div class="counter-list-title">子 站 总 数 ：</div>
                      <div class="counter-list-nubmer">
                        <div class="border-sty">22 (台)</div>
                      </div>
                    </li>
                    <li class="pulll_left counter counter-list">
                      <div class="counter-list-title">张 力 器 总 数 ：</div>
                      <div class="counter-list-nubmer">
                        <div class="border-sty">20 (台)</div>
                      </div>
                    </li>
                  </ul>
                  <ul class="clearfix">
                    <li class="pulll_left counter counter-list">
                      <div class="counter-list-title">在 线 子 站 ：</div>
                      <div class="counter-list-nubmer">
                        <div class="border-sty">12 (台)</div>
                      </div>
                    </li>
                    <li class="pulll_left counter counter-list">
                      <div class="counter-list-title">在 线 张 力 器 ：</div>
                      <div class="counter-list-nubmer">
                        <div class="border-sty">12 (台)</div>
                      </div>
                    </li>
                  </ul>
                  <ul class="clearfix">
                    <li class="pulll_left counter counter-list">
                      <div class="counter-list-title">离 线 子 站 ：</div>
                      <div class="counter-list-nubmer">
                        <div class="border-sty">10 (台)</div>
                      </div>
                    </li>
                    <li class="pulll_left counter counter-list">
                      <div class="counter-list-title">离 线 张 力 器 ：</div>
                      <div class="counter-list-nubmer">
                        <div class="border-sty">8 (台)</div>
                      </div>
                    </li>
                  </ul>
                  <ul class="clearfix">
                    <li class="pulll_left counter counter-list">
                      <div class="counter-list-title">产 线 总 数 ：</div>
                      <div class="counter-list-nubmer">
                        <div class="border-sty">3 (条)</div>
                      </div>
                    </li>
                    <li class="pulll_left counter counter-list">
                      <div class="counter-list-title">张 力 器 报 警 ：</div>
                      <div class="counter-list-nubmer">
                        <div class="border-sty">3 (台)</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="boxfoot" />
          </div>
        </li>
        <li>
          <div class="boxall" style="height: 3.2rem">
            <div class="alltitle">报 警 分 布 TOP5(W)</div>
            <div id="echart2" class="allnav" />
            <div class="boxfoot" />
          </div>
        </li>
      </ul>
      <ul class="clearfix">
        <li style="width: 100%;">
          <div class="boxall" style="height: 2.6rem">
            <div class="alltitle">月 度 运 行 时 间</div>
            <div id="echart3" class="allnav" />
            <div class="boxfoot" />
          </div>
        </li>
      </ul>
      <ul class="clearfix">
        <li>
          <div class="boxall" style="height: 3.96rem">
            <div class="alltitle">子 站 运 行 统 计(W)</div>
            <div id="echart4" class="allnav" />
            <div class="boxfoot" />
          </div>
        </li>
        <li>
          <div class="boxall" style="height: 3.96rem">
            <div class="alltitle">张 力 器 运 行 TOP5(W)</div>
            <div id="echart5" class="allnav" />
            <div class="boxfoot" />
          </div>
        </li>
        <li>
          <div class="map">
            <div class="boxall" style="height: 3.96rem; position: relative;">
              <div style="font-size: 0.2rem;color: #fff;text-align: center;line-height: 0.5rem;">当 日 报 警 修 复 率</div>
              <div class="boxall-text">
                <div style="display: flex">
                  <div class="counter-list-titles">修 复 总 数: </div>
                  <div class="counter-list-nubmers">13</div>
                </div>
                <div style="display: flex;margin-top: 0.06rem ;">
                  <div class="counter-list-titles">报 警 总 数: </div>
                  <div class="counter-list-nubmers">26</div>
                </div>
              </div>
              <div id="echart6" style="height: calc(100% - 30px);margin-top:0.4rem" />
            </div>
            <div class="boxfoot" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import index from './index.js'
export default index
</script>
<style>
.counter-list {
  height: 0.6rem;
  display: flex;
  align-items: center;
}
.counter-list-nubmer {
  position: relative;
  padding-left: 0.2rem;
  text-align: left;
  width: 40%;
  color: #ffeb7b;
  font-size: 0.15rem !important;
}
.border-sty,
.border-sty::before,
.border-sty::after {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.border-sty {
  position: absolute;
  top: -18px;
  left: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  margin: auto;
  color: #34a2e9 !important;
  box-shadow: inset 0 0 0 1px rgba(43, 157, 235, 0.5);
}
.border-sty::before,
.border-sty::after {
  content: "";
  z-index: -1;
  margin: -5%;
  box-shadow: inset 0 0 0 2px;
  animation: clipMe 8s linear infinite;
}
.border-sty::before {
  animation-delay: -4s;
}

@keyframes clipMe {
  0%,
  100% {
    clip: rect(0px, 110px, 2px, 0px);
  }

  25% {
    clip: rect(0px, 2px, 50px, 0px);
  }

  50% {
    clip: rect(48px, 110px, 50px, 0px);
  }

  75% {
    clip: rect(0px, 110px, 50px, 108px);
  }
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

<style scoped>
.counter-list-title {
  text-align: right;
  width: 60%;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.2rem !important;
}

.counter-list-titles {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.18rem !important;
}
.counter-list-nubmers {
  padding-left: 0.2rem;
  color: #ffeb7b;
  font-size: 0.2rem !important;
}
.counter-list-nubmer-title {
  width: 100%;
  padding-left: 0.2rem;
  text-align: center;
  color: #ffeb7b;
  font-size: 0.18rem !important;
}
.boxall-text {
  position: absolute;
  /* display: flex;
  justify-content: space-between; */
  letter-spacing: 2px;
  margin-left: 0.86rem;
  right: 0.2rem;
  top: 0.65rem;
  font-size: 18px;
  color: #fff;
}
/* spc 文字样式 */
.spc-content {
  color: rgb(92, 88, 88);
  padding-left: 0.35rem;
  font-size: 0.1rem;
}
.spc-content li {
  /* padding-right: 0.1rem; */
  color: rgba(255, 255, 255, 0.6);
}
/* 设备健康度 */
.equipment-content {
  margin-top: 0.236rem;
  display: flex;
}
.equipment-content li {
  height: 0.366rem;
  padding: 0.05rem 0;
  margin-left: 5%;
  width: 36%;
}
.equipment-li {
  display: flex;
  align-items: center;
}
.equipment-content li .equipment-title {
  padding-left: 20px;
  text-align: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.135rem;
}
.equipment-content li .equipment-score {
  text-align: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.135rem;
}
.bg {
  height: 100%;
  background-image: -webkit-radial-gradient(
    ellipse farthest-corner at center center,
    #1b44e4 0%,
    #020f3a 100%
  );
  background-image: radial-gradient(
    ellipse farthest-corner at center center,
    #1b44e4 0%,
    #020f3a 100%
  );
  /* color:; */
  cursor: move;
}

.home-content {
  background: #000d4a url("../../../../assets/home_images/bg.jpg") center top;
  background-size: cover;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.head {
  height: 1.05rem;
  background: url("../../../../assets/home_images/head_bg.png") no-repeat center
    center;
  background-size: 100% 100%;
  position: relative;
  z-index: 10;
}
/* CSS Document */
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

*,
body {
  padding: 0px;
  margin: 0px;
  color: #222;
  font-family: "微软雅黑";
}

li {
  list-style-type: none;
}

i {
  margin: 0px;
  padding: 0px;
  text-indent: 0px;
}

img {
  border: none;
  max-width: 100%;
}

a {
  text-decoration: none;
  color: #399bff;
}

a.active,
a:focus {
  outline: none !important;
  text-decoration: none;
}

ol,
ul,
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  padding: 0;
  margin: 0;
}

a:hover {
  color: #06c;
  text-decoration: none !important;
}

.clearfix:after,
.clearfix:before {
  display: table;
  content: " ";
}

.clearfix:after {
  clear: both;
}

.pulll_left {
  font-size: 0.1rem !important;
  float: left;
}

.pulll_right {
  float: right;
}

/*谷哥滚动条样式*/

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb {
  background-color: #5bc0de;
}

::-webkit-scrollbar-track {
  background-color: #ddd;
}

/***/
.canvas {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 99%;
  z-index: 1;
  pointer-events: none;
}

.allnav {
  height: calc(100% - 30px);
}

.loading {
  position: fixed;
  left: 0;
  top: 0;
  font-size: 18px;
  z-index: 100000000;
  width: 100%;
  height: 100%;
  background: #1a1a1c;
  text-align: center;
}

.loadbox {
  position: absolute;
  width: 160px;
  height: 150px;
  color: #aaa;
  left: 50%;
  top: 50%;
  margin-top: -100px;
  margin-left: -75px;
}

.loadbox img {
  margin: 10px auto;
  display: block;
  width: 40px;
}

.copyright {
  background: rgba(19, 31, 64, 0.32);
  border: 1px solid rgba(255, 255, 255, 0.05);
  line-height: 0.5rem;
  text-align: center;
  padding-right: 15px;
  bottom: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.16rem;
}

.head h1 {
  color: #fff;
  text-align: center;
  font-size: 0.4rem;
  line-height: 0.8rem;
}

.head h1 img {
  width: 1.5rem;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.2rem;
}

.weather {
  position: absolute;
  right: 0.3rem;
  top: -0.3rem;
  line-height: 0.75rem;
}

.weather img {
  width: 0.37rem;
  display: inline-block;
  vertical-align: middle;
}

.weather span {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.18rem;
  padding-right: 0.1rem;
}

.mainbox {
  padding: 0.1rem 0.1rem 0rem 0.1rem;
}

.mainbox > ul > li {
  float: left;
  padding: 0 0.1rem;
}

.mainbox > ul > li {
  width: 30%;
}

.mainbox > ul > li:nth-child(2) {
  width: 40%;
  padding: 0;
}

.boxall {
  border: 1px solid rgba(25, 186, 139, 0.17);
  padding: 0 0.2rem 0.4rem 0.15rem;
  background: rgba(255, 255, 255, 0.04)
    url("../../../../assets/home_images/line(1).png");
  background-size: 100% auto;
  position: relative;
  margin-bottom: 0.15rem;
  z-index: 10;
}

.boxall:before,
.boxall:after {
  position: absolute;
  width: 0.1rem;
  height: 0.1rem;
  content: "";
  border-top: 2px solid #02a6b5;
  top: 0;
}

.boxall:before,
.boxfoot:before {
  border-left: 2px solid #02a6b5;
  left: 0;
}

.boxall:after,
.boxfoot:after {
  border-right: 2px solid #02a6b5;
  right: 0;
}

.alltitle {
  font-size: 0.2rem;
  color: #fff;
  text-align: center;
  line-height: 0.5rem;
}

.boxfoot {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}

.boxfoot:before,
.boxfoot:after {
  position: absolute;
  width: 0.1rem;
  height: 0.1rem;
  content: "";
  border-bottom: 2px solid #02a6b5;
  bottom: 0;
}

.bar {
  background: rgba(101, 132, 226, 0.1);
  padding: 0.15rem;
}

.barbox li,
.barbox2 li {
  width: 50%;
  text-align: center;
  position: relative;
  z-index: 100;
}

.barbox:before,
.barbox:after {
  position: absolute;
  width: 0.3rem;
  height: 0.1rem;
  content: "";
}

/* .barbox:before {
  border-left: 2px solid #02a6b5;
  left: 0;
  border-top: 2px solid #02a6b5;
}

.barbox:after {
  border-right: 2px solid #02a6b5;
  right: 0;
  bottom: 0;
  border-bottom: 2px solid #02a6b5;
} */

/* .barbox li:first-child:before {
  position: absolute;
  content: "";
  height: 50%;
  width: 1px;
  background: rgba(255, 255, 255, 0.2);
  right: 0;
  top: 25%;
} */

.barbox {
  /* border: 1px solid rgba(25, 186, 139, 0.17); */
  position: relative;
}

.barbox li {
  font-size: 0.7rem;
  color: #ffeb7b;
  padding: 0.05rem 0;
  font-family: electronicFont;
  font-weight: bold;
}

.barbox2 li {
  font-size: 0.19rem;
  color: rgba(255, 255, 255, 0.7);
  padding-top: 0.1rem;
}

.map {
  position: relative;
  /* height: 7.2rem; */
  z-index: 9;
}

.map4 {
  width: 200%;
  height: 7rem;
  position: relative;
  left: -50%;
  top: 4%;
  margin-top: 0.2rem;
  z-index: 5;
}

.map1,
.map2,
.map3 {
  position: absolute;
  opacity: 0.5;
}

.map1 {
  width: 6.43rem;
  z-index: 2;
  top: 0.45rem;
  left: 0.7rem;
  animation: myfirst2 15s infinite linear;
}

.map2 {
  width: 5.66rem;
  top: 0.85rem;
  left: 1.2rem;
  z-index: 3;
  opacity: 0.2;
  animation: myfirst 10s infinite linear;
}

.map3 {
  width: 5.18rem;
  top: 1.07rem;
  left: 1.4rem;
  z-index: 1;
}

.tabs {
  text-align: center;
  padding: 0.1rem 0 0 0;
}

.tabs a {
  position: relative;
  display: inline-block;
  margin-left: 1px;
  padding: 0.05rem 0.2rem;
  color: #898989;
  transition: all 0.3s ease-out 0s;
  font-size: 14px;
}

.tabs li {
  display: inline-block;
}

.tabs a:after {
  position: absolute;
  width: 1px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  content: "";
  margin-left: 0;
  right: -1px;
  margin-top: 7px;
}

.tabs li a.active {
  border: 1px solid rgba(25, 186, 139, 0.17);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.tit02 {
  text-align: center;
  margin: 0.1rem 0;
  position: relative;
}

.tit02 span {
  border: 1px solid rgba(25, 186, 139, 0.17);
  letter-spacing: 2px;
  padding: 0.01rem 0.2rem;
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.18rem;
  color: #49bcf7;
}

.tit02:before,
.tit02:after {
  position: absolute;
  width: 26%;
  height: 1px;
  background: rgba(25, 186, 139, 0.2);
  content: "";
  top: 0.12rem;
}

.tit02:after {
  right: 0;
}

.tit02:before {
  left: 0;
}

.wrap {
  height: 2.54rem;
  overflow: hidden;
}

.wrap li {
  line-height: 0.42rem;
  height: 0.42rem;
  font-size: 0.18rem;
  text-indent: 0.24rem;
  margin-bottom: 0.1rem;
}

.wrap li p {
  border: 1px solid rgba(25, 186, 139, 0.17);
  color: rgba(255, 255, 255, 0.6);
}

.sy {
  float: left;
  width: 33%;
  height: 95%;
  margin-top: 0.25rem;
}

.adduser {
  height: 1.5rem;
  overflow: hidden;
}

.adduser li {
  height: 0.5rem;
}

.adduser img {
  width: 0.4rem;
  border-radius: 0.5rem;
  margin-right: 0.1rem;
  display: inline-block;
  vertical-align: middle;
}

.adduser span {
  line-height: 0.5rem;
  font-size: 0.18rem;
  color: rgba(255, 255, 255, 0.6);
}

.sycm ul {
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  padding: 0.16rem 0;
}

.sycm li {
  float: left;
  width: 33.33%;
  text-align: center;
  position: relative;
}

.sycm li:before {
  position: absolute;
  content: "";
  height: 30%;
  width: 1px;
  background: rgba(255, 255, 255, 0.1);
  right: 0;
  top: 15%;
}

.sycm li:last-child:before {
  width: 0;
}

.sycm li h2 {
  font-size: 0.3rem;
  color: #c5ccff;
}

.sycm li span {
  font-size: 0.18rem;
  color: #fff;
  opacity: 0.5;
}

@keyframes myfirst2 {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}

@keyframes myfirst {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-359deg);
  }
}

/*Plugin CSS*/
.str_wrap {
  overflow: hidden;
  width: 100%;
  position: relative;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  white-space: nowrap;
}

.str_move {
  white-space: nowrap;
  position: absolute;
  top: 0;
  left: 0;
  cursor: move;
}

.str_move_clone {
  display: inline-block;
  vertical-align: top;
  position: absolute;
  left: 100%;
  top: 0;
}

.str_vertical .str_move_clone {
  left: 0;
  top: 100%;
}

.str_down .str_move_clone {
  left: 0;
  bottom: 100%;
}

.str_vertical .str_move,
.str_down .str_move {
  white-space: normal;
  width: 100%;
}

.str_static .str_move,
.no_drag .str_move,
.noStop .str_move {
  cursor: inherit;
}

.str_wrap img {
  max-width: none !important;
}
</style>
