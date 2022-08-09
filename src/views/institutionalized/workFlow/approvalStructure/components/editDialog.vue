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
              <el-form-item label="步骤名称" prop="bzmc">
                <el-input
                  placeholder="步骤名称"
                  clearable
                  v-model="form.bzmc"
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
                  placeholder="请选择所属上级"
                  clearable
                  v-model="form.sssjid"
                  :style="`width:${width2}`"
                  :size="size"
                >
                  <el-option
                    :key="form.sssjid"
                    :value="form.sssjid"
                    :label="form.sssjname"
                    style="display: none"
                  />
                  <el-tree
                    :data="sssjList"
                    :props="props"
                    :highlight-current="true"
                    @node-click="handleNodeClick"
                  >
                    <span class="custom-tree-node" slot-scope="{ node }">
                      <i
                        v-if="!node.isLeaf"
                        class="iconfont icon-a-zu19815"
                      ></i>
                      <i v-if="node.isLeaf" class="iconfont icon-yonghu"></i
                      >{{ node.label }}
                    </span>
                  </el-tree>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="关联部门" prop="dept">
                <el-select
                  placeholder="请选择关联部门"
                  clearable
                  v-model="form.deptid"
                  :style="`width:${width2}`"
                  :size="size"
                >
                  <el-option
                    :key="form.deptid"
                    :value="form.deptid"
                    :label="form.deptname"
                    style="display: none"
                  />
                    <el-tree
                      :data="deptList"
                      :props="deptProps"
                      :highlight-current="true"
                      @node-click="handleDeptNodeClick"
                    >
                      <span class="custom-tree-node" slot-scope="{ node }">
                        <i
                          v-if="!node.isLeaf"
                          class="iconfont icon-a-zu19815"
                        ></i>
                        <i v-if="node.isLeaf" class="iconfont icon-yonghu"></i
                        >{{ node.label }}
                      </span>
                    </el-tree>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="排序" prop="sort">
                <el-input
                  placeholder="排序"
                  clearable
                  v-model="form.sort"
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
  name: "subCategoryEditDialog",

  data() {
    return {
      icon: "icon-bianji",
      title: "",
      openEdit: false,
      width: "260px",
      width2: "91%",
      size: "small",
      sssjList: [
        {
          id: 30072,
          fid: 0,
          step_name: "厂级",
          service_name: "风险研判",
          sort: 1,
          approval_person: '[{"id":"50636","name":"李剑","sort":1}]',
          children: [
            {
              id: 80075,
              fid: 30072,
              step_name: "101车间",
              service_name: "风险研判",
              children: [
                {
                  id: 80076,
                  fid: 80075,
                  step_name: "班组3",
                  service_name: "风险研判",
                  approval_person: '[{"id":"10299","name":"中安01","sort":1}]',
                },
              ],
            },
            {
              id: 60073,
              fid: 30072,
              step_name: "102车间",
              service_name: "风险研判",
              approval_person: '[{"id":"50639","name":"李忠强","sort":1}]',
              children: [
                {
                  id: 70075,
                  fid: 60073,
                  step_name: "班组2",
                  service_name: "风险研判",
                },
                {
                  id: 60074,
                  fid: 60073,
                  step_name: "班组1",
                  service_name: "风险研判",
                  approval_person:
                    '[{"id":"50638","name":"刘成勇","sort":1},{"id":"37633","name":"袁中军","sort":2}]',
                },
              ],
            },
          ],
        },
        {
          id: 20072,
          fid: 0,
          step_name: "1",
          service_name: "法律法规",
          approval_person: '[{"id":"15446","name":"中安联科12","sort":1}]',
        },
      ],
      deptList: [
        {
          deptid: "1000",
          deptname: "中安",
          children: [
            {
              deptid: "1100",
              deptname: "研发部",
            },
            {
              deptid: "1200",
              deptname: "项目部",
            },
          ],
        },
      ],
      props: {
        children: "children",
        label: "step_name",
      },
      deptProps: {
        children: "children",
        label: "deptname",
      },
      form: {
        bzmc: "",
        sssjid: "",
        sssjname: "",
        deptid: "",
        deptname: "",
        sort: "",
      },
      rules: {},
      row: {},
    };
  },

  created() {},

  methods: {
    // 打开
    open(row) {
      this.title = "添加业务审批架构信息";
      this.openEdit = true;
      if (row && row.id) {
        this.title = "业务审批架构信息";
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

    // 所属上级选择
    handleNodeClick(data, node) {
      console.log(data, "data");
      this.form.sssjid = data.id;
      this.form.sssjname = data.step_name;
    },

    //
    handleDeptNodeClick(data) {
      console.log(data, "data");
      this.form.deptname = data.deptname;
      this.form.deptid = data.deptid;
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
