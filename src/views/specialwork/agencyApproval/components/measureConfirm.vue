<template>
  <div>
    <dom-size-listen style="flex: 1" v-model="sizeCon">
      <render-table
        @checkbox-change="selectChangeEvent"
        @checkbox-all="selectChangeEvent"
        :data="tableData"
        :columns="columns"
      />
    </dom-size-listen>
    <div style="display: flex; width: 100%; margin-top: 16px">
      <div class="extra-item-name">是否通过</div>
      <div class="extra-item-content">
        <el-radio-group v-model="through">
          <el-radio :label="0">通过</el-radio>
          <el-radio :label="1">不通过</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div style="text-align: center; margin-top: 50px">
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button type="success" @click="reset">重置</el-button>
      <el-button type="warning" @click="close">取消</el-button>
    </div>
    <sign-dialog ref="signDialogRef" @getSignImg="getSignImg"></sign-dialog>
  </div>
</template>

<script>
import tableMixins from "@/mixins/table";
export default {
  mixins: [tableMixins],

  data() {
    return {
      tableData: [
        {
          id: "1",
          safetyMeasure:
            "动火设备内部构件清理干净，蒸汽吹扫或水洗合格，达到用火条件",
          invole: 1,
          implement: 1,
          livePhotos: "",
          signatureOfConfirmingPerson: "",
        },
        {
          id: "2",
          safetyMeasure:
            "动火设备内部构件清理干净，蒸汽吹扫或水洗合格，达到用火条件",
          invole: 0,
          implement: 0,
          livePhotos: "",
          signatureOfConfirmingPerson: "",
        },
      ],
      columns: [
        {
          type: "checkbox",
          width: 50,
          align: "center",
          fixed: "left",
        },
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "safetyMeasure",
          title: "安全措施",
          align: "center",
        },
        {
          field: "invole",
          title: "是否涉及",
          align: "center",
          width: 184,
          render: (h, { row }) => {
            if (row.invole === 1) {
              return <div style="text-align:center;color:#4A80FC;">涉及</div>;
            } else if (row.invole === 0) {
              return <div style="text-align:center;color:#999999;">不涉及</div>;
            } else {
              return <div></div>;
            }
          },
        },
        {
          field: "caozuo",
          title: "操作",
          align: "center",
          width: 255,
          render: (h, { row }) => {
            if (row.invole === 0) {
              return (
                <div>
                  <el-radio-group v-model={row.implement} disabled>
                    <el-radio>已执行</el-radio>
                    <el-radio>未执行</el-radio>
                  </el-radio-group>
                </div>
              );
            } else {
              return (
                <div>
                  <el-radio-group v-model={row.implement}>
                    <el-radio label={1}>已执行</el-radio>
                    <el-radio label={0}>未执行</el-radio>
                  </el-radio-group>
                </div>
              );
            }
          },
        },
        {
          field: "livePhotos",
          title: "现场照片",
          align: "center",
          width: 255,
          render: (h, { row, rowIndex }) => {
            return (
              <div>
                <upload-photos
                  photos={row.livePhotos}
                  onRemove={(fileList) => this.onRemove(fileList, rowIndex)}
                  onSuccess={(fileList) => this.onSuccess(fileList, rowIndex)}
                ></upload-photos>
              </div>
            );
          },
        },
        {
          field: "signatureOfConfirmingPerson",
          title: "确认人签字",
          align: "center",
          width: 255,
          render: (h, { rowIndex, row }) => {
            if (
              row.signatureOfConfirmingPerson &&
              row.signatureOfConfirmingPerson !== ""
            ) {
              return (
                <img
                  style="width:133px;height:50px"
                  src={row.signatureOfConfirmingPerson}
                />
              );
            } else {
              return (
                <div>
                  <button-select
                    onClick={() => {
                      this.sign(rowIndex);
                    }}
                  >
                    签字
                  </button-select>
                </div>
              );
            }
          },
        },
      ],
      through: 0,
    };
  },

  methods: {
    onSuccess(fileList, params) {
      this.tableData[params].livePhotos = fileList;
      console.log(this.tableData, "success");
    },

    // 删除图片
    onRemove(fileList, params) {
      this.tableData[params].livePhotos = fileList;
      console.log(this.tableData, "remove");
    },

    // 签字
    sign(rowIndex) {
      this.$refs.signDialogRef.open(rowIndex);
    },

    // 获取签字图片
    getSignImg(imgSrc, param) {
      this.$set(this.tableData, param, {
        ...this.tableData[param],
        signatureOfConfirmingPerson: imgSrc,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .button-select {
  margin-left: 0px;
}

.extra-item-name {
  width: 224px;
  height: 48px;
  line-height: 48px;
  background: #f0f5ff;
  text-align: center;
  border-top: 1px solid #d0e0ff;
  border-left: 1px solid #d0e0ff;
  border-bottom: 1px solid #d0e0ff;
}

.extra-item-content {
  line-height: 48px;
  padding: 0px 10px;
  border: 1px solid #d0e0ff;
  width: 100%;
}

/deep/ .el-upload--picture-card {
  background: #f0f5ff;
}
</style>