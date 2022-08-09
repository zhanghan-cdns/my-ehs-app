<template>
  <div id="" class="personDetail" v-show="visible">
    <div class="personDetail-header">
      <div class="title">人员详情</div>
      <div class="close-btn" @click="closePersonDetail"></div>
    </div>
    <div class="personDetail-content">
      <div class="basic-info">
        <div class="basic-title">基础信息卡</div>
        <div class="basic-content">
          <div class="basic-icon"></div>
          <div class="basic-item">
            <span>史海余</span>
            <span>岗位：副操作员</span>
            <span>出生日期：1970-04-16</span>
            <span>部门：车间一</span>
          </div>
          <div class="basic-item">
            <span>工号：FT-0026</span>
            <span>入职日期：2021-06-13</span>
            <span>联系电话：15861134903</span>
          </div>
        </div>
      </div>
      <div class="associated-info">
        <div
          class="associated-item"
          :class="{ active: c == activeClass }"
          @click="changeActiveClass(itemClass,c)"
          v-for="(itemClass, c) in associatedList"
          :key="c"
        >
          {{ itemClass }}
        </div>
      </div>
      <div class="associated-table">
        <div class="associated-title">人员证书信息</div>
        <div class="common-table">
          <div class="common-table-title">
            <div v-for="(head,i) in personTableHead[0]" :key="i">{{head}}</div>
            <!-- <div>证书名称</div>
            <div>证书编号</div>
            <div>下次培训时间</div>
            <div>有效日期</div>
            <div>发证机关</div> -->
          </div>
          <div class="common-table-body">
            <div
              class="item-class"
              v-for="(item, index) in personTableData"
              :key="index"
            >
              <div>{{ item.name }}</div>
              <div>{{ item.number }}</div>
              <div>{{ item.nextTime }}</div>
              <div>{{ item.effectTime }}</div>
              <div>{{ item.licenseAgency }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "personDetail",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showFlag: false,
      associatedList: [
        "人员证书信息",
        "考试记录",
        "体检信息",
        "特殊作业信息",
        "日常培训信息",
        "相关危害因素",
      ],
      activeClass: 0,
      personTableHead: [
        ['证书名称','证书编号','下次培训日期','有效日期','发证机关']
      ],
      personTableData: [
        {
          name: "聚合工艺操作证",
          number: "T320223197004163133",
          nextTime: "2021-11-09",
          effectTime: "2024-11-09",
          licenseAgency: "江苏省安监局",
        },
        {
          name: "聚合工艺操作证",
          number: "T320223197004163133",
          nextTime: "2021-11-09",
          effectTime: "2024-11-09",
          licenseAgency: "江苏省安监局",
        },
        {
          name: "聚合工艺操作证",
          number: "T320223197004163133",
          nextTime: "2021-11-09",
          effectTime: "2024-11-09",
          licenseAgency: "江苏省安监局",
        },
        {
          name: "聚合工艺操作证",
          number: "T320223197004163133",
          nextTime: "2021-11-09",
          effectTime: "2024-11-09",
          licenseAgency: "江苏省安监局",
        },
        {
          name: "聚合工艺操作证",
          number: "T320223197004163133",
          nextTime: "2021-11-09",
          effectTime: "2024-11-09",
          licenseAgency: "江苏省安监局",
        },
        {
          name: "聚合工艺操作证",
          number: "T320223197004163133",
          nextTime: "2021-11-09",
          effectTime: "2024-11-09",
          licenseAgency: "江苏省安监局",
        },
        {
          name: "聚合工艺操作证",
          number: "T320223197004163133",
          nextTime: "2021-11-09",
          effectTime: "2024-11-09",
          licenseAgency: "江苏省安监局",
        },
        {
          name: "聚合工艺操作证",
          number: "T320223197004163133",
          nextTime: "2021-11-09",
          effectTime: "2024-11-09",
          licenseAgency: "江苏省安监局",
        },
        {
          name: "聚合工艺操作证",
          number: "T320223197004163133",
          nextTime: "2021-11-09",
          effectTime: "2024-11-09",
          licenseAgency: "江苏省安监局",
        },
      ],
    };
  },
  methods: {
    // 关闭
    closePersonDetail() {
      this.$emit("handleClose");
    },
    // 改变标签
    changeActiveClass(item,i){
      this.activeClass=i;
    }
  },
};
</script>

