<template>
  <div class="choosePersonDialog">
    <basicDialog
      :openFlag="openEdit"
      height="38%"
      icon="icon-bianji"
      title="评估设置"
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
                  <el-input ref="sum" v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="B : 排查隐患发现率权重分值">
                  <el-input ref="sum1" v-model="form.name1"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="C : 隐患逾期整改率权重分值">
                  <el-input ref="sum2" v-model="form.name2"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="D : 隐患整改率权重分值">
                  <el-input ref="sum3" v-model="form.name3"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="优秀">
                  <el-input
                    v-model="form.name5"
                    style="width: 100px"
                  ></el-input>
                  <span style="padding: 0 10px">-</span>
                  <el-input
                    v-model="form.name5"
                    style="width: 100px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="良好">
                  <el-input
                    v-model="form.name5"
                    style="width: 100px"
                  ></el-input>
                  <span style="padding: 0 10px">-</span>
                  <el-input
                    v-model="form.name5"
                    style="width: 100px"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="合格">
                  <el-input
                    v-model="form.name7"
                    style="width: 100px"
                  ></el-input>
                  <span style="padding: 0 10px">-</span>
                  <el-input
                    v-model="form.name7"
                    style="width: 100px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="不合格">
                  <el-input
                    v-model="form.name7"
                    style="width: 100px"
                  ></el-input>
                  <span style="padding: 0 10px">-</span>
                  <el-input
                    v-model="form.name7"
                    style="width: 100px"
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
        name: "11",
        name1: "17",
        name2: "31",
        name3: "41",
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
    },
    refresh() {
      this.reload = false;
      this.$nextTick(() => (this.reload = true));
    },
    async submit() {
      const sum = Number(this.$refs.sum.value);
      const sum1 = Number(this.$refs.sum1.value);
      const sum2 = Number(this.$refs.sum2.value);
      const sum3 = Number(this.$refs.sum3.value);

      const sumToatl = sum + sum1 + sum2 + sum3;
      console.log(sumToatl, "jk");
      if (sumToatl < 100 || sumToatl > 100) {
        this.$message.error("A B C D总和必须等于100");
        return;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
// .content {
//   width: 100%;
//   height: 100%;
//   background: #eee;
// }
</style>
