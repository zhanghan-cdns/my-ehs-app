<!--  -->
<template>
  <div>
    <basic-dialog
      :openFlag="openEdit"
      height="75%"
      icon="1"
      title="新增单元"
      v-bind="$attrs"
      width="850px"
      @close="close"
    >
      <template #content>
        <div v-for="(dataItem, i) in dataList" :key="dataItem.id">
          <div
            style="
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #eee;
              height: 60px;
              line-height: 60px;
              margin: 0px 20px;
            "
          >
            <div style="font-weight: bold">风险分析单元</div>
            <div style="display: flex;align-items: center" v-if="dialogType!=='bianji'&&dialogType!=='chakan'">
              <div class="add-btn-wrap" @click="addBtn">＋</div>
              <div class="remove-btn-wrap" @click="removeBtn(i)">－</div>
            </div>
          </div>
          <div style="margin-top: 30px">
            <el-form
              ref="formRef"
              :model="dataItem"
              :rules="rules"
              label-position="right"
              label-width="140px"
              :disabled="dialogType==='chakan'"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="风险分析单元" prop="unitName">
                    <el-input
                      v-model="dataItem.unitName"
                      :isDisabled="isDisabled"
                      :size="size"
                      clearable
                      placeholder="风险分析单元"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="风险类型" prop="riskType">
                    <el-select
                      v-model="dataItem.riskType"
                      :isDisabled="isDisabled"
                      :size="size"
                      clearable
                      placeholder="类型"
                    >
                      <el-option
                        v-for="item in dictConfig.riskType"
                        :key="item.id"
                        :label="item.dictValueName"
                        :value="item.dictValue"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col
                >
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item :prop="'accidentType' + dataItem.id" label="事故类型">
                    <div style="border: 1px solid #eee; padding: 5px">
                      <el-checkbox-group
                        v-model="dataItem.accidentType"
                        @change="accidentTypeChange"
                      >
                        <el-checkbox v-for="item in dictConfig.accidentType" :key="item.id" :label="item.dictValue"
                        >{{ item.dictValueName }}
                        </el-checkbox
                        >
                      </el-checkbox-group>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="备注" prop="remark">
                    <el-input
                      v-model="dataItem.remark"
                      :rows="4"
                      :size="size"
                      clearable
                      placeholder="备注"
                      type="textarea"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button type="success" @click="reset">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import {unitAPI} from "@/api/doubleprevention/riskobject/index";
import {getUuid} from "@/util/index";

export default {
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    tableData: {
      type: Array,
    },
    isDisabled: {
      type: Boolean
    }
  },
  data() {
    return {
      openEdit: false,
      dataList: [
        {
          title: "风险分析单元",
          unitName: "",
          riskType: "",
          accidentType: [],
          remark: "",
          id: getUuid(),
        },
      ],
      index: "1",
      rowData: "",
      accidentType: "",
      size: 'small',
      rules: {
        unitName: [
          {required: true, message: "请输入考核办法", trigger: "blur"},
        ],
      },
      dialogType: true,
    };
  },
  methods: {
    // 打开
    open(row, type) {
      this.openEdit = true;
      this.dialogType = type
      if (row && row.id) {
        this.rowData = row;
        this.dataList = [
          {
            id: row.id,
            unitName: row.unitName,
            accidentType: row.accidentType.map(item => item.accidentType instanceof Object ? item.accidentType.key : item.accidentType),
            remark: row.remark,
            riskType: row.riskType instanceof Object ? row.riskType.key : row.riskType,
          },
        ];
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
      this.dataList = [
        {
          title: "风险分析单元",
          unitName: "",
          riskType: "",
          accidentType: [],
          remark: "",
          id: getUuid(),
        },
      ];
      //   this.reset();
    },
    removeBtn(index) {
      if (index === 0) return
      this.dataList.splice(index, 1);
    },
    addBtn() {
      const obj = {
        title: "风险名称",
        unitName: "",
        riskType: "",
        accidentType: [],
        remark: "",
        id: this.index++,
      };

      this.dataList.push(obj);
      console.log(this.dataList, "新增对象");
    },
    accidentTypeChange(val) {
      //事故类型选择
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields();
      //   this.form = {};
    },
    // 获取详情
    async getDetails(id) {
      try {
        const res = await unitAPI({id});
        if (res.code === 200) {
          let accidentType = [];
          res.data.accidentType.forEach((ele) => {
            accidentType.push(ele.accidentType.key);
          });
          this.dataList = [
            {
              unitName: res.data.unitName,
              accidentType: accidentType,
              riskType: res.data.riskType ? res.data.riskType.key : "",
            },
          ];
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 提交接口
    submitForm() {
      this.dataList = this.dataList.map(item => ({
        ...item,
        accidentType: item.accidentType.map(typeItem => ({accidentType: typeItem})),
      }))
      this.$emit("refresh", this.dataList);
      this.close();
    },
    // 新增
    async add() {
      this.dataList = [
        {
          title: "风险名称",
          unitName: "",
          risktype: "",
          accidenttype: [],
          remark: "",
        },
      ];
    },
    // 修改
    async modify() {
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.unit-style {
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  width: 100%;
  border-bottom: 1px solid #eee;
  background: #fcc;
}

.add-btn-wrap,
.remove-btn-wrap {
  color: #fff;
  background: #FF4646;
  width: 30px;
  height: 30px;
  margin-right: 5px;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn-wrap {
  background: #4A80FC;
}
</style>
