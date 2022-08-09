<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1000"
      height="90%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="flow-group">
          <div class="flow-header">开始</div>

          <div class="flow-content">
            <div v-for="(item, index) in flowData" :key="item.id">
              <div class="add-flowItem">
                <div class="add-item">
                  <div class="add-line"></div>
                  <div
                    class="add-icon"
                    @click="addApprover('add', index)"
                  ></div>
                </div>
                <div class="selectItem-group">
                  <div class="selectItem-top">
                    <div class="selectItem-title">审批人</div>
                    <div class="close-ico" @click="removeApprover(index)"></div>
                  </div>
                  <div
                    class="selectItem-bottom"
                    @click="addApprover('update', index)"
                  >
                    <div class="sp-name">{{ item.name }}</div>
                    <div class="arrow-ico"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="add-flowItem">
              <div class="add-item">
                <div class="add-line"></div>
                <div class="add-icon" @click="addApprover('lastadd')"></div>
              </div>
            </div>
          </div>

          <div>
            <img class="flow-end-img" src="@/assets/images/flow-end.png" />
            <div class="flow-end">结束</div>
          </div>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
    <select-person-dialog
      ref="selectPersonDialogRef"
      @confirmSelect="confirmAddApprover"
    ></select-person-dialog>
  </div>
</template>

<script>
import selectPersonDialog from "./selectPersonDialog.vue";

export default {
  components: {
    selectPersonDialog,
  },

  data() {
    return {
      openEdit: false,
      icon: "icon-bianji1",
      title: "设置审批人",
      row: {},
      flowData: [
        { id: "37633", name: "袁中军", sort: 1 },
        { id: "10299", name: "中安安全主管", sort: 2 },
      ],
      selectType: "",
      selectIndex: "",
    };
  },

  methods: {
    open(row) {
      this.openEdit = true;
      this.row = row;
    },

    // 移除审批人
    removeApprover(index) {
      // 去掉指定位置的元素
      this.flowData.splice(index, 1);
    },

    // 添加审批人
    addApprover(selectType, selectIndex) {
      this.selectType = selectType;
      this.selectIndex = selectIndex;
      this.$refs.selectPersonDialogRef.open();
    },

    // 确定添加审批人
    confirmAddApprover(selectPersonList) {
      console.log(this.selectType, "selectType");
      console.log(this.selectIndex, "selectIndex");
      console.log(selectPersonList, "selectPersonList");
      switch (this.selectType) {
        case "add":
          this.flowData.splice(this.selectIndex, 0, ...selectPersonList);
          break;
        case "update":
          this.flowData.splice(this.selectIndex, 1, ...selectPersonList);
          break;
        case "lastadd":
          this.flowData.push(...selectPersonList);
          break;
      }
    },

    submit() {
      this.flowData.map((item, index) => {
        item.sort = index;
      });
      console.log(this.flowData, "flowData");
    },

    close() {
      this.openEdit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.flow-group {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
}

.flow-header {
  width: 120px;
  padding: 6px 6px;
  background-color: rgb(2, 167, 240);
  border-radius: 24px;
  color: #fff;
  font-size: 18px;
  margin-bottom: 3px;
}

.flow-content {
  .add-flowItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .add-item {
      position: relative;
      .add-line {
        height: 140px;
        border: 1px #19aff1 dashed;
      }
      .add-icon {
        cursor: pointer;
        position: absolute;
        top: 50%;
        margin-top: -18px;
        margin-left: -18px;
        width: 36px;
        height: 36px;
        background: url("~@/assets/images/flow-add.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .selectItem-group {
      width: 160px;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      .selectItem-top {
        width: 100%;
        display: flex;
        background-color: rgb(2, 167, 240);
        border-radius: 6px 6px 0 0;
        justify-content: space-between;
        padding: 5px 5px;
        font-size: 14px;
        .selectItem-title {
          color: #fff;
        }
        .close-ico {
          width: 16px;
          height: 16px;
          background: url("~@/assets/images/flow-close.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .selectItem-bottom {
        font-size: 14px;
        width: 100%;
        padding: 10px 5px;
        display: flex;
        justify-content: space-between;
        background-color: rgb(237, 249, 254);
        border-radius: 0 0 6px 6px;
        .sp-name {
        }
        .arrow-ico {
          width: 16px;
          height: 16px;
          background: url("~@/assets/images/flow-select.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}

.flow-end-img {
  width: 26px;
  height: 26px;
  padding-right: 2px;
}

.flow-end {
  width: 120px;
  padding: 6px 6px;
  background-color: rgb(2, 167, 240);
  border-radius: 24px;
  color: #fff;
  font-size: 18px;
  margin: 0 auto;
}
</style>