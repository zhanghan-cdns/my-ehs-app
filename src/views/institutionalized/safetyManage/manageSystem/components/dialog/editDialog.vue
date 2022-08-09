<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="980"
      height="90%"
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
        >
          <el-row>
            <el-col span="24">
              <el-form-item label="制度名称" prop="zdmc">
                <el-input
                  placeholder="制度名称"
                  clearable
                  v-model="form.zdmc"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="制度编号" prop="zdbh">
                <el-input
                  placeholder="制度编号"
                  clearable
                  v-model="form.zdbh"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="编制人" prop="dlb">
                <el-select
                  clearable
                  placeholder="编制人"
                  v-model="form.dlb"
                  :style="`width:${width}`"
                  :size="size"
                >
                  <el-option
                    v-for="item in dictConfig.dlbList"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="下次评审日期" prop="psrq">
                <el-date-picker
                  v-model="form.psrq"
                  type="date"
                  placeholder="请选择下次评审日期"
                  value-format="yyyy-MM-dd"
                  :style="`width:${width}`"
                  :size="size"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="版本号" prop="fbjg">
                <el-input
                  placeholder="版本号"
                  clearable
                  v-model="form.fbjg"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="发布部门" prop="dlb">
                <el-select
                  clearable
                  placeholder="发布部门"
                  v-model="form.dlb"
                  :style="`width:${width}`"
                  :size="size"
                >
                  <el-option
                    v-for="item in dictConfig.dlbList"
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
              <el-form-item label="发布日期" prop="fbrq">
                <el-date-picker
                  v-model="form.fbrq"
                  type="date"
                  placeholder="请选择安装时间"
                  value-format="yyyy-MM-dd"
                  :style="`width:${width}`"
                  :size="size"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="启用日期" prop="qyrq">
                <el-date-picker
                  v-model="form.qyrq"
                  type="date"
                  placeholder="请选择启用日期"
                  value-format="yyyy-MM-dd"
                  :style="`width:${width}`"
                  :size="size"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="是否先行" prop="qzcd">
                <el-radio-group v-model="form.qzcd">
                  <el-radio :label="0">是</el-radio>
                  <el-radio :label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="适用部门" prop="dlb">
                <el-select
                  clearable
                  placeholder="适用部门"
                  v-model="form.dlb"
                  :style="`width:${width}`"
                  :size="size"
                >
                  <el-option
                    v-for="item in dictConfig.dlbList"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="制度摘要" prop="zy">
                <el-input
                  type="textarea"
                  :rows="4"
                  clearable
                  v-model="form.zy"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="说明" prop="zy">
                <el-input
                  type="textarea"
                  :rows="4"
                  clearable
                  v-model="form.zy"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="附件">
                <basic-upload
                  key="file"
                  :model="true"
                  @onSuccess="(fileList) => onSuccess(fileList, 'file')"
                  @onRemove="(fileList) => onRemove(fileList, 'file')"
                  :photos="form.file"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="备注" prop="remark">
                <el-input
                  placeholder="/"
                  clearable
                  v-model="form.remark"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
import {
  monitoringIndicatorsCreateAPI,
  monitoringIndicatorsViewAPI,
  monitoringIndicatorsUpdateAPI,
} from "@/api/hazard/monitoringIndicators/index";

export default {
  name: "editDialog",
  components: {},
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      icon: "icon-bianji",
      title: "",
      openEdit: false,
      width: "260px",
      width2: "91%",
      size: "small",
      form: {
        zdmc: "",
        dlb: "",
        xlb: "",
        fbjg: "",
        fgbh: "",
        fbrq: "",
        qyrq: "",
        fzrq: "",
        fcrq: "",
        qzcd: 0,
        file: [],
        zy: "",
        remark: "",
      },
      rules: {
        zdmc: [{ required: true, message: "请输入制度名称", trigger: "blur" }],
      },
      row: {},
    };
  },

  created() {},

  methods: {
    // 打开
    open(row, type) {
      this.openEdit = true;
      this.title = "新增安全管理制度信息";
      if (row) {
        this.title = "编辑安全管理制度信息";
        this.row = row;
        this.getDetail(row.id);
      }

      if (type === "xiuding") {
        this.title = "修订安全管理制度信息";
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
    },

    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList;
    },

    // 提交接口
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          if (this.row.id) this.modify();
          else this.add();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 获取详情
    async getDetail(id) {
      try {
        const res = await monitoringIndicatorsViewAPI({ id });
        if (res.code === 200) {
          this.form = {
            ...res.data,
          };
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    // 新增
    async add() {
      try {
        const res = await monitoringIndicatorsCreateAPI(this.form);
        if (res.code === 200) {
          this.$emit("refresh");
          this.$message.success("新增成功");
          this.close();
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    // 修改
    async modify() {
      try {
        const res = await monitoringIndicatorsUpdateAPI({
          ...this.form,
          id: this.row.id,
        });
        if (res.code === 200) {
          this.$emit("refresh");
          this.$message.success("修改成功");
          this.close();
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
</style>
