<template>
  <basic-dialog
    :title="title"
    :icon="icon"
    :width="1013"
    :height="'80%'"
    v-bind="$attrs"
    @close="openFlag = false"
    :openFlag="openFlag"
    show-zoom
    resize
  >
    <template #content>
      <div class="wrap">
        <el-form ref="form" :model="form" label-width="108px" :rules="rules">
          <el-form-item label="员工姓名" prop="trainingRecords.personId">
            <el-select
              v-model="form.trainingRecords.personId"
              placeholder="请选择员工"
              :style="width"
              :disabled="disabled"
            >
              <el-option
                :label="item.nickName"
                :value="item.id"
                v-for="item in userList"
                :key="item.id"
                >{{ item.nickName }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="培训级别" prop="trainingRecords.trainLevel">
            <el-checkbox-group
              v-model="form.trainingRecords.trainLevel"
              :style="width"
              :disabled="disabled"
              @change="changeData"
            >
              <el-checkbox
                label="EDUCATION_SET_COURSE_TRAINLEVEL:ONE"
                key="EDUCATION_SET_COURSE_TRAINLEVEL:ONE"
                value="EDUCATION_SET_COURSE_TRAINLEVEL:ONE"
                >公司级</el-checkbox
              >
              <el-checkbox
                label="EDUCATION_SET_COURSE_TRAINLEVEL:TWO"
                key="EDUCATION_SET_COURSE_TRAINLEVEL:TWO"
                value="EDUCATION_SET_COURSE_TRAINLEVEL:TWO"
                >部门级</el-checkbox
              >
              <el-checkbox
                label="EDUCATION_SET_COURSE_TRAINLEVEL:THREE"
                key="EDUCATION_SET_COURSE_TRAINLEVEL:THREE"
                value="EDUCATION_SET_COURSE_TRAINLEVEL:THREE"
                >班组级</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <div
            v-if="
              form.trainingRecords.trainLevel.indexOf(
                'EDUCATION_SET_COURSE_TRAINLEVEL:ONE'
              ) != -1
            "
          >
            <div class="title">厂级教育</div>
            <el-row>
              <el-col :span="12"> </el-col>
              <el-col :span="12"> </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="厂级培训人">
                  <el-input
                    v-model="form.companyLevel.trainPerson"
                    :style="width"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="课程名称" prop="companyLevel.courseName">
                  <el-input
                    v-model="form.companyLevel.courseName"
                    :style="width"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="培训开始时间">
                  <el-date-picker
                    v-model="form.companyLevel.trainingStartTime"
                    type="date"
                    placeholder="选择日期"
                    :style="width"
                    :disabled="disabled"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="培训结束时间"
                  prop="companyLevel.trainingEndTime"
                >
                  <el-date-picker
                    v-model="form.companyLevel.trainingEndTime"
                    type="date"
                    placeholder="选择日期"
                    :style="width"
                    :disabled="disabled"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="培训内容">
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入培训内容"
                    v-model="form.companyLevel.trainingContent"
                    :style="width2"
                    :disabled="disabled"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="考试成绩">
                  <el-input
                    v-model="form.companyLevel.achievement"
                    :style="width"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否合格">
                  <el-radio-group
                    v-model="form.companyLevel.isQualified"
                    :style="width"
                    :disabled="disabled"
                  >
                    <el-radio :label="1" key="1" value="1">合格</el-radio>
                    <el-radio :label="0" key="0" value="0">不合格</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="上传课件" :style="width2">
                  <render-upload
                    :fileList="form.companyLevel.enclosure"
                    @uploadSuccess="
                      (fileList) =>
                        onSuccess(fileList, 'enclosure', 'companyLevel')
                    "
                    @handleRemove="
                      (index) => onRemove(index, 'enclosure', 'companyLevel')
                    "
                    :openOff="disabled"
                  ></render-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div
            v-if="
              form.trainingRecords.trainLevel.indexOf(
                'EDUCATION_SET_COURSE_TRAINLEVEL:TWO'
              ) != -1
            "
          >
            <div class="title">车间教育</div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="车间培训人">
                  <el-input
                    v-model="form.workshopLevel.trainPerson"
                    :style="width"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="课程名称" prop="workshopLevel.courseName">
                  <el-input
                    v-model="form.workshopLevel.courseName"
                    :style="width"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="培训开始时间">
                  <el-date-picker
                    v-model="form.workshopLevel.trainingStartTime"
                    type="date"
                    placeholder="选择日期"
                    :style="width"
                    :disabled="disabled"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="培训结束时间"
                  prop="workshopLevel.trainingEndTime"
                >
                  <el-date-picker
                    v-model="form.workshopLevel.trainingEndTime"
                    type="date"
                    placeholder="选择日期"
                    :style="width"
                    :disabled="disabled"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="培训内容">
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入培训内容"
                    v-model="form.workshopLevel.trainingContent"
                    style="width: 840px"
                    :disabled="disabled"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="考试成绩">
                  <el-input
                    v-model="form.workshopLevel.achievement"
                    :style="width"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否合格">
                  <el-radio-group
                    v-model="form.workshopLevel.isQualified"
                    :style="width"
                    :disabled="disabled"
                  >
                    <el-radio :label="1" key="1" value="1">合格</el-radio>
                    <el-radio :label="0" key="0" value="0">不合格</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="上传课件" :style="width2">
                  <render-upload
                    :fileList="form.workshopLevel.enclosure"
                    @uploadSuccess="
                      (fileList) =>
                        onSuccess(fileList, 'enclosure', 'workshopLevel')
                    "
                    @handleRemove="
                      (index) => onRemove(index, 'enclosure', 'workshopLevel')
                    "
                    :openOff="disabled"
                  ></render-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div
            v-if="
              form.trainingRecords.trainLevel.indexOf(
                'EDUCATION_SET_COURSE_TRAINLEVEL:THREE'
              ) != -1
            "
          >
            <div class="title">班组教育</div>
            <el-row>
              <el-col :span="12"> </el-col>
              <el-col :span="12"> </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="班组级培训人">
                  <el-input
                    v-model="form.teamLevel.trainPerson"
                    :style="width"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="课程名称" prop="teamLevel.courseName">
                  <el-input
                    v-model="form.teamLevel.courseName"
                    :style="width"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="培训开始时间">
                  <el-date-picker
                    v-model="form.teamLevel.trainingStartTime"
                    type="date"
                    placeholder="选择日期"
                    :style="width"
                    :disabled="disabled"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="培训结束时间"
                  prop="teamLevel.trainingEndTime"
                >
                  <el-date-picker
                    v-model="form.teamLevel.trainingEndTime"
                    type="date"
                    placeholder="选择日期"
                    :style="width"
                    :disabled="disabled"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="培训内容">
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入培训内容"
                    v-model="form.teamLevel.trainingContent"
                    style="width: 840px"
                    :disabled="disabled"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12"> </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="考试成绩">
                  <el-input
                    v-model="form.teamLevel.achievement"
                    :style="width"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否合格">
                  <el-radio-group
                    v-model="form.teamLevel.isQualified"
                    :style="width"
                    :disabled="disabled"
                  >
                    <el-radio :label="1" key="1" value="1">合格</el-radio>
                    <el-radio :label="0" key="0" value="0">不合格</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="上传课件" :style="width2">
                  <render-upload
                    :fileList="form.teamLevel.enclosure"
                    @uploadSuccess="
                      (fileList) =>
                        onSuccess(fileList, 'enclosure', 'teamLevel')
                    "
                    @handleRemove="
                      (index) => onRemove(index, 'enclosure', 'teamLevel')
                    "
                    :openOff="disabled"
                  ></render-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
    </template>
    <template #bottom>
      <div>
        <el-button type="primary" @click="submitForm()" v-if="!disabled"
          >保存
        </el-button>
        <el-button type="success" @click="reset()" v-if="!disabled"
          >重置
        </el-button>
        <el-button type="warning" @click="close">取消</el-button>
      </div>
    </template>
  </basic-dialog>
</template>
<script>
import {
  createAPI,
  viewAPI,
  updateAPI,
} from "@/api/education/threeLevel/trainingRecords";
export default {
  data() {
    return {
      disabled: false,
      openFlag: false,
      editId: "",
      width2: "width:830px",
      width: "width:350px",
      icon: "",
      title: "",
      form: {
        trainingRecords: {
          personId: "",
          trainLevel: ["EDUCATION_SET_COURSE_TRAINLEVEL:ONE"],
        },
        companyLevel: {
          trainPerson: "", //培训人
          courseName: "", //课程名称
          trainingStartTime: "", //开始时间
          trainingEndTime: "", //结束时间
          trainingContent: "", //培训内容
          achievement: "", //成绩
          enclosure: [], //附件
          isQualified: "", //是否合格0 不合格， 1合格
        },
        workshopLevel: {
          trainPerson: "", //培训人
          courseName: "", //课程名称
          trainingStartTime: "", //开始时间
          trainingEndTime: "", //结束时间
          trainingContent: "", //培训内容
          achievement: "", //成绩
          enclosure: [], //附件
          isQualified: "", //是否合格0 不合格， 1合格
        },
        teamLevel: {
          trainPerson: "", //培训人
          courseName: "", //课程名称
          trainingStartTime: "", //开始时间
          trainingEndTime: "", //结束时间
          trainingContent: "", //培训内容
          achievement: "", //成绩
          enclosure: [], //附件
          isQualified: "", //是否合格0 不合格， 1合格
        },
      },
      rules: {
        "trainingRecords.personId": [
          { required: true, message: "请选择员工姓名", trigger: "change" },
        ],
        "companyLevel.courseName": [
          { required: true, message: "请输入课程名称", trigger: "blur" },
        ],
        "companyLevel.trainingEndTime": [
          { required: true, message: "请选择培训结束时间", trigger: "change" },
        ],
      },
    };
  },
  props: ["userList"],
  mounted() {},
  methods: {
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增培训记录";
        this.disabled = false;
      } else if (type == "bianji") {
        this.getDetail(row.id);
        this.editId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑培训记录";
        this.disabled = false;
      } else if (type == "chakan") {
        this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看培训记录";
        this.disabled = true;
      }
      this.openFlag = true;
    },
    // 上传课件成功
    onSuccess(fileList, params, type) {
      this.form[type][params].push(fileList);
    },
    // 删除课件
    onRemove(index, params, type) {
      this.form[type][params].splice(index, 1);
    },
    submitForm() {
      console.log(this.form);
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false;
        } else {
          if (this.editId) {
            this.form.trainingRecords.id = this.editId;
            this.form.trainingRecords.trainLevel =
              this.form.trainingRecords.trainLevel.join(",");
            let params = {
              ...this.form,
            };
            updateAPI(params).then((res) => {
              this.$message.success("编辑成功");
              this.close();
              this.$emit("refresh");
            });
          } else {
            this.form.trainingRecords.trainLevel =
              this.form.trainingRecords.trainLevel.join(",");
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
    getDetail(id) {
      let params = {
        id: id,
      };
      viewAPI(params).then((res) => {
        console.log(res.data);
        this.form = { ...res.data };
        this.form.trainingRecords.trainLevel =
          this.form.trainingRecords.trainLevel.split(",");
        console.log(this.form);
      });
    },
    reset() {
      this.disabled = false;
      this.editId = "";
      this.form = {
        trainingRecords: {
          personId: "",
          trainLevel: "",
        },
        companyLevel: {
          trainPerson: "", //培训人
          courseName: "", //课程名称
          trainingStartTime: "", //开始时间
          trainingEndTime: "", //结束时间
          trainingContent: "", //培训内容
          achievement: "", //成绩
          enclosure: [], //附件
          isQualified: "", //是否合格0 不合格， 1合格
        },
        workshopLevel: {
          trainPerson: "", //培训人
          courseName: "", //课程名称
          trainingStartTime: "", //开始时间
          trainingEndTime: "", //结束时间
          trainingContent: "", //培训内容
          achievement: "", //成绩
          enclosure: [], //附件
          isQualified: "", //是否合格0 不合格， 1合格
        },
        teamLevel: {
          trainPerson: "", //培训人
          courseName: "", //课程名称
          trainingStartTime: "", //开始时间
          trainingEndTime: "", //结束时间
          trainingContent: "", //培训内容
          achievement: "", //成绩
          enclosure: [], //附件
          isQualified: "", //是否合格0 不合格， 1合格
        },
      };
      this.$refs.form.resetFields();
    },
    close() {
      this.reset();
      this.openFlag = false;
    },
    changeData(data) {
      if (data.indexOf("EDUCATION_SET_COURSE_TRAINLEVEL:ONE") == -1) {
        this.rules["companyLevel.courseName"] = [];
        this.rules["companyLevel.trainingEndTime"] = [];
      } else {
        this.rules["companyLevel.courseName"] = [
          { required: true, message: "请输入课程名称", trigger: "blur" },
        ];
        this.rules["companyLevel.trainingEndTime"] = [
          { required: true, message: "请选择培训结束时间", trigger: "change" },
        ];
      }
      if (data.indexOf("EDUCATION_SET_COURSE_TRAINLEVEL:TWO") == -1) {
        this.rules["workshopLevel.courseName"] = [];
        this.rules["workshopLevel.trainingEndTime"] = [];
      } else {
        this.rules["workshopLevel.courseName"] = [
          { required: true, message: "请输入课程名称", trigger: "blur" },
        ];
        this.rules["workshopLevel.trainingEndTime"] = [
          { required: true, message: "请选择培训结束时间", trigger: "change" },
        ];
      }
      if (data.indexOf("EDUCATION_SET_COURSE_TRAINLEVEL:THREE") == -1) {
        this.rules["teamLevel.courseName"] = [];
        this.rules["teamLevel.trainingEndTime"] = [];
      } else {
        this.rules["teamLevel.courseName"] = [
          { required: true, message: "请输入课程名称", trigger: "blur" },
        ];
        this.rules["teamLevel.trainingEndTime"] = [
          { required: true, message: "请选择培训结束时间", trigger: "change" },
        ];
      }
      console.log(this.rules);
    },
  },
};
</script>
<style scoped lang="scss">
/deep/ .el-form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
/deep/ .vxe-modal--content {
  background: #eeeeee;
}
.wrap {
  padding: 20px;
  background: white;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.title {
  width: 100%;
  border-bottom: 1px solid #4a80fc;
  height: 30px;
  margin: 0px auto;
  line-height: 30px;
  white-space: normal;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 22px;
}
</style>
