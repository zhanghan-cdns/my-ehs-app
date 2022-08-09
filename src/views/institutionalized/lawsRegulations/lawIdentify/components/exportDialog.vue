<template>
  <div>
    <el-dialog
      :visible.sync="openEdit"
      width="1588px"
      :show-close="false"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <div class="export-title">
        <img class="export-title-img" src="@/assets/images/daochubaogao.png" />
        安全生产法律法规合规性评估报告
      </div>
      <div style="padding: 50px">
        <vxe-table
          border
          resizable
          auto-resize
          show-overflow
          align="center"
          :header-row-style="headerRowStyle"
          :data="tableData"
          :edit-config="{ trigger: 'click', mode: 'cell' }"
          @edit-closed="updateData"
        >
          <vxe-column type="seq" width="60" title="序号"></vxe-column>
          <vxe-column
            width="550"
            field="name"
            title="法律法规名称"
            :edit-render="{ autofocus: '.vxe-input--inner' }"
          >
            <template #edit="{ row }">
              <vxe-input v-model="row.name" type="text"></vxe-input>
            </template>
          </vxe-column>

          <vxe-column
            width="300"
            field="sytk"
            title="适用条款"
            :edit-render="{ autofocus: '.vxe-input--inner' }"
          >
            <template #edit="{ row }">
              <vxe-input v-model="row.sytk" type="text"></vxe-input>
            </template>
          </vxe-column>

          <vxe-column width="290" field="fhx" title="符合性" :edit-render="{}">
            <template #default="{ row }">
              <span>{{ formatFhx(row.fhx) }}</span>
            </template>
            <template #edit="{ row }">
              <vxe-radio-group v-model="row.fhx">
                <vxe-radio
                  v-for="(item, index) in fhxList"
                  :key="index"
                  :label="item.value"
                  >{{ item.label }}</vxe-radio
                >
              </vxe-radio-group>
            </template>
          </vxe-column>

          <vxe-column
            width="288"
            field="cyx"
            title="差异性"
            :edit-render="{ autofocus: '.vxe-input--inner' }"
          >
            <template #edit="{ row }">
              <vxe-input v-model="row.cyx" type="text"></vxe-input>
            </template>
          </vxe-column>
        </vxe-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openEdit = false">取 消</el-button>
        <el-button type="primary" @click="confirmExport">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openEdit: false,
      allAlign: null,
      tableData: [
        {
          id: 10001,
          name: "Test1",
          sytk: "T1",
          fhx: "0",
          cyx: "Shenzhen",
        },
        {
          id: 10001,
          name: "Test1",
          sytk: "T1",
          fhx: "0",
          cyx: "Shenzhen",
        },
        {
          id: 10001,
          name: "Test1",
          sytk: "T1",
          fhx: "0",
          cyx: "Shenzhen",
        },
        {
          id: 10001,
          name: "Test1",
          sytk: "T1",
          fhx: "0",
          cyx: "Shenzhen",
        },
        {
          id: 10001,
          name: "Test1",
          sytk: "T1",
          fhx: "0",
          cyx: "Shenzhen",
        },
      ],
      fhxList: [
        { label: "符合", value: "1" },
        { label: "不符合", value: "0" },
      ],
    };
  },

  methods: {
    // 打开
    open(ids) {
      this.openEdit = true;
      this.getExportData(ids);
    },

    // 获取要导出的数据
    getExportData(ids) {
      console.log(ids, "ids");
    },

    headerRowStyle() {
      return {
        background: "#ECF3FF",
      };
    },

    formatFhx(value) {
      if (value === "1") {
        return "符合";
      }
      if (value === "0") {
        return "不符合";
      }
    },

    updateData({ row, column }) {
      console.log(row, column);

      // 获取更改的行并重新赋值
      this.tableData.map((item) => {
        if (item.id === row.id) {
          item = row;
        }
      });
    },

    // 确定导出
    confirmExport() {
      console.log(this.tableData, "tabledata");
      this.close();
    },

    // 关闭
    close() {
      this.openEdit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.export-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  line-height: 120px;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #4b4b4b;
  letter-spacing: 2px;
  border-bottom: 1px solid #0a8def;
  .export-title-img {
    width: 50px;
    height: 50px;
    margin-right: 20px;
  }
}

/deep/ .el-dialog__body {
  padding: 0px;
}
</style>
