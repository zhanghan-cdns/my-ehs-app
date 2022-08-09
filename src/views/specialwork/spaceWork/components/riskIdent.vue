<template>
  <div>
    <div style="margin-bottom: 13px">
      <dom-size-listen style="flex: 1" v-model="sizeCon">
        <render-table
          :data="tableData"
          :columns="columns"
          :mergeCells="mergeCells"
        />
      </dom-size-listen>
    </div>
    <el-form
      label-width="220px"
      label-position="right"
      :model="form"
      :rules="rules"
      size="small"
      ref="formRef"
    >
      <el-row>
        <el-col span="24">
          <el-form-item
            label="涉及的其他特殊作业"
            prop="specialOperationInvolved"
          >
            <el-checkbox-group v-model="form.specialOperationInvolved">
              <el-checkbox
                v-for="item in specialOperationInvolvedList"
                :key="item.id"
                :label="item.dictValue"
                >{{ item.dictValueName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item
            label="涉及的其他特殊作业编号"
            prop="specialOperationInvolvedNo"
          >
            <el-input
              placeholder="请选择涉及的其他特殊作业编号"
              clearable
              v-model="form.specialOperationInvolvedNo"
              :style="`width:${width2}`"
            ></el-input>
            <button-select @click="selectSpecialOperationInvolvedNo"
              >选择</button-select
            >
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="风险辨识结果" prop="hazardIDentification">
            <el-checkbox-group v-model="form.hazardIDentification">
              <el-checkbox
                v-for="item in hazardIDentificationList"
                :key="item.id"
                :label="item.dictValue"
                >{{ item.dictValueName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="危害预防措施" prop="hazardPreventionMeasures">
            <el-input
              placeholder="请输入危害预防措施"
              type="textarea"
              :rows="5"
              clearable
              v-model="form.hazardPreventionMeasures"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="防护用品" prop="protectiveEquipment">
            <el-checkbox-group v-model="form.protectiveEquipment">
              <el-checkbox
                v-for="item in protectiveEquipmentList"
                :key="item.id"
                :label="item.dictValue"
                >{{ item.dictValueName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="其他防护用品" prop="otherProtectiveEquipment">
            <el-input
              placeholder="请输入其他防护用品"
              clearable
              v-model="form.otherProtectiveEquipment"
              :style="`width:${width}`"
              :size="size"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    dictConfig: {
      type: Object,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      form: {
        specialOperationInvolved: [],
        hazardIDentification: [],
        protectiveEquipment: [],
      },
      rules: {
        otherProtectiveEquipment: [{ required: true, trigger: "blur" }],
      },
      width: "100%",
      width2: "91%",
      specialOperationInvolvedList: [
        {
          id: "1",
          dictValue: "1",
          dictValueName: "有限空间",
        },
        {
          id: "2",
          dictValue: "2",
          dictValueName: "高处作业",
        },
        {
          id: "3",
          dictValue: "3",
          dictValueName: "吊装作业",
        },
        {
          id: "4",
          dictValue: "4",
          dictValueName: "临时用电",
        },
        {
          id: "5",
          dictValue: "5",
          dictValueName: "动土作业",
        },
        {
          id: "6",
          dictValue: "6",
          dictValueName: "断路作业",
        },
        {
          id: "7",
          dictValue: "7",
          dictValueName: "盲板抽堵",
        },
      ],
      hazardIDentificationList: [
        {
          id: "1",
          dictValue: "1",
          dictValueName: "物体打击",
        },
        {
          id: "2",
          dictValue: "2",
          dictValueName: "车辆伤害",
        },
        {
          id: "3",
          dictValue: "3",
          dictValueName: "机械伤害",
        },
        {
          id: "4",
          dictValue: "4",
          dictValueName: "起重伤害",
        },
        {
          id: "5",
          dictValue: "5",
          dictValueName: "触电",
        },
        {
          id: "6",
          dictValue: "6",
          dictValueName: "淹溺",
        },
        {
          id: "7",
          dictValue: "7",
          dictValueName: "灼烫",
        },
        {
          id: "5",
          dictValue: "5",
          dictValueName: "火灾",
        },
        {
          id: "6",
          dictValue: "6",
          dictValueName: "高处坠落",
        },
        {
          id: "7",
          dictValue: "7",
          dictValueName: "坍塌",
        },
        {
          id: "5",
          dictValue: "5",
          dictValueName: "冒顶片帮",
        },
        {
          id: "6",
          dictValue: "6",
          dictValueName: "透水",
        },
        {
          id: "7",
          dictValue: "7",
          dictValueName: "放炮",
        },
      ],
      protectiveEquipmentList: [
        {
          id: "1",
          dictValue: "1",
          dictValueName: "防酸碱外套/围裙",
        },
        {
          id: "2",
          dictValue: "2",
          dictValueName: "防化服",
        },
        {
          id: "3",
          dictValue: "3",
          dictValueName: "重型防化服",
        },
        {
          id: "4",
          dictValue: "4",
          dictValueName: "防烫服",
        },
        {
          id: "5",
          dictValue: "5",
          dictValueName: "防尘服",
        },
        {
          id: "6",
          dictValue: "6",
          dictValueName: "手套",
        },
        {
          id: "7",
          dictValue: "7",
          dictValueName: "护目镜",
        },
      ],
      tableData: [
        {
          analyzeTheProject: 1,
          representativeGases: "",
          qualificationCriteria: "",
        },
        {
          analyzeTheProject: 2,
          representativeGases: "",
          qualificationCriteria: "",
        },
        {
          analyzeTheProject: 3,
          representativeGases: "",
          qualificationCriteria: "",
        },
      ],
      columns: [
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
                  size="small"
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
                size="small"
              ></el-input>
            );
          },
        },
        {
          field: "qualificationCriteria",
          title: "合格标准",
          align: "center",
          render: (h, { row }) => {
            return (
              <el-input
                style="width:100%"
                v-model={row.qualificationCriteria}
                placeholder="请输入合格标准"
                size="small"
              ></el-input>
            );
          },
        },
        {
          title: "操作",
          align: "center",
          width: 160,
          fixed: "right",
          render: (h, { rowIndex }) => {
            if (rowIndex < 3) {
              return (
                <div>
                  <i
                    class="iconfont icon-tianjia"
                    style="font-size:40px;color:#4A80FC;cursor:pointer"
                    onClick={() => this.addRow()}
                  ></i>
                </div>
              );
            } else {
              return (
                <div>
                  <i
                    class="iconfont icon-a-zu20182"
                    style="font-size:33px;color:#FF4646;cursor:pointer"
                    onClick={() => this.deleteRow(rowIndex)}
                  ></i>
                </div>
              );
            }
          },
        },
      ],
      mergeCells: [{ row: 0, col: 3, rowspan: 3, colspan: 1 }], // 合并单元格规则
    };
  },

  methods: {
    // 选择涉及的其他特殊作业编号
    selectSpecialOperationInvolvedNo() {},

    // 添加
    addRow() {
      console.log(this.$refs.tableRef, "111");
      this.tableData.push({});
      this.$set(this.mergeCells, 0, { row: 0, col: 3, rowspan: 3, colspan: 1 });
    },
    // 删除
    deleteRow(rowIndex) {
      if (this.tableData.length > 3) {
        this.tableData.splice(rowIndex, 1);
        this.$set(this.mergeCells, 0, {
          row: 0,
          col: 3,
          rowspan: 3,
          colspan: 1,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/form.scss";
/deep/ .button-select {
  margin-left: 10px;
}
</style>