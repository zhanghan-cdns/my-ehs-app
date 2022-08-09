<template>
  <div>
    <div class="extra-form-title" style="padding-top: 0px">
      <i class="iconfont icon-a-zu20172 form-title-icon"></i>
      <span class="form-title-name">历史数据</span>
    </div>
    <div>
      <dom-size-listen style="flex: 1" v-model="sizeCon">
        <render-table :data="historyData" :columns="historyColumns" />
      </dom-size-listen>
    </div>
    <div class="extra-form-title">
      <i class="iconfont icon-a-zu20172 form-title-icon"></i>
      <span class="form-title-name">分析数据</span>
    </div>
    <div>
      <dom-size-listen style="flex: 1" v-model="sizeCon">
        <render-table :data="analysisData" :columns="analysisColumns" />
      </dom-size-listen>
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
      historyData: [{}],
      historyColumns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "gasSamplingAndAnalysisTime",
          title: "气体取样分析时间",
          align: "center",
        },
        {
          field: "analyzeTheProject",
          title: "分析项目",
          align: "center",
        },
        {
          field: "representativeGases",
          title: "代表性气体（分析物质）",
          align: "center",
        },
        {
          field: "analyzingData",
          title: "分析数据",
          align: "center",
        },
        {
          field: "analyzingPeople",
          title: "分析人",
          align: "center",
        },
      ],
      analysisData: [{}],
      analysisColumns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "gasSamplingAndAnalysisTime",
          title: "气体取样分析时间",
          align: "center",
          render: (h, { row }) => {
            return (
              <div>
                <el-date-picker
                  style="width:100%"
                  v-model={row.gasSamplingAndAnalysisTime}
                  type="datetime"
                  placeholder="请选择动火分析时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </div>
            );
          },
        },
        {
          field: "analyzeTheProject",
          title: "分析项目",
          align: "center",
          render: (h, { row }) => {
            return (
              <div>
                <el-select
                  style="width:100%"
                  v-model={row.analyzeTheProject}
                  placeholder="请选择分析项目"
                >
                  <el-option value={1} label="可燃气"></el-option>
                  <el-option value={2} label="有毒有害物质"></el-option>
                  <el-option value={3} label="氧含量"></el-option>
                </el-select>
              </div>
            );
          },
        },
        {
          field: "representativeGases",
          title: "代表性气体（分析物质）",
          align: "center",
          render: (h, { row }) => {
            return (
              <el-input
                style="width:100%"
                v-model={row.representativeGases}
                placeholder="请输入代表性气体"
              ></el-input>
            );
          },
        },
        {
          field: "analyzingData",
          title: "分析数据",
          align: "center",
          render: (h, { row }) => {
            return (
              <div style="display:flex;align-items:center">
                <el-input
                  style="margin-right:13px;"
                  v-model={row.analyzingData}
                  placeholder="请输入代表性气体"
                ></el-input>
                <div style="width:39px;color:#999999">
                  {row.analyzeTheProject === 1 ? "%LEL" : ""}
                  {row.analyzeTheProject === 2 ? "PPM" : ""}
                  {row.analyzeTheProject === 3 ? "%" : ""}
                </div>
              </div>
            );
          },
        },
        {
          field: "analyzingPeople",
          title: "分析人",
          align: "center",
          width: 170,
          render: (h, { rowIndex, row }) => {
            if (row.analyzingPeople) {
              return (
                <img
                  style="width:133px;height:50px"
                  src={row.analyzingPeople}
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
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { rowIndex }) => {
            return (
              <div style="display:flex;justify-content:center;">
                <div
                  class="opearte-btn add"
                  onClick={() => {
                    this.addRow(rowIndex);
                  }}
                >
                  添加
                </div>
                <div
                  class="opearte-btn delete"
                  onClick={() => {
                    this.deleteRow(rowIndex);
                  }}
                >
                  删除
                </div>
              </div>
            );
          },
        },
      ],
    };
  },

  methods: {
    // 签字
    sign(rowIndex) {
      this.$refs.signDialogRef.open(rowIndex);
    },

    // 获取签字图片
    getSignImg(imgSrc, param) {
      this.$set(this.analysisData, param, {
        ...this.analysisData[param],
        analyzingPeople: imgSrc,
      });
    },
    // 添加
    addRow(rowIndex) {
      this.analysisData.splice(rowIndex + 1, 0, {});
    },
    // 删除
    deleteRow(rowIndex) {
      if (this.analysisData.length > 1) {
        this.analysisData.splice(rowIndex, 1);
      }
    },

    // 提交
    submitForm() {
      console.log(this.analysisData, "analysisData");
    },
  },
};
</script>

<style lang="scss" scoped>
.extra-form-title {
  padding: 34px 0px 10px 0px;
  margin-bottom: 17px;
  border-bottom: 1px solid #f0f0f0;
  .form-title-icon {
    color: #4a80fc;
    margin-right: 6px;
  }
  .form-title-name {
    font-size: 16px;
  }
}

/deep/ .opearte-btn {
  margin: 0px 12px;
  cursor: pointer;
}

/deep/ .add {
  color: #4a80fc;
}

/deep/ .delete {
  color: #ff4646;
}
</style>