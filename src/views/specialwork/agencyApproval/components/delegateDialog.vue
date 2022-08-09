<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="880"
      height="35%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form
          label-width="147px"
          label-position="right"
          :model="form"
          :rules="rules"
          ref="formRef"
        >
          <el-row>
            <el-col span="24">
              <el-form-item label="办理人" prop="processors">
                <el-select
                  v-model="form.processors"
                  placeholder="请选择办理人"
                  clearable
                  :style="`width:${width}`"
                >
                  <el-option
                    v-for="item in processorsList"
                    :label="item.dictValueName"
                    :key="item.id"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="委派人" prop="assignee">
                <el-select
                  v-model="form.assignee"
                  placeholder="请选择委派人"
                  clearable
                  :style="`width:${width}`"
                >
                  <el-option
                    v-for="item in assigneeList"
                    :label="item.dictValueName"
                    :key="item.id"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <div>
            <el-button type="primary" @click="submitForm">保存 </el-button>
            <el-button type="success" @click="reset">重置 </el-button>
            <el-button type="warning" @click="close">取消</el-button>
          </div>
        </div>
      </template>
    </basic-dialog>
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
      icon: "icon-xinzeng",
      title: "委派信息",
      openEdit: false,
      width: "86%",
      form: {},
      rules: {
        processors: [
          { required: true, message: "请选择办理人", trigger: "change" },
        ],
        assignee: [
          { required: true, message: "请选择委派人", trigger: "change" },
        ],
      },
      processorsList: [],
      assigneeList: [],
    };
  },

  methods: {
    open() {
      this.openEdit = true;
    },

    close() {
      this.openEdit = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
