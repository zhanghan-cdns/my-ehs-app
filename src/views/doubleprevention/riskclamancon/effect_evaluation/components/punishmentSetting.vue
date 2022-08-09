<template>
  <div class="choosePersonDialog">
    <basicDialog
      icon="icon-bianji"
      title="惩罚"
      width="60%"
      height="68%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <div class="content">
          <el-form
            :model="form"
            label-width="150px"
            class="demo-ruleForm"
            ref="ruleForm"
            :rules="formRules"
          >
            <el-row>
              <el-col span="12">
                <el-form-item label="被惩罚人" prop="correctTheTitle">
                  <el-input
                    style="width: 240px"
                    clearable
                    v-model="form.correctTheTitle"
                    placeholder="请输入被惩罚人"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item
                  label="惩罚金额（元）"
                  prop="correctionOrderNumber"
                >
                  <el-input
                    style="width: 240px"
                    clearable
                    disabled
                    v-model="form.correctionOrderNumber"
                    placeholder="请输入惩罚金额（元）"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item
                  label="惩罚时间"
                  prop="hazardDiscoveryTime"
                  class="is-required"
                >
                  <el-date-picker
                    style="width: 240px"
                    v-model="form.hazardDiscoveryTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    placeholder="请选择惩罚时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="惩罚内容" prop="rectificationOpinion">
                  <el-input
                    style="width: 660px"
                    clearable
                    type="textarea"
                    :rows="3"
                    v-model="form.rectificationOpinion"
                    placeholder="请输入惩罚内容"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="惩罚依据" prop="causeAnalysis">
                  <el-input
                    style="width: 660px"
                    clearable
                    type="textarea"
                    :rows="3"
                    v-model="form.causeAnalysis"
                    placeholder="请输入惩罚依据"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="备注" prop="controlMeasures">
                  <el-input
                    style="width: 660px"
                    clearable
                    type="textarea"
                    :rows="3"
                    v-model="form.controlMeasures"
                    placeholder="请输入备注"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basicDialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      openEdit: false,
      tabs: [
        {
          isShow: true,
          title: "隐患信息",
          refName: "setOneRef",
        },
        {
          isShow: true,
          title: "隐患审核",
          refName: "setTwoRef",
        },
        {
          isShow: true,
          title: "隐患整改",
          refName: "setThreeRef",
        },
        {
          isShow: true,
          title: "隐患复查",
          refName: "setThreeRef",
        },
        {
          isShow: true,
          title: "隐患验收",
          refName: "setThreeRef",
        },
      ],
      form: {
        id: "",
      },
      formRules: {
        hazardDiscoveryTime: [
          { required: true, message: "请选择隐患发现时间", trigger: "blur" },
        ],
      },
    };
  },
  created() {},

  methods: {
    close() {
      this.openEdit = false;
    },
    open(row) {
      this.openEdit = true;
    },
    refresh() {
      this.reload = false;
      this.$nextTick(() => (this.reload = true));
    },
  },
};
</script>

<style scoped lang='scss'>
</style>