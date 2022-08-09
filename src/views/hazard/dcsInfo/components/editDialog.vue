<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="592px"
      height="450px"
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
              <el-form-item label="DCS组态图名称" prop="dcsname">
                <el-input
                  placeholder="DCS组态图名称"
                  clearable
                  v-model="form.dcsname"
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="序号" prop="sortNumber">
                <el-input
                  placeholder="序号"
                  clearable
                  v-model="form.sortNumber"
                  :style="`width:${width}`"
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
                  :style="`width:${width}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="照片">
                <basic-upload
                  key="picture"
                  @onSuccess="
                    (fileList) => onSuccess(fileList, 'enclosurePhoto')
                  "
                  @onRemove="(fileList) => onRemove(fileList, 'enclosurePhoto')"
                  :photos="form.enclosurePhoto"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')"
            >保存
          </el-button>
          <el-button type="success" @click="reset('form')">重置 </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import {
  dcsInfoCreateAPI,
  dcsInfoViewAPI,
  dcsInfoUpdateAPI,
} from "@/api/hazard/dcsInfo/index";

export default {
  name: "editDialog",
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
      title: "添加组态图",
      openEdit: false,
      width: "360px",
      size: "small",
      form: {
        enclosurePhoto: {},
      },
      rules: {},
      id: "",
    };
  },

  created() {},

  methods: {
    // 打开
    open(id) {
      this.openEdit = true;
      if (id) {
        this.id = id;
        this.getDetail(id);
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
      this.form.enclosurePhoto = {};
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
          if (this.id) this.modify();
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
        const res = await dcsInfoCreateAPI(this.form);
        if (res.code === 200) {
          this.$message.success("新增成功");
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
        const res = await dcsInfoUpdateAPI({
          ...this.form,
          id: this.id,
        });
        if (res.code === 200) {
          this.$message.success("修改成功");
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
        const res = await dcsInfoViewAPI({ id });
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
</style>
