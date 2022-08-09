<!--  -->
<template>
  <div class="table-Wrap">
    <div class="title">
      <i
        class="iconfont icon-fujiaxinxi"
        style="font-size: 16px; color: #1b8afc"
      ></i
      ><span>评定等级</span>
    </div>
    <div class="table-content">
      <vxe-grid
        border
        resizable
        show-footer
        ref="xGrid"
        :footer-method="footerMethod"
        :header-cell-style="headerCellStyle"
        :header-row-style="headerRowStyle"
        height="200"
        :edit-config="{ trigger: 'click', mode: 'cell' }"
        :columns="columns"
        :data="gridOptions"
        :edit-rules="validRules"
        :formatter="formatterAllotted"
      >
        <template #fwmc_edit="{ row }">
          <vxe-input v-model="row.fwmc"></vxe-input> </template
      ></vxe-grid>
      <div class="calculation">
        <el-button
          size="small"
          type="success"
          @click="headerButtonMethods('jisuan')"
        >
          <i class="iconfont icon-fujiaxinxi" style="font-size: 13px"></i
          >计算平均分
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      validRules: {
        sex: [{ required: true, message: "必须填写" }],
        fwmc: [{ required: true, message: "必须填写" }],
        role: [{ required: true, message: "必须填写" }],
      },
      columns: [
        { type: "seq", width: 60, fixed: "left", title: "序号" },
        {
          field: "fwmc",
          title: "得分",
          align: "center",
          editRender: {},
          slots: { edit: "fwmc_edit" },
          width: 120,
        },
        {
          field: "role",
          title: "评定内容",
          align: "center",
          width: 200,
        },
        {
          field: "sex",
          title: "评定等级",
          align: "center",
          slots: {
            // 使用 JSX 渲染
            default: ({ row, rowIndex, columnIndex }) => {
              return [
                <span style="color: blue">
                  <vxe-radio-group
                    v-model={row.sex}
                    label={columnIndex - 1}
                    on-change={() =>
                      this.handleCheckChange(row, rowIndex, columnIndex)
                    }
                  >
                    <vxe-radio label="95" content="优秀"></vxe-radio>
                    <vxe-radio label="85" content="良好"></vxe-radio>
                    <vxe-radio label="75" content="合格"></vxe-radio>
                    <vxe-radio label="60" content="不合格"></vxe-radio>
                  </vxe-radio-group>
                </span>,
              ];
            },
          },
        },
      ],
      gridOptions: [
        { id: 10001, fwmc: "", role: "T1", sex: "" },
        { id: 10002, fwmc: "", role: "T2", sex: "" },
      ],
      inputValue: "",
      radioList: [],
      xTable: [],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    headerCellStyle() {
      return {
        background: "#ECF3FF",
        color: "#333",
        fontWeight: "bold",
      };
    },
    headerRowStyle() {
      return {
        background: "#ECF3FF",
      };
    },
    // 获取单选框进行赋值
    handleCheckChange(row, index, columnIndex) {
      this.xTable = this.$refs.xGrid.data;
      for (let i = 0; i < this.xTable.length; i++) {
        if (i === index) {
          this.xTable[i].fwmc = row.sex;
        }
      }
    },
    // 点击平均数
    headerButtonMethods(type) {
      if (type === "jisuan") {
        let count = 0;
        if (this.inputValue == "") {
          this.inputValue = "0";
          this.$emit("refresh", this.inputValue);
        } else {
          this.xTable = this.$refs.xGrid.data;
          this.xTable.forEach((item) => {
            console.log(item.fwmc,'item.fwmc')
            count += Number(item.fwmc);
          });
          this.inputValue = Math.ceil(count / this.xTable.length);
          this.$emit("refresh", this.inputValue);
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
.table-Wrap {
  .title {
    height: 40px;
    line-height: 40px;
    padding: 0px 40px 5px 45px;
    font-size: 16px;
    span {
      padding: 0px 5px;
    }
  }
  .table-content {
    width: 798px;
    padding-left: 45px;
  }
  .calculation {
    width: 796px;
    height: 55px;
    line-height: 55px;
    text-align: center;
    border: 1px solid #eee;
  }
}
</style>
