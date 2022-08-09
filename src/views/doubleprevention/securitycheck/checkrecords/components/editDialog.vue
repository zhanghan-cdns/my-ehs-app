<template>
  <div>
    <basic-dialog
      icon="icon-chakan2"
      :title="title"
      width="1000px"
      height="75%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form
          label-width="140px"
          label-position="right"
          :model="form"
          :rules="rules"
          ref="formRef"
          :disabled="isDisabled"
        >
          <el-row>
            <el-col span="12">
              <el-form-item label="任务名称" prop="safetyTarget">
                <el-input
                  placeholder="任务名称"
                  clearable
                  v-model="form.safetyTarget"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="检查单编号" prop="targetCode">
                <el-input
                  placeholder="检查单编号"
                  clearable
                  v-model="form.targetCode"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="检查时间" prop="finishTime">
                <el-date-picker
                  v-model="form.finishTime"
                  type="date"
                  placeholder="选择检查时间"
                  :style="`width:${width}`"
                  :size="size"
                  :formatter="dateFormat"
                  value-format="yyyy-MM-dd"
                  :disabled="isDisabled"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="责任部门" prop="targetType">
                <el-select
                  placeholder="责任部门"
                  clearable
                  v-model="form.targetType"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.dutyAllocationType"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="检查人" prop="checkRate">
                <el-select
                  placeholder="检查人"
                  clearable
                  v-model="form.checkRate"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.dutyAllocationCheckFrequency"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="检查组成员" prop="checkRate">
                <el-select
                  placeholder="检查组成员"
                  clearable
                  v-model="form.checkRate"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.dutyAllocationCheckFrequency"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="违章人数" prop="checkMeasure">
                <el-input
                  placeholder="违章人数"
                  clearable
                  v-model="form.checkMeasure"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="治理类型" prop="checkRate">
                <el-select
                  placeholder="治理类型"
                  clearable
                  v-model="form.checkRate"
                  :style="`width:${width}`"
                  :size="size"
                  :disabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.dutyAllocationCheckFrequency"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!isDisabled">
            <el-col>
              <el-form-item label="票据附件(图片)" prop="attachment">
                <basic-upload
                  key="picture"
                  @onSuccess="(fileList) => onSuccess(fileList, 'attachment')"
                  @onRemove="(fileList) => onRemove(fileList, 'attachment')"
                  :photos="form.attachment"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="isDisabled">
            <el-col>
              <el-form-item label="票据附件(图片)">
                <el-image
                  v-for="item in form.attachment"
                  :key="item.url"
                  style="width: 100px; height: 100px"
                  :src="imgUrl + item.url"
                  :preview-src-list="[imgUrl + item.url]"
                ></el-image>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="备注信息">
                <el-input
                  placeholder="备注信息"
                  clearable
                  v-model="form.remark"
                  style="width: 93.5%"
                  :disabled="isDisabled"
                  :autosize="{ minRows: 3 }"
                  resize="none"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="table-box">
                <dom-size-listen style="flex: 1" v-model="sizeCon">
                  <render-table
                    :height="sizeCon.height"
                    :data="tableData"
                    :columns="columns"
                    @checkbox-change="checkboxChange"
                  />
                </dom-size-listen>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button
            type="primary"
            @click="submitForm('form')"
            v-if="!isDisabled"
            >保存
          </el-button>
          <el-button type="success" @click="reset('form')" v-if="!isDisabled"
            >重置
          </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import dictMixin from "@/mixins/dict";
import { imgUrl } from "@/router/axios";
export default {
  mixins: [dictMixin],
  name: "editDialog",
  data() {
    return {
      imgUrl,
      openEdit: false,
      isDisabled: false,
      width: "260px",
      size: "small",
      form: {
        id: "",
      },
      rules: {},
      rowData: {},
      sizeCon: {
        height: "300px",
      },
      tableData: [{ departmentName: "1" }],
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
          field: "departmentName",
          title: "检查内容",
          align: "center",
        },
        {
          field: "departmentName",
          title: "检查结果",
          align: "center",
          render: (h, { row }) => {
            if (!row.rectificationDepartment) {
              return <div class="self">无隐患</div>;
            } else if (row.result == "0") {
              return <div class="notStarand">有隐患</div>;
            }
          },
        },
        {
          field: "cj",
          title: "隐患照片",
          align: "center",
          render: (h, { row, column, $index }) => {
            return (
              <el-image
                style="width: 50px; height: 50px"
                src={
                  "https://img0.baidu.com/it/u=567569280,1708557676&fm=253&fmt=auto?w=200&h=200"
                }
                preview-src-list={[
                  "https://img0.baidu.com/it/u=567569280,1708557676&fm=253&fmt=auto?w=200&h=200",
                  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-04-23%2F5add84fa3acde_120_80.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659342970&t=db8054ee60c380d5d3976217dccab3a2",
                ]}
              ></el-image>
            );
          },
        },
        {
          field: "departmentName",
          title: "问题描述",
          align: "center",
        },
      ],
    };
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: String,
      default: "检查记录",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  created() {},
  methods: {
    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      this.isDisabled = type === "chakan" ? true : false;
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
      this.reset();
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields();
      this.form = {};
    },
    // 提交接口
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          if (this.rowData.id) this.modify();
          else this.add();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增
    async add() {
      try {
        const res = await sdpInfoCreateAPI(this.form);
        if (res.code === 200) {
          this.$message.success("保存成功");
          this.close();
          this.$emit("refresh");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 修改
    async modify() {
      try {
        const res = await sdpInfoUpdateAPI({
          ...this.form,
          id: this.rowData.id,
        });
        if (res.code === 200) {
          this.$message.success("编辑成功");
          this.close();
          this.$emit("refresh");
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await sdpInfoViewAPI({ id });
        if (res.code === 200) {
          this.form = {
            ...res.data,
          };
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
.table-box {
  width: 90%;
  margin: 0 auto;
}
/deep/ .notStarand {
  color: #ff4646;
}

/deep/ .self {
  color: #4a80fc;
}
</style>
