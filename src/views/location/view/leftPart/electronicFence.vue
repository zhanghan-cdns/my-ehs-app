<template>
  <div class="common-box">
    <div class="common-title">电子围栏</div>
    <div class="common-content">
      <el-form
        :model="searchValue"
        class="fence-form-inline"
        :label-position="true"
      >
        <div class="search-box">
          <el-form-item>
            <el-input v-model="searchValue.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </div>
        <!-- <el-row type="flex" justify="space-between">
          <el-col :span="23">
            <el-form-item>
              <el-input
                v-model="searchValue.user"
                placeholder="审批人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <div class="common-table">
        <div class="common-table-title">
          <div>围栏名称</div>
          <div>人数</div>
          <div>车辆</div>
          <div>状态</div>
        </div>
        <div class="common-table-body">
          <div
            class="item-class"
            v-for="(item, index) in fenceTableData"
            :key="index"
          >
            <div>{{ item.name }}</div>
            <div>{{ item.person }}</div>
            <div>{{ item.vehicle }}</div>
            <div>
              <span :class="item.status == '0' ? 'zc-class' : 'yc-class'">{{
                item.status == "0" ? "正常" : "异常"
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "electronicFence",
  data() {
    return {
      searchValue: {
        user: "123",
      },
      fenceTableData: [
        { name: "单体二反应器", person: "1", vehicle: "0", status: "0" },
        { name: "单体二反应器", person: "1", vehicle: "0", status: "1" },
        { name: "单体二反应器", person: "1", vehicle: "0", status: "0" },
        { name: "单体二反应器", person: "1", vehicle: "0", status: "0" },
        { name: "单体二反应器", person: "1", vehicle: "0", status: "0" },
        { name: "单体二反应器", person: "1", vehicle: "0", status: "0" },
        { name: "单体二反应器", person: "1", vehicle: "0", status: "0" },
        { name: "单体二反应器", person: "1", vehicle: "0", status: "0" },
        { name: "单体二反应器", person: "1", vehicle: "0", status: "0" },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
/deep/ .el-input__inner {
  width: 100%;
  height: 28px;
  background: rgba(1, 21, 52, 0.8);
  border: 1px solid #0162b3;
  margin-left: 10px;
  color: #fff;
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
.common-box {
  width: 100%;
  margin: 16px 0;
  .common-title {
    font-size: 14px;
    color: #fff;
    height: 42px;
    line-height: 42px;
    padding-left: 32px;
    background: url("/img/rydw/left-title.png") no-repeat;
    background-size: 100% 42px;
    position: relative;
  }
  .common-title::before {
    content: "";
    width: 15px;
    height: 15px;
    background: url("/img/rydw/circle.png") no-repeat;
    background-size: 15px 15px;
    position: absolute;
    top: 13px;
    left: 10px;
  }
  .common-content {
    color: #fff;
    background: rgba(1, 21, 52, 0.8);
    border: 1px solid #0162b3;
    // overflow-y: scroll;
    // max-height: 180px;
    .fence-form-inline {
      display: flex;
      align-content: space-between;
      justify-content: space-between;
    }
    .search-box{
      display: flex;
      margin-bottom: 8px;
    }
    .common-table {
      overflow-x: hidden;
      margin: -30px 0px 0 0px;
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
      .common-table-title div:first-child {
        padding-left: 30px;
        width: 40%;
        text-align: left;
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
        .item-class div:first-child {
          padding-left: 30px;
          width: 40%;
          text-align: left;
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
// 滚动条样式
.common-content::-webkit-scrollbar {
  width: 9px;
  height: 10px;
  background-color: rgba(0, 45, 117, 0);
}
.common-content::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #2b3358;
}
</style>
