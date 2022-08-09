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
              <el-form-item label="法律法规名称" prop="lawsName">
                <el-input
                  placeholder="法律法规名称"
                  clearable
                  v-model="form.lawsName"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="大类别" prop="largeCategory">
                <el-select
                  placeholder="大类别"
                  clearable
                  v-model="form.largeCategory"
                  :style="`width:${width}`"
                  :size="size"
                >
                  <el-option
                    v-for="item in dictConfig.largeCategoryList"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="小类别" prop="subCategory">
                <el-select
                  placeholder="小类别"
                  clearable
                  v-model="form.subCategory"
                  :style="`width:${width}`"
                  :size="size"
                >
                  <el-option
                    v-for="item in dictConfig.subCategoryList"
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
              <el-form-item label="发布机构" prop="releaseDepartment">
                <el-input
                  placeholder="发布机构"
                  clearable
                  v-model="form.releaseDepartment"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="法规编号" prop="regulationNum">
                <el-input
                  placeholder="法规编号"
                  clearable
                  v-model="form.regulationNum"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="发布日期" prop="releaseDate">
                <el-date-picker
                  v-model="form.releaseDate"
                  type="date"
                  placeholder="请选择发布日期"
                  value-format="yyyy-MM-dd"
                  :style="`width:${width}`"
                  :size="size"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="启用日期" prop="enableDate">
                <el-date-picker
                  v-model="form.enableDate"
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
              <el-form-item label="废止日期" prop="abolishDate">
                <el-date-picker
                  v-model="form.abolishDate"
                  type="date"
                  placeholder="请选择废止日期"
                  value-format="yyyy-MM-dd"
                  :style="`width:${width}`"
                  :size="size"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="复查日期" prop="reviewDate">
                <el-date-picker
                  v-model="form.reviewDate"
                  type="date"
                  placeholder="请选择复查日期"
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
              <el-form-item label="强制程度" prop="forceLevel">
                <el-radio-group v-model="form.forceLevel">
                  <el-radio :label="0">强制性</el-radio>
                  <el-radio :label="1">推荐性</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="现行法规" prop="currentRegulations">
                <el-radio-group v-model="form.currentRegulations">
                  <el-radio :label="0">是</el-radio>
                  <el-radio :label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="附件">
                <basic-upload
                  key="file"
                  :model="true"
                  @onSuccess="(fileList) => onSuccess(fileList, 'attachment')"
                  @onRemove="(fileList) => onRemove(fileList, 'attachment')"
                  :photos="form.attachment"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="摘要" prop="ruleAbstract">
                <el-input
                  type="textarea"
                  :rows="2"
                  clearable
                  v-model="form.ruleAbstract"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="备注" prop="remark">
                <el-input
                  placeholder="备注"
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
  standardLibraryCreateAPI,
  standardLibraryViewAPI,
  standardLibraryUpdateAPI,
} from "@/api/institutionalized/lawsRegulations/standardLibrary";

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
      icon: "icon-xinzeng",
      title: "",
      openEdit: false,
      width: "260px",
      width2: "91%",
      size: "small",
      form: {
        lawsName: "",
        largeCategory: "",
        subCategory: "",
        releaseDepartment: "",
        regulationNum: "",
        releaseDate: "",
        enableDate: "",
        abolishDate: "",
        reviewDate: "",
        forceLevel: 0,
        currentRegulations: 0,
        attachment: [],
        ruleAbstract: "",
        remark: "",
      },
      rules: {
        lawsName: [
          { required: true, message: "请输入法律法规名称", trigger: "blur" },
        ],
        // largeCategory: [
        //   { required: true, message: "请选择大类别", trigger: "change" },
        // ],
        // subCategory: [
        //   { required: true, message: "请选择小类别", trigger: "change" },
        // ],
        releaseDepartment: [
          { required: true, message: "请输入发布机构", trigger: "blur" },
        ],
        regulationNum: [
          { required: true, message: "请输入法规编号", trigger: "blur" },
        ],
        enableDate: [
          { required: true, message: "请选择启用日期", trigger: "change" },
        ],
        forceLevel: [
          { required: true, message: "请选择强制程度", trigger: "change" },
        ],
        currentRegulations: [
          { required: true, message: "请选择现行法规", trigger: "change" },
        ],
        ruleAbstract: [
          { required: true, message: "请输入摘要", trigger: "blur" },
        ],
      },
      row: {},
    };
  },

  created() {},

  methods: {
    // 打开
    open(row) {
      this.openEdit = true;
      this.title = "新增法律法规库表信息";
      if (row) {
        this.title = "编辑法律法规库表信息";
        this.icon = "icon-bianji1"
        this.row = row;
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
        const res = await standardLibraryViewAPI({ id });
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
        const res = await standardLibraryCreateAPI(this.form);
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
        const res = await standardLibraryUpdateAPI({
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
