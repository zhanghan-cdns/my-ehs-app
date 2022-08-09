<!--  -->
<template>
  <div>
    <div class="wrap">
      <div class="wrap-left">
        <el-tabs
          v-if="reload"
          v-model="tabIndex"
          @tab-click="jump"
          tab-position="left"
        >
          <el-tab-pane
            :label="tabs[0].title"
            v-if="tabs[0].isShow"
            name="0"
          ></el-tab-pane>
          <el-tab-pane
            :label="tabs[1].title"
            v-if="tabs[1].isShow"
            name="1"
          ></el-tab-pane>
          <el-tab-pane
            :label="tabs[2].title"
            v-if="tabs[2].isShow"
            name="2"
          ></el-tab-pane>
          <el-tab-pane
            :label="tabs[3].title"
            v-if="tabs[3].isShow"
            name="3"
          ></el-tab-pane>
          <el-tab-pane
            :label="tabs[4].title"
            v-if="tabs[4].isShow"
            name="4"
          ></el-tab-pane>
          <el-tab-pane
            :label="tabs[5].title"
            v-if="tabs[5].isShow"
            name="5"
          ></el-tab-pane>
          <el-tab-pane
            :label="tabs[6].title"
            v-if="tabs[6].isShow"
            name="6"
          ></el-tab-pane>
          <el-tab-pane
            :label="tabs[7].title"
            v-if="tabs[7].isShow"
            name="7"
          ></el-tab-pane>
          <el-tab-pane
            :label="tabs[8].title"
            v-if="tabs[8].isShow"
            name="8"
          ></el-tab-pane>
          <el-tab-pane
            :label="tabs[9].title"
            v-if="tabs[9].isShow"
            name="9"
          ></el-tab-pane>
          <el-tab-pane
            :label="tabs[10].title"
            v-if="tabs[10].isShow"
            name="10"
          ></el-tab-pane>
          <el-tab-pane
            :label="tabs[11].title"
            v-if="tabs[11].isShow"
            name="11"
          ></el-tab-pane>
          <el-tab-pane
            :label="tabs[12].title"
            v-if="tabs[12].isShow"
            name="12"
          ></el-tab-pane>
          <el-tab-pane
            :label="tabs[13].title"
            v-if="tabs[13].isShow"
            name="13"
          ></el-tab-pane>
          <el-tab-pane
            :label="tabs[14].title"
            v-if="tabs[14].isShow"
            name="14"
          ></el-tab-pane>
          <el-tab-pane
            :label="tabs[15].title"
            v-if="tabs[15].isShow"
            name="15"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <div
        class="scroll-content"
        @scroll="onScroll"
        :style="
          'overflow-x: hidden; overflow-y: hidden;height:' +
          contentStyleObj.height
        "
      >
        <!-- 用户管理 -->
        <!-- { 'scroll-item': isBtn } -->
        <div
          :ref="tabs[0].refName"
          style="padding-top: 1rem"
          class="scroll-item"
        >
          <div class="line-title">
            <h2>{{ tabs[0].title }}</h2>
            <div style="padding-left: 100px">
              <p style="height: 10px">
                <span style="color: #4a80fc">化学品中文名称：</span
                >{{ row.cnName }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">化学品英文名称：</span
                >{{ row.enName }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">中文名称2：</span>{{ row.cnName2 }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">英文名称2：</span>{{ row.enName2 }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">技术说明书编码：</span
                >{{ row.instructionCode }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">CAS No：</span>{{ row.casNo }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">分子式：</span>{{ row.formula }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">分子量：</span
                >{{ row.formulaWeight }}
              </p>
            </div>
          </div>
        </div>
        <!-- 配置管理 -->
        <div
          :ref="tabs[1].refName"
          class="scroll-item"
          style="padding-top: 1rem"
        >
          <div class="line-title">
            <h2>{{ tabs[1].title }}</h2>
            <div class="two_box">
              <div class="two_left">
                <span>有害物质 含量 CAS No</span>
              </div>
              <div class="two_right">
                <div class="content">
                  <span>有害成分</span>
                  <span>{{ row.harmfulMaterial }}</span>
                </div>
                <div class="content">
                  <span>含量</span>
                  <span>{{ row.content }}</span>
                </div>
                <div class="content">
                  <span>CAS No</span>
                  <span>{{ row.casNo }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 角色管理 -->
        <div
          :ref="tabs[2].refName"
          class="scroll-item"
          style="padding-top: 1rem"
        >
          <div class="line-title">
            <h2>{{ tabs[2].title }}</h2>
            <div style="padding-left: 100px">
              <p style="height: 10px">
                <span style="color: #4a80fc">健康危害：</span
                >{{ row.healthHazard }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">环境危害：</span
                >{{ row.environmentHazard }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">燃爆危险：</span
                >{{ row.explosionHazard }}
              </p>
            </div>
          </div>
        </div>
        <div
          :ref="tabs[3].refName"
          class="scroll-item"
          style="padding-top: 1rem"
        >
          <div class="line-title">
            <h2>{{ tabs[3].title }}</h2>
            <div style="padding-left: 100px">
              <p style="height: 10px">
                <span style="color: #4a80fc">皮肤接触：</span>{{ row.skin }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">眼睛接触：</span>{{ row.eyes }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">吸入：</span>{{ row.breathe }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">食入：</span>{{ row.eat }}
              </p>
            </div>
          </div>
        </div>
        <div
          :ref="tabs[4].refName"
          class="scroll-item"
          style="padding-top: 1rem"
        >
          <div class="line-title">
            <h2>{{ tabs[4].title }}</h2>
            <div style="padding-left: 100px">
              <p style="height: 10px">
                <span style="color: #4a80fc">危险特性：</span>{{ row.risk }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">有害燃烧产物：</span
                >{{ row.harmfulProduct }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">灭火方法：</span>{{ row.outFire }}
              </p>
            </div>
          </div>
        </div>
        <div
          :ref="tabs[5].refName"
          class="scroll-item"
          style="padding-top: 1rem"
        >
          <div class="line-title">
            <h2>{{ tabs[5].title }}</h2>
            <div style="padding-left: 100px">
              <p style="height: 10px">
                <span style="color: #4a80fc">应急处理：</span
                >{{ row.eventContent }}
              </p>
            </div>
          </div>
        </div>
        <div
          :ref="tabs[6].refName"
          class="scroll-item"
          style="padding-top: 1rem"
        >
          <div class="line-title">
            <h2>{{ tabs[6].title }}</h2>
            <div style="padding-left: 100px">
              <p style="height: 10px">
                <span style="color: #4a80fc">操作注意事项：</span
                >{{ row.emergencyMeasure }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">储存注意事项：</span
                >{{ row.storageNotice }}
              </p>
            </div>
          </div>
        </div>
        <div
          :ref="tabs[7].refName"
          class="scroll-item"
          style="padding-top: 1rem"
        >
          <div class="line-title">
            <h2>{{ tabs[7].title }}</h2>
            <div style="padding-left: 100px">
              <p style="height: 10px">
                <span style="color: #4a80fc">中国MAC（mg/m3）：</span
                >{{ row.cnMac }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">前苏联MAC（mg/m3）：</span
                >{{ row.fsuMac }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">TLVTN：</span>{{ row.tlvtn }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">TLVWN：</span>{{ row.tlvwn }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">工程控制：</span
                >{{ row.projectControl }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">呼吸系统防护：</span
                >{{ row.breathProtect }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">眼睛防护：</span
                >{{ row.eyesProtect }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">身体防护：</span
                >{{ row.bodyProtect }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">手防护：</span
                >{{ row.handProtect }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">其他防护：</span
                >{{ row.otherProtect }}
              </p>
            </div>
          </div>
        </div>
        <div
          :ref="tabs[8].refName"
          class="scroll-item"
          style="padding-top: 1rem"
        >
          <div class="line-title">
            <h2>{{ tabs[8].title }}</h2>
            <div style="padding-left: 100px">
              <p style="height: 10px">
                <span style="color: #4a80fc">主要成分：</span
                >{{ row.mainComponent }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">外观与形状：</span>{{ row.shape }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">熔点(℃)：</span
                >{{ row.meltingPoint }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">沸点(℃)：</span
                >{{ row.boilingPoint }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">相对密度(水=1)：</span
                >{{ row.densityWater }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">相对蒸气密度(空气=1)：</span
                >{{ row.densityAir }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">饱和蒸气压(kPa)：</span
                >{{ row.airPressure }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">燃烧热(kJ/mol)：</span
                >{{ row.burnEnergy }}
              </p>

              <p style="height: 10px">
                <span style="color: #4a80fc">临界温度(℃)：</span
                >{{ row.criticalTemperature }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">临界压力(MPa)：</span
                >{{ row.criticalPressure }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">辛醇/水分配系数的对数值：</span
                >{{ row.ratio }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">闪点(℃)：</span
                >{{ row.flashPoint }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">引燃温度(℃)：</span
                >{{ row.burnPoint }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">爆炸上限%(V/V)：</span
                >{{ row.explosionUp }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">爆炸下限%(V/V)：</span
                >{{ row.explosionLow }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">主要用途：</span
                >{{ row.mainApply }}
              </p>
            </div>
          </div>
        </div>
        <div
          :ref="tabs[9].refName"
          class="scroll-item"
          style="padding-top: 1rem"
        >
          <div class="line-title">
            <h2>{{ tabs[9].title }}</h2>
            <div style="padding-left: 100px">
              <p style="height: 10px">
                <span style="color: #4a80fc">禁配物：</span>{{ row.prohibit }}
              </p>
            </div>
          </div>
        </div>
        <div
          :ref="tabs[10].refName"
          class="scroll-item"
          style="padding-top: 1rem"
        >
          <div class="line-title">
            <h2>{{ tabs[10].title }}</h2>
            <div style="padding-left: 100px">
              <p style="height: 10px">
                <span style="color: #4a80fc">急性毒性LD50：</span>{{ row.ld50 }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">急性毒性LC50：</span>{{ row.lc50 }}
              </p>
            </div>
          </div>
        </div>
        <div
          :ref="tabs[11].refName"
          class="scroll-item"
          style="padding-top: 1rem"
        >
          <div class="line-title">
            <h2>{{ tabs[11].title }}</h2>
            <div style="padding-left: 100px">
              <p style="height: 10px">
                <span style="color: #4a80fc">其他有害作用：</span
                >{{ row.otherHarmful }}
              </p>
            </div>
          </div>
        </div>
        <div
          :ref="tabs[12].refName"
          class="scroll-item"
          style="padding-top: 1rem"
        >
          <div class="line-title">
            <h2>{{ tabs[12].title }}</h2>
            <div style="padding-left: 100px">
              <p style="height: 10px">
                <span style="color: #4a80fc">废弃物性质废弃处置方法：</span
                >{{ row.wasteHandle }}
              </p>
            </div>
          </div>
        </div>
        <div
          :ref="tabs[13].refName"
          class="scroll-item"
          style="padding-top: 1rem"
        >
          <div class="line-title">
            <h2>{{ tabs[13].title }}</h2>
            <div style="padding-left: 100px">
              <p style="height: 10px">
                <span style="color: #4a80fc">危险货物编号：</span
                >{{ row.dangerCode }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">UN编号：</span>{{ row.unCode }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">包装类别：</span
                >{{ row.packageType }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">包装方法：</span
                >{{ row.packageMethod }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">运输注意事项：</span
                >{{ row.transportNotice }}
              </p>
            </div>
          </div>
        </div>
        <div
          :ref="tabs[14].refName"
          class="scroll-item"
          style="padding-top: 1rem"
        >
          <div class="line-title">
            <h2>{{ tabs[14].title }}</h2>
            <div style="padding-left: 100px">
              <p style="height: 10px">
                <span style="color: #4a80fc">法规信息：</span
                >{{ row.rulesInfo }}
              </p>
            </div>
          </div>
        </div>
        <div
          :ref="tabs[15].refName"
          class="scroll-item"
          style="padding-top: 1rem; height: 1100px"
        >
          <div class="line-title">
            <h2>{{ tabs[15].title }}</h2>
            <div style="padding-left: 100px">
              <p style="height: 10px">
                <span style="color: #4a80fc">附件：</span>
                <!-- <span @click="downloadPdf">{{row.attachment.originalFilename}}</span> -->
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contentStyleObj: {
        height: "100px",
      },
      reload: true,
      tabIndex: "0",
      tabs: [
        {
          isShow: true,
          title: "一. 化学品名称",
          refName: "setOneRef",
        },
        {
          isShow: true,
          title: "二. 成分/组成信息",
          refName: "setTwoRef",
        },
        {
          isShow: true,
          title: "三.危险性描述",
          refName: "setThreeRef",
        },
        {
          isShow: true,
          title: "四.急救措施",
          refName: "setThreeRef",
        },
        {
          isShow: true,
          title: "五.消防措施",
          refName: "setThreeRef",
        },
        {
          isShow: true,
          title: "六.泄露应急处理",
          refName: "setThreeRef",
        },
        {
          isShow: true,
          title: "七.操作处理与储存",
          refName: "setThreeRef",
        },
        {
          isShow: true,
          title: "八.接触控制/个体防护",
          refName: "setFourRef",
        },
        {
          isShow: true,
          title: "九. 理化特性",
          refName: "setFiveRef",
        },
        {
          isShow: true,
          title: "十. 稳定性和反应活性",
          refName: "setSixRef",
        },
        {
          isShow: true,
          title: "十一. 毒理学资料",
          refName: "setSevenRef",
        },
        {
          isShow: true,
          title: "十二. 生态学资料",
          refName: "setNightRef",
        },
        {
          isShow: true,
          title: "十三. 废弃处置",
          refName: "setTenRef",
        },
        {
          isShow: true,
          title: "十四. 运输信息",
          refName: "setElevenRef",
        },
        {
          isShow: true,
          title: "十五. 法规信息",
          refName: "setTwelveRef",
        },
        {
          isShow: true,
          title: "十六. 附件信息",
          refName: "setTwelveRef",
        },
      ],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},

  methods: {
    refresh() {
      this.reload = false;
      this.$nextTick(() => (this.reload = true));
    },
    // tab click
    jump(index, info) {
      // const idx = index.index;
      // var el = document.querySelector(".scroll-item" + idx);
      // el.scrollIntoView({
      //   block: "start", 
      //   behavior: "smooth",
      // });
       let target = document.querySelector(".scroll-content");
      let scrollItems = document.querySelectorAll(".scroll-item");
      // 判断滚动条是否滚动到底部
      if (target.scrollHeight <= target.scrollTop + target.clientHeight) {
        this.tabIndex = index.index.toString();
      }
      let totalY =
        scrollItems[index.index].offsetTop - scrollItems[0].offsetTop; // 锚点元素距离其offsetParent(这里是body)顶部的距离(待滚动的距离)
      let distance = document.querySelector(".scroll-content").scrollTop; // 滚动条距离滚动区域顶部的距离
      // let distance = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset // 滚动条距离滚动区域顶部的距离(滚动区域为窗口)
      // 滚动动画实现, 使用setTimeout的递归实现平滑滚动，将距离细分为50小段，10ms滚动一次
      // 计算每一小段的距离
      let step = totalY / 50;
      if (totalY > distance) {
        smoothDown(document.querySelector(".scroll-content"));
      } else {
        let newTotal = distance - totalY;
        step = newTotal / 50;
        smoothUp(document.querySelector(".scroll-content"));
      }

      // 参数element为滚动区域
      function smoothDown(element) {
        if (distance < totalY) {
          distance += step;
          element.scrollTop = distance;
          setTimeout(smoothDown.bind(this, element), 15);
        } else {
          element.scrollTop = totalY;
        }
      }

      // 参数element为滚动区域
      function smoothUp(element) {
        if (distance > totalY) {
          distance -= step;
          element.scrollTop = distance;
          setTimeout(smoothUp.bind(this, element), 15);
        } else {
          element.scrollTop = totalY;
        }
      }
    },
      // 滚动条滚动
    onScroll(e) {
      let scrollItems = document.querySelectorAll(".scroll-item");
      for (let i = scrollItems.length - 1; i >= 0; i--) {
        // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
        let judge =
          e.target.scrollTop >=
          scrollItems[i].offsetTop - scrollItems[0].offsetTop;
        if (judge) {
          this.tabIndex = i.toString();
          break;
        }
      }
    },
    getHight() {
      this.contentStyleObj.height = window.innerHeight - 190 + "px";
    },
    downloadPdf() {
      console.log(1);
      let downloadUrl = this.imgUrl + this.pdfUrl;
      window.open(downloadUrl, "_self");
    },
  },
  created() {
    this.getHight();
    window.addEventListener("resize", this.getHight);
    this.row = this.$route.params.row;
    // this.look = this.$route.params.chakan;
    // this.pdfUrl = this.row.attachment.url;
  },
  destroyed() {
    window.removeEventListener("resize", this.getHight);
  },
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
.wrap {
  display: flex;
  justify-content: center;
  align-content: center;
  background: #ffff;
  .wrap-left {
    padding-top:30px;
  }
  .scroll-content {
    width: 60%;
    padding-top:30px;
    overflow-x: hidden;
    overflow-y: hidden;
  }
}
.line-title {
  width: 740px;
  height: auto;
  padding-bottom: 20px;
  background: #ffffff;
  border: 1px solid #597ef7;
  opacity: 1;
  border-radius: 4px;
  h2 {
    width: 196px;
    height: 32px;
    line-height: 32px;
    background: #597ef7;
    opacity: 1;
    border-radius: 0px 0px 16px 16px;
    margin: 0 auto;
    font-size: 14px;
    color: #fff;
    text-align: center;
  }
}
.two_box {
  width: 100%;
  display: flex;
  margin-top: 30px;
  .two_left {
    width: 28%;
    height: 100px;
    padding-left: 15px;
    span {
      width: 192px;
      height: 84px;
      background: #4a80fc;
      opacity: 1;
      border-radius: 4px;
      display: block;
      line-height: 84px;
      text-align: center;
      color: #ffffff;
    }
  }
  .two_right {
    width: 70%;
    height: 100px;
    display: flex;
    .content {
      span {
        width: 162px;
        height: 40px;
        background: #4a80fc;
        opacity: 1;
        border-radius: 4px;
        display: block;
        margin-bottom: 15px;
        color: #ffffff;
        line-height: 40px;
        text-align: center;
        color: #ffffff;
      }
      span:nth-of-type(2) {
        width: 162px;
        height: 40px;
        background: #f0f5ff;
        border: 1px solid #4a80fc;
        opacity: 1;
        border-radius: 4px;
        margin-right: 5px;
        line-height: 40px;
        text-align: center;
        color: #4a80fc;
      }
    }
  }
}
</style>