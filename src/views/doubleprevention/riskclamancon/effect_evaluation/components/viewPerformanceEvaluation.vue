<template>
  <div class="choosePersonDialog">
    <basicDialog
      :openFlag="openEdit"
      height="70%"
      icon="icon-bianji"
      title="查看效果评估"
      v-bind="$attrs"
      width="1000px"
      @close="close"
    >
      <template #content>
        <div class="content">
          <el-form ref="form" :model="form" label-width="200px" size="mini">
            <el-row>
              <el-col :span="12">
                <el-form-item label="A : 任务排查完成率权重分值">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="B : 排查隐患发现率权重分值">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="C : 隐患逾期整改率权重分值">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="D : 隐患整改率权重分值">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="总得分">
                  <el-input v-model="form.sum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="效果评估">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div
              style="
                display: flex;
                justify-content: center;
                height: 300px;
                margin-top: 40px;
              "
            >
              <evaluation-form :gridData="gridData"></evaluation-form>
            </div>
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
import {gridData} from './config'
import evaluationForm from "@views/doubleprevention/riskclamancon/riskanalysisevents/components/evaluationForm";

export default {
  components: {evaluationForm},
  data() {
    return {
      openEdit: false,
      gridData,
      form: {
        id: "",
        sum: 97,
      },
      formRules: {
        hazardDiscoveryTime: [
          {required: true, message: "请选择隐患发现时间", trigger: "blur"},
        ],
      },
    };
  },
  created() {
  },

  methods: {
    close() {
      this.openEdit = false;
    },
    open(row) {
      this.openEdit = true;
      if (row) {
      }
    },
    refresh() {
      this.reload = false;
      this.$nextTick(() => (this.reload = true));
    },
    // 保存
    submit(){

    }
  },
};
</script>

<style lang="scss" scoped>
.table-c {
  border-right: 1px solid #eeee;
  border-bottom: 1px solid #eeee;
  height: 25px;
  text-align: center;
  color: #161616;
}

.table-c td {
  border-left: 1px solid #eeee;
  border-top: 1px solid #eeee;
  height: 25px;
  text-align: center;
  color: #161616;
}
</style>
