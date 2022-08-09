<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="1000px"
      height="80%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openFlag"
    >
      <template #content>
        <el-form
          :inline="true"
          ref="basicFormRef"
          :model="form"
          label-width="108px"
          :rules="rules"
          :disabled="isDisabled"
        >
          <el-form-item label="培训计划名称" prop="planName">
            <el-input
              v-model="form.planName"
              placeholder="请输入培训计划名称"
              style="width: 816px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="实施日期" prop="applianceDate">
            <el-date-picker
              v-model="form.applianceDate"
              type="date"
              placeholder="请选择实施日期"
              style="width: 320px"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="计划完成日期" prop="planCompleteDate">
            <el-date-picker
              v-model="form.planCompleteDate"
              type="date"
              placeholder="请选择计划完成日期"
              style="width: 320px"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="计划年度">
            <el-date-picker
              v-model="form.planYear"
              type="year"
              placeholder="请选择计划年度"
              style="width: 320px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="编制人" prop="madePerson.personName">
            <el-autocomplete
              class="inline-input"
              v-model="form.madePerson.personName"
              :fetch-suggestions="querySearch"
              placeholder="请输入编制人"
              style="width: 320px"
              :disabled="disabled"
              @select="selectChange($event, 'madePerson')"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="组织部门" prop="orgDeptInfo">
            <el-cascader
              v-model="form.orgDeptInfo.deptId"
              :options="depList"
              :props="optionProps"
              :show-all-levels="false"
              @change="depChange($event, 'orgDeptInfo')"
              style="width: 320px"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="培训部门" prop="trainDeptInfo.deptId">
            <el-cascader
              v-model="form.trainDeptInfo.deptId"
              :options="depList"
              :props="optionProps"
              :show-all-levels="false"
              @change="depChange($event, 'trainDeptInfo')"
              style="width: 320px"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="考核部门" prop="checkDeptInfo.deptId">
            <el-cascader
              v-model="form.checkDeptInfo.deptId"
              :options="depList"
              :props="optionProps"
              :show-all-levels="false"
              @change="depChange($event, 'checkDeptInfo')"
              style="width: 320px"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="培训课程" prop="courseInfo.courseId">
            <el-select
              v-model="form.courseInfo.courseId"
              placeholder="请选择培训课程"
              style="width: 320px"
              :disabled="disabled"
              @change="selectChange($event, 'courseInfo')"
            >
              <el-option
                v-for="item in courseList"
                :label="item.courseName"
                :key="item.id"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="培训人员" prop="trainCategory">
            <div class="personBox">
              <div class="personItem">
                <div
                  class="item"
                  v-for="(item, index) in form.trainPersons"
                  :key="item.id"
                  @click="delPerson(index)"
                >
                  {{ item.personName }}
                  <i
                    class="iconfont icon-caozuo--shanchu"
                    style="color: #000; font-size: 12px"
                  ></i>
                </div>
              </div>
              <el-button
                type="primary"
                style="margin-left: 16px"
                @click="chosePerson"
                >选择人员</el-button
              >
            </div>
            <!-- <el-select
              v-model="form.trainPersons.personId"
              placeholder="请选择培训人员"
              style="width: 700px"
              @change="selectChange($event, 'trainPersons')"
            >
              <el-option
                v-for="item in userList"
                :label="item.nickName"
                :key="item.id"
                :value="item.id"
              ></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="培训学时(45m)" prop="trainHorse">
            <el-input
              v-model="form.trainHorse"
              placeholder="请输入培训学时"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="培训类别" prop="trainCategory">
            <el-select
              v-model="form.trainCategory"
              placeholder="请选择培训类别"
              style="width: 320px"
            >
              <el-option
                v-for="item in dict.educationDailyTrainCategory"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="培训费用（元）" prop="trainCost">
            <el-input
              v-model="form.trainCost"
              placeholder="请输入培训费用"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="培训类型" prop="trainType">
            <el-select
              v-model="form.trainType"
              placeholder="请选择培训类型"
              style="width: 320px"
            >
              <el-option
                v-for="item in dict.educationDailyTrainType"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="培训讲师" prop="trainLecturer.personName">
            <!-- <el-autocomplete
              class="inline-input"
              v-model="form.trainLecturer.personName"
              :fetch-suggestions="querySearch"
              placeholder="请输入培训讲师"
              style="width: 320px"
              :disabled="disabled"
              @select="selectChange($event, 'trainLecturer')"
            ></el-autocomplete> -->
            <el-select
              v-model="form.trainLecturer.personId"
              placeholder="请选择培训讲师"
              style="width: 320px"
              @change="selectChange($event, 'trainLecturer')"
            >
              <el-option
                v-for="item in lecturerList"
                :label="item.lecturerName"
                :key="item.id"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="培训地点" prop="trainPlace">
            <el-input
              v-model="form.trainPlace"
              placeholder="请输入培训地点"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="培训内容" prop="trainContext">
            <el-input
              v-model="form.trainContext"
              placeholder="请输入培训内容"
              style="width: 816px"
              type="textarea"
              :disabled="disabled"
              resize="none"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="form.remark"
              placeholder="请输入备注"
              style="width: 816px"
              type="textarea"
              :disabled="disabled"
              resize="none"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传课件" style="width: 816px">
            <render-upload
              :fileList="form.trainCertificate"
              @uploadSuccess="
                (fileList) => onSuccess(fileList, 'trainCertificate')
              "
              @handleRemove="(index) => onRemove(index, 'trainCertificate')"
              :openOff="isDisabled"
            ></render-upload>
          </el-form-item>
        </el-form>
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
    <chose-person ref="chosePersonRef"></chose-person>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import {
  createAPI,
  getDetailAPI,
  updateAPI,
} from "@/api/education/dailyTraining/trainingPlan/safetyTrainingPlan";
import { getCourseListAllAPI } from "@/api/education/trainingSettings/courseManagement";
import { getListAPI } from "@/api/education/trainingSettings/instructorManagement";
import { depListAPI } from "@/api/enterprise/department/department";
import chosePerson from "./chosePerson.vue";
export default {
  name: "editDialog",
  components: { chosePerson },
  mixins: [tableMixins],
  props: ["dict", "userList"],
  data() {
    return {
      isDisabled: false,
      title: "新增培训计划信息",
      icon: "icon-fujiaxinxi",
      openFlag: false,
      courseList: [],
      form: {
        planName: "",
        applianceDate: "",
        planCompleteDate: "",
        planYear: "",
        madePerson: {
          personName: "",
          personId: "",
        },
        orgDeptInfo: {
          deptName: "",
          deptId: "",
        },
        courseInfo: {
          courseId: "",
          courseName: "",
        },
        trainDeptInfo: {
          deptName: "",
          deptId: "",
        },
        trainPersons: [],
        trainHorse: "",
        trainCategory: "",
        isNeedExam: "COMMON_JUDGE:TRUE",
        checkDeptInfo: {
          deptName: "",
          deptId: "",
        },
        trainCost: "",
        trainType: "",
        trainLecturer: {
          personName: "",
          personId: "",
        },
        trainPlace: "",
        trainContext: "",
        trainCertificate: [],
      },
      rules: {
        planName: [
          { required: true, message: "请输入培训计划名称", trigger: "blur" },
        ],
        applianceDate: [
          { required: true, message: "请选择实施日期", trigger: "change" },
        ],
        planCompleteDate: [
          { required: true, message: "请选择计划完成日期", trigger: "change" },
        ],
        planYear: [
          { required: true, message: "请选择计划年度", trigger: "change" },
        ],
        "madePerson.personName": [
          { required: true, message: "请选择编制人", trigger: "change" },
        ],
        // trainDeptInfo.: [
        //   { required: true, message: "请选择组织部门", trigger: "change" },
        // ],
        // planCompleteDate: [
        //   { required: true, message: "请选择计划完成日期", trigger: "change" },
        // ],
      },
      lecturerList: [], // 教师列表
      depList: [], // 部门列表
      optionProps: {
        value: "id",
        label: "deptName",
      },
    };
  },
  mounted() {
    this.getcourseListAll();
    this.getLecturerList();
    this.getDepList();
  },
  methods: {
    // 获取讲师列表
    getLecturerList() {
      let params = {
        "queryParams[pageNum]": 1,
        "queryParams[pageSize]": 1000,
      };
      getListAPI(params).then((res) => {
        if (res.code == 200) {
          this.lecturerList = res.data.content;
        }
      });
    },
    // 获取部门树
    getDepList() {
      depListAPI().then((res) => {
        if (res.code == 200) {
          this.depList = res.data;
        }
      });
    },
    // 获课程列表
    async getcourseListAll() {
      let params = {
        trainCategory: "EDUCATION_SET_TRAININGCATEGORY:ONE",
      };
      const res = await getCourseListAllAPI(params);
      if (res.code === 200) {
        this.courseList = res.data;
      }
    },
    // 获取详情
    async getDetail(id) {
      const res = await getDetailAPI({ id });
      if (res.code === 200) {
        this.form = res.data;
        this.form.trainType = res.data.trainType.key;
        this.form.trainCategory = res.data.trainCategory.key;
        this.form.isNeedExam = res.data.isNeedExam.key;
      }
    },
    // 打开
    open(type, row) {
      if (type === "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增培训计划信息";
        this.isDisabled = false;
      } else if (type === "bianji") {
        this.getDetail(row.id);
        this.editId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑培训计划信息";
        this.isDisabled = false;
      } else if (type === "chakan") {
        this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看培训计划信息";
        this.isDisabled = true;
      }
      this.openFlag = true;
    },
    // 关闭
    close() {
      this.openFlag = false;
      this.form = {
        planName: "",
        applianceDate: "",
        planCompleteDate: "",
        planYear: "",
        madePerson: {
          personName: "",
          personId: "",
        },
        orgDeptInfo: {
          deptName: "",
          deptId: "",
        },
        courseInfo: {
          courseId: "",
          courseName: "",
        },
        trainDeptInfo: {
          deptName: "",
          deptId: "",
        },
        trainPersons: [],
        trainHorse: "",
        trainCategory: "",
        isNeedExam: "COMMON_JUDGE:TRUE",
        checkDeptInfo: {
          deptName: "",
          deptId: "",
        },
        trainCost: "",
        trainType: "",
        trainLecturer: {
          personName: "",
          personId: "",
        },
        trainPlace: "",
        trainContext: "",
        trainCertificate: [],
      };
    },
    // 保存
    async submitForm() {
      this.$refs.basicFormRef.validate((valid) => {
        if (!valid) {
          return false;
        } else {
          if (this.editId) {
            let params = {
              id: this.editId,
              ...this.form,
            };
            updateAPI(params).then(() => {
              this.$message.success("编辑成功");
              this.close();
              this.$emit("refresh");
            });
          } else {
            let params = {
              ...this.form,
            };
            createAPI(params).then(() => {
              this.$message.success("新增成功");
              this.close();
              this.$emit("refresh");
            });
          }
        }
      });
    },
    selectChange(data, type) {
      if (type === "madePerson") {
        // 编制人员
        this.userList.map((item) => {
          if (item.value === data.value) {
            this.form.madePerson.personName = item.nickName;
            this.form.madePerson.personId = item.id;
          }
        });
      } else if (type === "courseInfo") {
        // 培训课程
        this.courseList.map((item) => {
          if (item.id === data) {
            this.form.courseInfo.courseName = item.courseName;
            this.form.courseInfo.courseId = item.id;
          }
        });
      } else if (type === "trainPersons") {
        // 培训人员
        this.userList.map((item) => {
          if (item.value === data.value) {
            this.form.trainPersons.personName = item.nickName;
            this.form.trainPersons.personId = item.id;
          }
        });
      } else if (type === "trainLecturer") {
        // 培训讲师
        this.userList.map((item) => {
          if (item.value === data.value) {
            this.form.trainLecturer.personName = item.nickName;
            this.form.trainLecturer.personId = item.id;
          }
        });
      }
      console.log(this.form);
    },
    // 上传课件成功
    onSuccess(fileList, params) {
      this.form[params].push(fileList);
    },
    // 删除课件
    onRemove(index, params) {
      this.form[params].splice(index, 1);
    },
    querySearch(queryString, cb) {
      var userList = this.userList;
      var results = queryString
        ? userList.filter(this.createFilter(queryString))
        : userList;
      console.log(results, this.userList);
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (userList) => {
        return (
          userList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    chosePerson() {
      this.$refs.chosePersonRef.open();
    },
    // 选中后返回
    choseBack(data) {
      data.forEach((item) => {
        let obj = {
          personName: item.userName,
          personId: item.id,
        };
        this.form.trainPersons.push(obj);
      });
      this.form.trainPersons = this.unique(this.form.trainPersons);
      console.log(this.form.trainPersons);
    },
    // 删除培训人员
    delPerson(index) {
      if (this.isDisabled) {
        return;
      }
      this.form.trainPersons.splice(index, 1);
    },
    // 去重
    unique(arr) {
      let newArr = [];
      if (!Array.isArray(arr)) {
        console.log("type error!");
        return;
      }
      arr = arr.sort((a, b) => {
        return a.personId - b.personId;
      });
      arr.forEach((item, index) => {
        if (index < arr.length - 1) {
          if (arr[index].personId != arr[index + 1].personId) {
            newArr.push(item);
          }
        } else {
          newArr.push(item);
        }
      });
      arr = newArr;
      console.log(111, arr);
      return arr;
    },
    // 部门选择
    depChange(data, type) {
      let id = data[data.length - 1];
      this.form[type].deptName = this.findDepName(this.depList, id);
      this.form[type].deptId = id;
      console.log(this.form);
    },
    findDepName(list, id) {
      let gridAreaName = "";
      for (let i = 0; i < list.length; i++) {
        if (list[i].children) {
          gridAreaName = this.findDepName(list[i].children, id);
          if (gridAreaName) {
            return gridAreaName;
          }
        } else {
          if (list[i].id == id) {
            gridAreaName = list[i].name;
          }
        }
      }
      return gridAreaName;
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
/deep/.el-form-item__label {
  line-height: 20px;
}
.personBox {
  display: flex;
  width: 816px;
}
.personItem {
  width: 698px;
  border: 1px solid #dcdfe6;
  height: 42px;
  border-radius: 4px;
  display: inline-block;
  white-space: normal;
  .item {
    display: inline-block;
    height: 30px;
    padding: 0 10px;
    border: 1px solid #eeee;
    background: #eee;
    line-height: 30px;
    border-radius: 4px;
    margin: 0 6px;
    cursor: pointer;
  }
}
</style>
