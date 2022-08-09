<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1000px"
      height="70%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
    >
      <template #content>
        <el-form
          :inline="true"
          ref="basicFormRef"
          :model="form"
          :label-width="labelWidth"
          :rules="rules"
          :disabled="isDisabled"
        >
          <el-form-item
            label="人员类别"
            :label-width="labelWidth"
            prop="courseId"
          >
            <el-select
              v-model="personnelCategory"
              placeholder="请选择人员类别"
              :style="width"
              :disabled="disabled"
              @change="selectChange"
            >
              <el-option
                v-for="item in courseList"
                :label="item.courseName"
                :key="item.id"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="评估项"
            :label-width="labelWidth"
            prop="courseId"
          >
            <el-input
              v-model="evaluationItem"
              placeholder="请输入评估项"
              :style="width2"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="评估等级"
            :label-width="labelWidth"
            prop="courseId"
          >
            <el-input
              v-model="form1.level"
              placeholder="请输入评估等级"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="分值" :label-width="labelWidth" prop="courseId">
            <el-input
              v-model="form1.score"
              placeholder="请输入分值"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="评估等级"
            :label-width="labelWidth"
            prop="courseId"
          >
            <el-input
              v-model="form2.level"
              placeholder="请输入评估等级"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="分值" :label-width="labelWidth" prop="courseId">
            <el-input
              v-model="form2.score"
              placeholder="请输入分值"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="评估等级"
            :label-width="labelWidth"
            prop="courseId"
          >
            <el-input
              v-model="form3.level"
              placeholder="请输入评估等级"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="分值" :label-width="labelWidth" prop="courseId">
            <el-input
              v-model="form3.score"
              placeholder="请输入分值"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="评估等级"
            :label-width="labelWidth"
            prop="courseId"
          >
            <el-input
              v-model="form4.level"
              placeholder="请输入评估等级"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="分值" :label-width="labelWidth" prop="courseId">
            <el-input
              v-model="form4.score"
              placeholder="请输入分值"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center; margin-bottom: 10px">
          <el-button type="primary" @click="add">添加</el-button>
          <el-button type="danger" @click="clear">清除</el-button>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          header-row-class-name="headerName"
        >
          <el-table-column
            label="序号"
            type="index"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column label="评估项" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.evaluationItem }}</span>
            </template>
          </el-table-column>
          <el-table-column label="评估等级" width="400px" align="center">
            <template slot-scope="scope">
              <div
                style="display: inline-block; margin: 0 10px"
                v-for="item in scope.row.level"
                :key="item.level"
              >
                {{ item.level }}：{{ item.score }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm()" v-show="!isDisabled"
            >保存
          </el-button>
          <el-button type="success" @click="reset()" v-show="!isDisabled"
            >重置
          </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
export default {
  name: "editDialog",
  mixins: [tableMixins],
  props: {
    dict: Object,
    default: {},
  },
  data() {
    return {
      tableH: {
        height: 200,
      },
      labelWidth: "108px",
      width: "width:320px",
      width2: "width:820px",
      courseList: [],
      title: "",
      icon: "",
      openFlag: true,
      isDisabled: false,
      editId: "",
      form1: {},
      form2: {},
      form3: {},
      form4: {},
      personnelCategory: "", //人员类别
      evaluationItem: "", //评估项

      rules: {
        // courseId: [
        //   { required: true, message: "请选择课程名称", trigger: "change" },
        // ],
        // stem: [{ required: true, message: "请输入题干", trigger: "blur" }],
      },
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center",
        },
        {
          field: "evaluationItem",
          title: "评估项",
          align: "center",
        },
        {
          field: "level",
          title: "评估等级",
          align: "center",
          render: (h, { row, column, $index }) => {
            console.log(row);
            return (
              <div>
                {row.level[0].level}:{row.level[0].score}
                {row.level[1].level}:{row.level[1].score}
                {row.level[2].level}:{row.level[2].score}
                {row.level[3].level}:{row.level[3].score}
              </div>
            );
          },
        },
      ],
      tableData: [],
    };
  },
  mounted() {},
  methods: {
    // 打开
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增培训设置";
        this.isDisabled = false;
      } else if (type == "bianji") {
        // this.getDetail(row.id);
        this.editId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑培训设置";
        this.isDisabled = false;
      } else if (type == "chakan") {
        // this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看培训设置";
        this.isDisabled = true;
      }
      this.openFlag = true;
    },
    // 关闭
    close() {
      this.openFlag = false;
      this.editId = "";
      this.isDisabled = "";
      this.reset();
    },
    // 重置
    reset() {
      this.tableData = [];
    },
    // 保存
    async submitForm() {
      if (this.form.topicType == "EDUCATION_SET_QUESTION_TYPE:TWO") {
        if (this.multipleAnswer.length <= 0) {
          this.$message.warning("请设置正确答案");
        }
        this.form.answer = this.multipleAnswer.join("");
      }
      this.$refs.basicFormRef.validate((valid) => {
        if (!valid) {
          return false;
        } else {
          if (this.editId) {
            let params = {
              id: this.editId,
              ...this.form,
            };
            updateAPI(params).then((res) => {
              this.$message.success("编辑成功");
              this.close();
              this.$emit("refresh");
            });
          } else {
            let params = {
              ...this.form,
            };
            createAPI(params).then((res) => {
              this.$message.success("新增成功");
              this.close();
              this.$emit("refresh");
            });
          }
        }
      });
    },
    selectChange(data) {
      console.log(data);
      this.courseList.map((item) => {
        if (item.id === data) {
          this.form.courseName = item.courseName;
        }
      });
    },
    add() {
      // console.log(this.form["level1"]);
      let arr = [
        {
          level: this.form1.level,
          score: this.form1.score,
        },
        {
          level: this.form2.level,
          score: this.form2.score,
        },
        {
          level: this.form3.level,
          score: this.form3.score,
        },
        {
          level: this.form4.level,
          score: this.form4.score,
        },
      ];
      let obj = {
        evaluationItem: this.evaluationItem,
        level: arr,
      };
      this.tableData.push(obj);
      console.log(this.tableData);
    },
    clear() {
      this.form1 = {};
      this.form2 = {};
      this.form3 = {};
      this.form4 = {};
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
/deep/ .el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 22px !important;
}

/deep/ .el-form-item__label-wrap label {
  line-height: 20px;
  // white-space: nowrap;
}

/deep/ .vxe-modal--wrapper .vxe-modal--content {
  padding: 20px 30px;
}
/deep/.el-checkbox {
  padding-top: 10px;
}
/deep/.headerName th {
  background: #d0e0ff !important;
  color: #333333 !important;
}
</style>
