<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="500"
      height="50%"
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
        >
          <el-row>
            <el-col span="24">
              <el-form-item label="类别名称" prop="name">
                <el-input
                  placeholder="类别名称"
                  clearable
                  v-model="form.name"
                  :style="`width:${width2}`"
                  :size="size"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="所属上级" prop="sssj">
                <el-select
                  placeholder="请选择"
                  clearable
                  v-model="form.pid"
                  :style="`width:${width2}`"
                  :size="size"
                >
                  <el-option
                    :key="form.pid"
                    :value="form.pid"
                    :label="form.pname"
                    style="display: none"
                  />
                  <el-tree
                    :data="sssjList"
                    :props="props"
                    :highlight-current="true"
                    @node-click="handleNodeClick"
                  >
                  </el-tree>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import {
  subCategoryCreateAPI,
  subCategoryViewAPI,
  subCategoryUpdateAPI,
} from "@/api/institutionalized/lawsRegulations/subCategory";

export default {
  name: "subCategoryEditDialog",

  data() {
    return {
      icon: "icon-xinzeng",
      title: "",
      openEdit: false,
      width: "260px",
      width2: "91%",
      size: "small",
      sssjList: [],
      props: {
        children: "children",
        label: "name",
      },
      form: {
        name: "",
        pid: "",
        pname: "",
      },
      rules: {},
      row: {},
    };
  },

  created() {},

  methods: {
    // 打开
    open(treeData, row) {
      console.log(treeData, row, "treeData");
      this.title = "新增类别";
      this.openEdit = true;
      this.sssjList = treeData;
      if (row && row.id) {
        this.row = row;
        this.getDetail(row.id);
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
      this.reset();
      this.form = {};
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields();
    },

    handleNodeClick(data) {
      console.log(data, "data");
      this.form.pid = data.id;
      this.form.pname = data.name;
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
        const res = await subCategoryViewAPI({ id });
        if (res.code === 200) {
          this.form = {
            ...res.data,
          };
          console.log(this.form,'form');
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    // 新增
    async add() {
      try {
        const res = await subCategoryCreateAPI(this.form);
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
        const res = await subCategoryUpdateAPI({
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
