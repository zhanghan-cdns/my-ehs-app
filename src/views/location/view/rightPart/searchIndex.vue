<template>
  <div class="searchIndex">
    <img
      @click="boxshow = false"
      v-show="boxshow"
      src="/img/rydw/cha.png"
      class="cha-class"
    />
    <img
      @click="boxshow = true"
      v-show="!boxshow"
      src="/img/rydw/search.png"
      class="search-class"
    />
    <transition name="slide">
      <div class="search-con" v-if="boxshow">
        <div style="display: flex">
          <div
            v-for="(item, index) in serchIconList"
            :key="index"
            class="commonDiv"
            :class="currentId == item.id ? 'activeDiv' : 'normalDiv'"
            @click="getCurrentChange(item)"
            :title="item.name"
          >
            <img :src="item.icon" />
          </div>
        </div>
        <el-form
          :model="searchValue"
          class="fence-form-inline"
          :label-position="true"
        >
          <div class="search-box">
            <el-form-item>
              <el-input
                v-model="searchValue.user"
                :placeholder="'请输入' + placeholder"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </div>
        </el-form>
        <div class="common-table">
          <div class="common-table-title">
            <div>姓名</div>
            <div>部门</div>
            <div>职位</div>
            <div>状态</div>
          </div>
          <div class="common-table-body">
            <div
              class="item-class"
              v-for="(item, index) in tableData"
              :key="index"
            >
              <div>{{ item.name }}</div>
              <div>{{ item.depart }}</div>
              <div>{{ item.position }}</div>
              <div>
                <span :class="item.status == '0' ? 'zx-class' : 'lx-class'">{{
                  item.status == "0" ? "在线" : "离线"
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "searchIndex",
  inject: ["positionRoot"],
  props: {
    serchIconList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      boxshow: false,
      currentId: 1,
      searchValue: "",
      placeholder: "电子围栏",
      tableData: [
        {
          name: "陈磊",
          depart: "部门",
          position: "内操作员",
          status: "0",
        },
        {
          name: "陈磊",
          depart: "车间1",
          position: "内操作员",
          status: "1",
        },
        {
          name: "陈磊",
          depart: "部门",
          position: "内操作员",
          status: "0",
        },
      ],
    };
  },
  mounted() {
    console.log("serchIconList", this.serchIconList);
    // setTimeout(()=>{
    // 	if(this.positionRoot.allDataObj&&this.positionRoot.allDataObj[this.currentId]){
    // 		this.tableData = this.positionRoot.allDataObj[this.currentId]  //展示默认的列表(风险分区)
    // 	}
    // },1500)
  },
  methods: {
    getCurrentChange(item) {
      this.currentId = item.id;
      let id = item.id;
      switch (id) {
        case "1":
          this.placeholder = "电子围栏";
          break;
        case "2":
          this.placeholder = "风险分区";
          break;
        case "3":
          this.placeholder = "人员定位";
          break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-input__inner {
  width: 100%;
  height: 28px;
  background: rgba(1, 21, 52, 0.8);
  border: 1px solid #0162b3;
  margin-left: 10px;
  color: #fff;
  font-size: 12px;
}
/deep/ .el-button {
  padding: 6px 5px;
  background: linear-gradient(180deg, #06457f 0%, #082a4b 100%);
  box-shadow: inset 0px -3px 6px 1px rgba(6, 96, 200, 0.5294117647058824);
  border: 1px solid #007ea5;
  margin-left: 26px;
}
/deep/ .el-col {
  height: 60px;
}
.searchIndex {
  width: 344px;
  height: 220px;
  text-align: right;
  // position: absolute;
  // right: 10px;
  // top: 0;
  .cha-class {
    width: 30px;
    height: 30px;
    position: absolute;
    left: -32px;
    top: 10px;
  }
  .search-class {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .search-con {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: url("/img/rydw/search-bg.png") no-repeat;
    background-size: 100% 100%;
    .search-box {
      display: flex;
      margin-bottom: 8px;
    }
    .commonDiv {
      border-radius: 4px;
      width: 42px;
      height: 26px;
      margin: 5px;
      cursor: pointer;
      text-align: center;
      padding-top: 3px;
    }
    .normalDiv {
      background: #04417a;
      border: 1px solid #197ad1;
    }
    .activeDiv {
      background: #8e5c0c;
      border: 1px solid #e29a26;
    }
    .result {
      margin: 5px;
      flex: 1;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      .first-col {
        width: 80%;
        text-align: left;
        padding-left: 10px;
      }
      .sec-col {
        width: 20%;
        color: #50ece3;
        cursor: pointer;
      }
      .table-title {
        display: flex;
        align-items: center;
        color: #fff;
        width: 100%;
        height: 26px;
        background: #0a3473;
        border: 1px solid #1a6aa7;
        border-radius: 4px;
      }
      .table-body {
        overflow-y: scroll;
        height: 115px;
        width: 103%;
        margin: 0 auto;
        .item-class {
          color: #f9f9f9;
          font-size: 12px;
          padding: 5px 0px;
          width: 100%;
          display: flex;
          align-items: center;
          .text-overflow-one {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
.common-table {
  overflow-x: hidden;
  margin: -30px 10px 0 10px;
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
  .common-table-title div:last-child {
    padding-left: 30px;
    width: 25%;
    text-align: left;
  }
  .common-table-title div {
    width: 25%;
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
    .zx-class {
      padding: 2px 10px 2px 15px;
      color: #36e929;
      position: relative;
    }
    .zx-class::before {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 8px;
      background-color: #36e929;
      position: absolute;
      left: 0;
      top: 5px;
    }
    .lx-class {
      padding: 2px 10px 2px 15px;
      color: #32778d;
      position: relative;
    }
    .lx-class::before {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 8px;
      background-color: #32778d;
      position: absolute;
      left: 0;
      top: 5px;
    }
    .item-class div:last-child {
      padding-left: 30px;
      width: 25%;
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .item-class div {
      width: 25%;
      text-align: center;
    }
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.1s linear;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}
</style>
