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
        <!-- ???????????? -->
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
                <span style="color: #4a80fc">????????????????????????</span
                >{{ row.cnName }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">????????????????????????</span
                >{{ row.enName }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">????????????2???</span>{{ row.cnName2 }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">????????????2???</span>{{ row.enName2 }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">????????????????????????</span
                >{{ row.instructionCode }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">CAS No???</span>{{ row.casNo }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">????????????</span>{{ row.formula }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">????????????</span
                >{{ row.formulaWeight }}
              </p>
            </div>
          </div>
        </div>
        <!-- ???????????? -->
        <div
          :ref="tabs[1].refName"
          class="scroll-item"
          style="padding-top: 1rem"
        >
          <div class="line-title">
            <h2>{{ tabs[1].title }}</h2>
            <div class="two_box">
              <div class="two_left">
                <span>???????????? ?????? CAS No</span>
              </div>
              <div class="two_right">
                <div class="content">
                  <span>????????????</span>
                  <span>{{ row.harmfulMaterial }}</span>
                </div>
                <div class="content">
                  <span>??????</span>
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
        <!-- ???????????? -->
        <div
          :ref="tabs[2].refName"
          class="scroll-item"
          style="padding-top: 1rem"
        >
          <div class="line-title">
            <h2>{{ tabs[2].title }}</h2>
            <div style="padding-left: 100px">
              <p style="height: 10px">
                <span style="color: #4a80fc">???????????????</span
                >{{ row.healthHazard }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">???????????????</span
                >{{ row.environmentHazard }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">???????????????</span
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
                <span style="color: #4a80fc">???????????????</span>{{ row.skin }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">???????????????</span>{{ row.eyes }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">?????????</span>{{ row.breathe }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">?????????</span>{{ row.eat }}
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
                <span style="color: #4a80fc">???????????????</span>{{ row.risk }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">?????????????????????</span
                >{{ row.harmfulProduct }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">???????????????</span>{{ row.outFire }}
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
                <span style="color: #4a80fc">???????????????</span
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
                <span style="color: #4a80fc">?????????????????????</span
                >{{ row.emergencyMeasure }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">?????????????????????</span
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
                <span style="color: #4a80fc">??????MAC???mg/m3??????</span
                >{{ row.cnMac }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">?????????MAC???mg/m3??????</span
                >{{ row.fsuMac }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">TLVTN???</span>{{ row.tlvtn }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">TLVWN???</span>{{ row.tlvwn }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">???????????????</span
                >{{ row.projectControl }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">?????????????????????</span
                >{{ row.breathProtect }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">???????????????</span
                >{{ row.eyesProtect }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">???????????????</span
                >{{ row.bodyProtect }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">????????????</span
                >{{ row.handProtect }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">???????????????</span
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
                <span style="color: #4a80fc">???????????????</span
                >{{ row.mainComponent }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">??????????????????</span>{{ row.shape }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">??????(???)???</span
                >{{ row.meltingPoint }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">??????(???)???</span
                >{{ row.boilingPoint }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">????????????(???=1)???</span
                >{{ row.densityWater }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">??????????????????(??????=1)???</span
                >{{ row.densityAir }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">???????????????(kPa)???</span
                >{{ row.airPressure }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">?????????(kJ/mol)???</span
                >{{ row.burnEnergy }}
              </p>

              <p style="height: 10px">
                <span style="color: #4a80fc">????????????(???)???</span
                >{{ row.criticalTemperature }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">????????????(MPa)???</span
                >{{ row.criticalPressure }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">??????/??????????????????????????????</span
                >{{ row.ratio }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">??????(???)???</span
                >{{ row.flashPoint }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">????????????(???)???</span
                >{{ row.burnPoint }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">????????????%(V/V)???</span
                >{{ row.explosionUp }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">????????????%(V/V)???</span
                >{{ row.explosionLow }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">???????????????</span
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
                <span style="color: #4a80fc">????????????</span>{{ row.prohibit }}
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
                <span style="color: #4a80fc">????????????LD50???</span>{{ row.ld50 }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">????????????LC50???</span>{{ row.lc50 }}
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
                <span style="color: #4a80fc">?????????????????????</span
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
                <span style="color: #4a80fc">????????????????????????????????????</span
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
                <span style="color: #4a80fc">?????????????????????</span
                >{{ row.dangerCode }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">UN?????????</span>{{ row.unCode }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">???????????????</span
                >{{ row.packageType }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">???????????????</span
                >{{ row.packageMethod }}
              </p>
              <p style="height: 10px">
                <span style="color: #4a80fc">?????????????????????</span
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
                <span style="color: #4a80fc">???????????????</span
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
                <span style="color: #4a80fc">?????????</span>
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
          title: "???. ???????????????",
          refName: "setOneRef",
        },
        {
          isShow: true,
          title: "???. ??????/????????????",
          refName: "setTwoRef",
        },
        {
          isShow: true,
          title: "???.???????????????",
          refName: "setThreeRef",
        },
        {
          isShow: true,
          title: "???.????????????",
          refName: "setThreeRef",
        },
        {
          isShow: true,
          title: "???.????????????",
          refName: "setThreeRef",
        },
        {
          isShow: true,
          title: "???.??????????????????",
          refName: "setThreeRef",
        },
        {
          isShow: true,
          title: "???.?????????????????????",
          refName: "setThreeRef",
        },
        {
          isShow: true,
          title: "???.????????????/????????????",
          refName: "setFourRef",
        },
        {
          isShow: true,
          title: "???. ????????????",
          refName: "setFiveRef",
        },
        {
          isShow: true,
          title: "???. ????????????????????????",
          refName: "setSixRef",
        },
        {
          isShow: true,
          title: "??????. ???????????????",
          refName: "setSevenRef",
        },
        {
          isShow: true,
          title: "??????. ???????????????",
          refName: "setNightRef",
        },
        {
          isShow: true,
          title: "??????. ????????????",
          refName: "setTenRef",
        },
        {
          isShow: true,
          title: "??????. ????????????",
          refName: "setElevenRef",
        },
        {
          isShow: true,
          title: "??????. ????????????",
          refName: "setTwelveRef",
        },
        {
          isShow: true,
          title: "??????. ????????????",
          refName: "setTwelveRef",
        },
      ],
    };
  },
  //???????????? - ???????????????????????????this?????????
  created() {},
  //???????????? - ?????????????????????DOM?????????
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
      // ????????????????????????????????????
      if (target.scrollHeight <= target.scrollTop + target.clientHeight) {
        this.tabIndex = index.index.toString();
      }
      let totalY =
        scrollItems[index.index].offsetTop - scrollItems[0].offsetTop; // ?????????????????????offsetParent(?????????body)???????????????(??????????????????)
      let distance = document.querySelector(".scroll-content").scrollTop; // ??????????????????????????????????????????
      // let distance = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset // ??????????????????????????????????????????(?????????????????????)
      // ??????????????????, ??????setTimeout????????????????????????????????????????????????50?????????10ms????????????
      // ???????????????????????????
      let step = totalY / 50;
      if (totalY > distance) {
        smoothDown(document.querySelector(".scroll-content"));
      } else {
        let newTotal = distance - totalY;
        step = newTotal / 50;
        smoothUp(document.querySelector(".scroll-content"));
      }

      // ??????element???????????????
      function smoothDown(element) {
        if (distance < totalY) {
          distance += step;
          element.scrollTop = distance;
          setTimeout(smoothDown.bind(this, element), 15);
        } else {
          element.scrollTop = totalY;
        }
      }

      // ??????element???????????????
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
      // ???????????????
    onScroll(e) {
      let scrollItems = document.querySelectorAll(".scroll-item");
      for (let i = scrollItems.length - 1; i >= 0; i--) {
        // ?????????????????????????????????????????????????????????????????????
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
/* @import url(); ??????css??? */
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