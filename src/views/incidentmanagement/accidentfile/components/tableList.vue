<!--  -->
<template>
  <div>
    <div class="table-info">
      <!-- <div @click="addBtn()" class="addBtn">
        <span><img src="../../../../assets/images/add.png" alt="" /></span
        ><span>新增</span>
      </div>
      <div @click="delBtn()" class="delBtn">
        <span><img src="../../../../assets/images/del.png" alt="" /></span
        ><span>删除</span>
      </div> -->
    </div>
    <el-row>
      <el-col :span="24">
        <vxe-table
          border
          :data="tableData"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :header-row-style="headerRowStyle"
          :cell-style="{ 'text-align': 'center' }"
          :edit-config="{ trigger: 'click', mode: 'cell' }"
          @checkbox-change="selectChangeEvent"
          @checkbox-all="selectChangeEvent"
        >
          <vxe-column type="checkbox" width="50" align="center"></vxe-column>
          <vxe-column type="seq" width="50" title="序号"></vxe-column>
          <vxe-column title="姓名" field="name" align="center"> </vxe-column>
          <vxe-column title="性别" field="safetyDuty" align="center">
          </vxe-column>
          <vxe-column title="岗位" field="editor" align="center"> </vxe-column>
          <vxe-column title="学历" field="attachment" align="center">
          </vxe-column>
          <vxe-column title="联系方式" field="phone" align="center">
          </vxe-column>
          <vxe-column
            title="伤害程度"
            field="ast"
            align="center"
            :edit-render="{}"
          >
            <template #edit="{ row }">
              <div>
                <el-select
                  v-model="row.ast"
                  clearable
                  placeholder="请选择"
                  size="mini"
                  @change="selectBtn"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
                <!-- <span v-show="isValue"> {{value}}</span> -->
              </div>
            </template>
          </vxe-column>
        </vxe-table>
      </el-col>
    </el-row>
    <div class="footer-btn">
      <el-button type="primary" size="small" @click="sure">确定</el-button>
    </div>
    <table-dialog ref="tableDialogRef" @refresh="upDate"></table-dialog>
  </div>
</template>

<script>
import tableDialog from "./tableDialog.vue";
export default {
  components: {
    tableDialog,
  },
  props: ["tableData"],
  data() {
    return {
      isShow: false,
      isValue: false,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      ids: [],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.$nextTick(() => {
      console.log(this.tableData, "jk");
    });
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    // 新增事件
    addBtn() {
      this.$refs.tableDialogRef.open();
    },
    // 接收选中的数据
    upDate(data) {
      this.tableData = data;
    },
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
    selectBtn() {
      this.isShow = true;
    },
    sure() {
      if (this.ids.length === 0) {
        return this.$message.error("请勾选以及选择伤害程度");
      }
    },
    // 复选框选中
    selectChangeEvent({ records }) {
      let ids = records.map((item) => item.id);
      this.ids = ids;
    },
    delBtn() {
      if (this.ids.length === 0) {
        return this.$message.error("请勾选删除的数据");
      } else {
        this.removeData(this.ids.join(","));
      }
    }, //删除
    removeData(ids) {
      this.$confirm("是否删除数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        
      });
    },
  },
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
.footer-btn {
  display: flex;
  justify-content: right;
  padding: 3px;
}
// .table-info {
//   width: 100%;
//   height: 30px;
//   display: flex;
//   padding: 10px 0px;
//   .addBtn {
//     width: 100px;
//     display: flex;
//     padding-right: 10px;
//     span:nth-of-type(1) {
//       width: 23px;
//       padding: 3px 10px 0px 45px;
//     }
//     span:nth-of-type(2) {
//       width: 81px;
//       font-size: 14px;
//     }
//   }
//   .delBtn {
//     width: 100px;
//     display: flex;
//     span:nth-of-type(1) {
//       width: 23px;
//       padding: 3px 10px 0px 10px;
//     }
//     span:nth-of-type(2) {
//       width: 81px;
//       font-size: 14px;
//     }
//   }
// }
</style>