<style scoped lang="scss">
.personDetail {
  background-color: red;
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 10000001;
  width: 600px;
  height: 600px;
  margin: -300px 0 0 -300px;
  background: url("/img/rydw/ryxq-bg.png") no-repeat;
  background-size: 100% 500px;
  .personDetail-header {
    border-bottom: 1px solid #0e4e88;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 10px 10px 26px;
    .title {
      position: relative;
      color: #ffffff;
      font-size: 12px;
    }
    .title::before {
      content: "";
      width: 12px;
      height: 15px;
      background: url("/img/rydw/bottom-title-icon.png") no-repeat;
      background-size: 100% auto;
      position: absolute;
      left: -17px;
    }
    .close-btn {
      width: 20px;
      height: 20px;
      background: url("/img/rydw/close_icon.png") no-repeat;
      background-size: 100% auto;
      cursor: pointer;
    }
  }
  .personDetail-content {
    padding: 10px;

    .basic-info,
    .associated-info,
    .associated-table {
      background: rgba(1, 21, 52, 0.8);
      border-radius: 8px 8px 8px 8px;
      opacity: 1;
      border: 1px solid #0162b3;
      color: #fff;
      margin: 0 0 10px 0;
      padding: 16px;
      .basic-title,
      .associated-title {
        font-size: 14px;
        margin-bottom: 8px;
      }
      .basic-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .basic-icon {
          width: 94px;
          height: 101px;
          background: url("/img/rydw/person_icon.png") no-repeat;
          background-size: 100% auto;
          margin-right: 14px;
        }
        .basic-item span {
          display: block;
          font-size: 10px;
          margin-bottom: 10px;
        }
      }
    }
    .associated-info {
      display: flex;
      justify-content: space-evenly;
      .associated-item {
        min-width: 68px;
        height: 27px;
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        font-size: 12px;
        border: 1px solid #1e63b0;
        line-height: 28px;
        padding: 0 6px;
        text-align: center;
        cursor: pointer;
      }
      .associated-item.active {
        background: #13409c;
        box-shadow: inset 0px 0px 16px 1px
          rgba(60, 201, 255, 0.7294117647058823);
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        border: 1px solid #59d1ff;
      }
    }
    .common-table {
      overflow-x: hidden;
      margin: 0px 0px 0 0px;
      font-size: 10px;
      .common-table-title {
        display: flex;
        align-items: center;
        color: #fff;
        width: 99%;
        height: 28px;
        background: #0a3473;
        border: 1px solid #1a6aa7;
        border-radius: 4px;
      }
      .common-table-title div:nth-of-type(2) {
        width: 40%;
        text-align: center;
      }
      .common-table-title div {
        width: 20%;
        text-align: center;
      }
      .common-table-body {
        max-height: 100px;
        overflow-y: scroll;
        .item-class {
          display: flex;
          align-items: center;
          color: #fff;
          width: 99%;
          height: 34px;
          border-radius: 4px;
        }
        .zc-class {
          border: 1px dashed #36e929;
          border-radius: 2px;
          padding: 2px 10px;
          color: #36e929;
        }
        .yc-class {
          border: 1px dashed red;
          border-radius: 2px;
          padding: 2px 10px;
          color: red;
        }
        .item-class div:nth-of-type(2) {
          width: 40%;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .item-class div {
          width: 20%;
          text-align: center;
        }
      }
    }
  }
}
</style>
