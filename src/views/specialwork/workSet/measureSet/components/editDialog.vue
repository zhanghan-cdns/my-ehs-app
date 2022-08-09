<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="880"
      height="40%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form
          label-width="120px"
          label-position="right"
          :model="form"
          :rules="rules"
          ref="formRef"
          :disabled="isDisabled"
        >
          <el-row>
            <el-col span="12">
              <el-form-item label="作业类型" prop="jobType">
                <el-select
                  clearable
                  placeholder="请选择作业类型"
                  v-model="form.jobType"
                  :style="`width:${width}`"
                  :size="size"
                >
                  <el-option
                    v-for="item in dictConfig.jobTypeList"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="排序" prop="sort">
                <el-input
                  placeholder="请输入排序"
                  clearable
                  v-model="form.sort"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="措施" prop="measures">
                <el-input
                  placeholder="请输入措施"
                  type="textarea"
                  :rows="5"
                  clearable
                  v-model="form.measures"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom v-if="type !== 'chakan'">
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
      subTitle: "措施设置",
      openEdit: false,
      width: "85.5%",
      width2: "94%",
      size: "small",
      form: {
        jobType: "",
        sort: "",
        measures: "",
      },
      rules: {
        jobType: [
          { required: true, message: "请选择作业类型", trigger: "change" },
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
        measures: [{ required: true, message: "请输入措施", trigger: "blur" }],
      },
      row: {},
      type: "",
      tabName: "",
    };
  },

  created() {},

  computed: {
    title: function () {
      if (this.row && this.type === "chakan") {
        return `查看${this.subTitle}`;
      } else if (this.row) {
        return `编辑${this.subTitle}`;
      } else {
        return `新增${this.subTitle}`;
      }
    },

    icon: function () {
      if (this.row && this.type === "chakan") {
        return `icon-chakan2`;
      } else if (this.row) {
        return `icon-bianji1`;
      } else {
        return `icon-xinzeng`;
      }
    },

    isDisabled: function () {
      return this.type === "chakan" ? true : false;
    },
  },

  methods: {
    // 打开
    open(tabName, row, type) {
      console.log(tabName, "tabName");
      this.openEdit = true;
      this.tabName = tabName;
      this.row = row;
      this.type = type;
      if (row) {
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
    async getDetail() {
      let res = {};
      let params = { id: this.row.id };
      switch (this.tabName) {
        case "fireWork": // 动火作业
          res = await fireWorkAPI(params);
          break;
        case "spaceWork": // 受限空间作业
          res = await spaceWorkAPI(params);
          break;
        case "blindWork": // 盲板抽堵作业
          res = await blindWorkAPI(params);
          break;
        case "highWork": // 高处作业
          res = await highWorkAPI(params);
          break;
        case "hoistingWork": // 吊装作业
          res = await hoistingWorkAPI(params);
          break;
        case "electricWork": // 临时用电
          res = await electricWorkAPI(params);
          break;
        case "groundWork": // 动土作业
          res = await groundWorkAPI(params);
          break;
        case "roadWork": // 断路作业
          res = await roadWorkAPI(params);
          break;
        case "repairWork": // 检维修作业
          res = await repairWorkAPI(params);
          break;
      }
      if (res && res.code === 200) {
        this.form = {
          ...res.data,
        };
      }
    },

    // 新增
    async add() {
      let res = {};
      let params = this.form;
      switch (this.tabName) {
        case "fireWork": // 动火作业
          res = await fireWorkAPI(params);
          break;
        case "spaceWork": // 受限空间作业
          res = await spaceWorkAPI(params);
          break;
        case "blindWork": // 盲板抽堵作业
          res = await blindWorkAPI(params);
          break;
        case "highWork": // 高处作业
          res = await highWorkAPI(params);
          break;
        case "hoistingWork": // 吊装作业
          res = await hoistingWorkAPI(params);
          break;
        case "electricWork": // 临时用电
          res = await electricWorkAPI(params);
          break;
        case "groundWork": // 动土作业
          res = await groundWorkAPI(params);
          break;
        case "roadWork": // 断路作业
          res = await roadWorkAPI(params);
          break;
        case "repairWork": // 检维修作业
          res = await repairWorkAPI(params);
          break;
      }
      if (res && res.code === 200) {
        this.$emit("refresh");
        this.$message.success("新增成功");
        this.close();
      }
    },

    // 修改
    async modify() {
      let res = {};
      let params = { ...this.form, id: this.row.id };
      switch (this.tabName) {
        case "fireWork": // 动火作业
          res = await fireWorkAPI(params);
          break;
        case "spaceWork": // 受限空间作业
          res = await spaceWorkAPI(params);
          break;
        case "blindWork": // 盲板抽堵作业
          res = await blindWorkAPI(params);
          break;
        case "highWork": // 高处作业
          res = await highWorkAPI(params);
          break;
        case "hoistingWork": // 吊装作业
          res = await hoistingWorkAPI(params);
          break;
        case "electricWork": // 临时用电
          res = await electricWorkAPI(params);
          break;
        case "groundWork": // 动土作业
          res = await groundWorkAPI(params);
          break;
        case "roadWork": // 断路作业
          res = await roadWorkAPI(params);
          break;
        case "repairWork": // 检维修作业
          res = await repairWorkAPI(params);
          break;
      }
      if (res && res.code === 200) {
        this.$emit("refresh");
        this.$message.success("修改成功");
        this.close();
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
