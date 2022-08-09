<!--  -->
<template>
  <div>
    <div class="top">
      <div class="wrap-left">区域风险等级： 低风险</div>
      <div class="wrap-right" id="correcting"></div>
    </div>

    <div class="title">
      <span style="color: #597ef7; padding-right: 5px">|</span>
      <span>区域风险等级校正</span>
    </div>
    <div class="content">
      <div>
        <el-radio v-model="radio" label="1" @change="radioFirst"
          >任一区域发生一般生产安全事故的，自事故发生之日起3年内，该区域提高1个风险等级。</el-radio
        >
      </div>
      <div>
        <el-radio v-model="radio" label="2" @change="radioFirst"
          >任一区域发生较大及以上生产安全事故的，自事故发生之日起3年内，该区域提高2个风险等级</el-radio
        >
      </div>
      <div>
        <el-radio v-model="radio" label="3" @change="radioFirst"
          >任一区域存在应急管理部门通报的重大隐患且未完成整改的，该区域提高2个风险等级。</el-radio
        >
      </div>
      <div style="color: #faad14; padding: 5px">
        注：若无校正选项可直接点击完成
      </div>
    </div>
  </div>
</template>

<script>
import { Result } from "element-ui";
export default {
  data() {
    return {
      radio: "",
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    radioFirst(val) {
    //   this.Result = "低风险";
    //   console.log(val,'jj')
     this.Result = "一般风险";
    //   this.Result = "较大风险";
    //   this.Result = "重大风险";
    // 低风险
      if (val == 1 && this.Result == "低风险") {
        document.getElementById("correcting").innerHTML =
          "校正区域风险等级:一般分险";
        document.getElementById("correcting").style =
          "background: #FFFF1A;width: 300px; height: 40px;line-height:40px;margin-top:20px;";
      } else if (val == 2 && this.Result == "低风险") {
        document.getElementById("correcting").innerHTML =
          "校正区域风险等级:较大风险";
        document.getElementById("correcting").style =
          "background: #FF6600;width: 300px; height: 40px;line-height:40px;margin-top:20px;";
      } else if (val == 3 && this.Result == "低风险") {
        document.getElementById("correcting").innerHTML =
          "校正区域风险等级:较大风险";
        document.getElementById("correcting").style =
          "background: #FF6600;width: 300px; height: 40px;line-height:40px;margin-top:20px;";
      }

    //    // 一般风险
      if (val == 1 && this.Result == "一般风险") {
        document.getElementById("correcting").innerHTML =
          "校正区域风险等级:较大风险";
        document.getElementById("correcting").style =
          "background: #FF6600;width: 300px; height: 40px;line-height:40px;margin-top:20px;";
      } else if (val == 2 && this.Result == "一般风险") {
        document.getElementById("correcting").innerHTML =
          "校正区域风险等级:重大大风险";
        document.getElementById("correcting").style =
          "background: #FF0000;width: 300px; height: 40px;line-height:40px;margin-top:20px;";
      } else if (val == 3 && this.Result == "一般风险") {
        document.getElementById("correcting").innerHTML =
          "校正区域风险等级:重大大风险";
        document.getElementById("correcting").style =
          "background: #FF0000;width: 300px; height: 40px;line-height:40px;margin-top:20px;";
      }


    //     // 较大风险
      if (val == 1 && this.Result == "较大风险") {
       document.getElementById("correcting").innerHTML =
          "校正区域风险等级:重大大风险";
        document.getElementById("correcting").style =
          "background: #FF0000;width: 300px; height: 40px;line-height:40px;margin-top:20px;";
      } else if (val == 2 && this.Result == "较大风险") {
        document.getElementById("correcting").innerHTML =
          "校正区域风险等级:重大大风险";
        document.getElementById("correcting").style =
          "background: #FF0000;width: 300px; height: 40px;line-height:40px;margin-top:20px;";
      } else if (val == 3 && this.Result == "较大风险") {
        document.getElementById("correcting").innerHTML =
          "校正区域风险等级:重大大风险";
        document.getElementById("correcting").style =
          "background: #FF0000;width: 300px; height: 40px;line-height:40px;margin-top:20px;";
      }

        // 重大大风险
      if (val == 1 && this.Result == "重大大风险") {
       document.getElementById("correcting").innerHTML =
          "校正区域风险等级:重大大风险";
        document.getElementById("correcting").style =
          "background: #FF0000;width: 300px; height: 40px;line-height:40px;margin-top:20px;";
      } else if (val == 2 && this.Result == "重大大风险") {
        document.getElementById("correcting").innerHTML =
          "校正区域风险等级:重大大风险";
        document.getElementById("correcting").style =
          "background: #FF0000;width: 300px; height: 40px;line-height:40px;margin-top:20px;";
      } else if (val == 3 && this.Result == "重大大风险") {
        document.getElementById("correcting").innerHTML =
          "校正区域风险等级:重大大风险";
        document.getElementById("correcting").style =
          "background: #FF0000;width: 300px; height: 40px;line-height:40px;margin-top:20px;";
      }
    },
  },
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
.top {
  width: 100%;
  height: 85px;
  line-height: 85px;
  background: #fcc;
  border: 1px solid #dcdfe6;
  margin-left: 22px;
  display: flex;
  .wrap-left {
    width: 220px;
    display: inline-block;
  }
  .wrap-right {
    width: 300px;
    display: inline-block;
  }
}
.title {
  width: 100%;
  margin: 15px;
}
.content {
  width: 100%;
  height: 100%;

  div:nth-of-type(1) {
    margin: 15px;
  }
  div:nth-of-type(2) {
    margin: 0 15px;
  }
  div:nth-of-type(3) {
    margin: 15px;
  }
  //   div:nth-of-type(4) {
  //     margin: 15px;
  //   }
}
</style>
