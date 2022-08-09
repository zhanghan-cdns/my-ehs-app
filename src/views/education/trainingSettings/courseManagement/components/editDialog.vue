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
          :rules="rules"
          :disabled="isDisabled"
          label-width="128px"
        >
          <el-form-item label="培训类别" prop="trainCategory">
            <el-select
              v-model="form.trainCategory"
              placeholder="请选择培训类别"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-option
                v-for="item in dict.educationSetTrainingcategory"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程名称" prop="courseName">
            <el-input
              v-model="form.courseName"
              placeholder="请输入课程名称"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item :label="'课程学时\n(45m)'" prop="courseHours">
            <el-input
              v-model="form.courseHours"
              placeholder="请输入课程学时"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="允许考试次数">
            <el-input
              v-model="form.examNum"
              placeholder="请输入允许考试次数"
              style="width: 320px"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否需要考试">
            <el-radio-group
              v-model="form.isNeedExam"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-radio
                v-for="item in dict.commonJudge"
                :label="item.dictValue"
                :key="item.id"
                :value="item.dictValue"
                >{{ item.dictValueName }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="'员工考试是否\n绑定学时'">
            <el-radio-group
              v-model="form.isExamBindHours"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-radio
                v-for="item in dict.commonJudge"
                :label="item.dictValue"
                :key="item.id"
                :value="item.dictValue"
                >{{ item.dictValueName }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="培训级别"
            v-show="form.trainCategory == 'EDUCATION_SET_TRAININGCATEGORY:TWO'"
            prop="trainLevel"
          >
            <el-radio-group
              v-model="form.trainLevel"
              style="width: 450px"
              :disabled="disabled"
            >
              <el-radio
                v-for="item in dict.educationSetCourseTrainlevel"
                :label="item.dictValue"
                :key="item.id"
                :value="item.dictValue"
                >{{ item.dictValueName }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="上传课件" style="width: 800px">
            <render-upload
              :fileList="form.courseWare"
              @uploadSuccess="(fileList) => onSuccess(fileList, 'courseWare')"
              @handleRemove="(index) => onRemove(index, 'courseWare')"
              :openOff="isDisabled"
              style="margin-bottom: 20px"
            ></render-upload>
            <el-button
              type="primary"
              small
              style="margin-top: 20px"
              @click="openPublicCourseware"
              ><i class="el-icon-upload el-icon--right"></i
              >公有课件库中选择</el-button
            >
          </el-form-item>
          <div class="pub_wrap">
            <div
              v-for="(item, index) in publicCoursewareList"
              :key="item.id"
              class="pubItem"
            >
              {{ item.coursewareName }}
              <i
                class="iconfont icon-caozuo--shanchu"
                @click="delPub(index)"
                style="cursor: pointer"
              ></i>
            </div>
          </div>
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
    <public-courseware
      ref="publicCoursewareRef"
      @updatePub="updatePub"
    ></public-courseware>
  </div>
</template>
<script>
import tableMixins from "@/mixins/table";
import publicCourseware from "./publicCourseware.vue";
import {
  createAPI,
  getDetailAPI,
  updateAPI,
} from "@/api/education/trainingSettings/courseManagement";
import { getListAPI } from "@/api/education/trainingSettings/coursewareManagement";
export default {
  name: "editDialog",
  components: { publicCourseware },
  mixins: [tableMixins],
  props: {
    dict: Object,
    default: () => {},
  },
  data() {
    return {
      title: "",
      icon: "",
      openFlag: false,
      isDisabled: "",
      editId: "",
      form: {
        trainCategory: "",
        courseName: "",
        courseHours: "",
        isExamBindHours: "COMMON_JUDGE:FALSE",
        coursewareLibrary: {},
        trainLevel: "EDUCATION_SET_COURSE_TRAINLEVEL:ONE",
        courseWare: [],
        publicCourseWareIds: "",
        isNeedExam: "COMMON_JUDGE:TRUE",
      },
      rules: {
        trainCategory: [
          { required: true, message: "请选择培训类别", trigger: "change" },
        ],
        courseName: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
        ],
        courseHours: [
          { required: true, message: "请输入课程学时", trigger: "blur" },
        ],
        trainLevel: [
          { required: true, message: "请选择培训级别", trigger: "change" },
        ],
      },
      publicCoursewareList: [],
      courseWareList: [],
    };
  },
  mounted() {
    this.coursewareList();
  },
  methods: {
    // 打开
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增课程信息";
        this.isDisabled = false;
      } else if (type == "bianji") {
        this.getDetail(row.id);
        this.editId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑课程信息";
        this.isDisabled = false;
      } else if (type == "chakan") {
        this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看课程信息";
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
      this.form = {
        trainCategory: "",
        courseName: "",
        courseHours: "",
        isExamBindHours: "COMMON_JUDGE:FALSE",
        coursewareLibrary: {},
        trainLevel: "EDUCATION_SET_COURSE_TRAINLEVEL:ONE",
        courseWare: [],
        isNeedExam: "COMMON_JUDGE:TRUE",
      };
      this.publicCoursewareList = [];
      this.$refs.basicFormRef.resetFields();
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
    // 获取详情
    async getDetail(id) {
      try {
        const res = await getDetailAPI({ id });
        if (res.code === 200) {
          this.form = res.data;
          this.form.trainCategory = res.data.trainCategory.key;
          this.form.isExamBindHours = res.data.isExamBindHours.key;
          this.form.trainLevel = res.data.trainLevel.key;
          this.form.isNeedExam = res.data.isNeedExam.key;
          let arr = this.form.publicCourseWareIds.split(",");
          this.courseWareList.map((item) => {
            if (arr.indexOf(item.id) > -1) {
              this.publicCoursewareList.push(item);
            }
          });
          console.log(111, this.publicCoursewareList);
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 上传课件成功
    onSuccess(fileList, params) {
      this.form[params].push(fileList);
    },
    // 删除课件
    onRemove(index, params) {
      this.form[params].splice(index, 1);
    },
    // 打开公有课件库
    openPublicCourseware() {
      this.$refs.publicCoursewareRef.open();
    },
    // 更新公有课件库
    updatePub(data) {
      this.publicCoursewareList = data;
      this.form.publicCourseWareIds = "";
      let arr = [];
      this.publicCoursewareList.map((item) => {
        arr.push(item.id);
      });
      this.form.publicCourseWareIds = arr.join(",");
    },
    delPub(index) {
      if (this.isDisabled) {
        return;
      }
      this.publicCoursewareList.splice(index, 1);
      this.form.publicCourseWareIds = "";
      let arr = [];
      this.publicCoursewareList.map((item) => {
        arr.push(item.id);
      });
      this.form.publicCourseWareIds = arr.join(",");
      console.log(this.form);
    },
    // 获课件列表
    coursewareList() {
      let params = {
        "queryParams[pageNum]": 1,
        "queryParams[pageSize]": 100,
      };
      getListAPI(params).then((res) => {
        this.courseWareList = res.data.content;
      });
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
/deep/ .el-form-item__label {
  line-height: 24px;
}
/deep/.pubItem {
  padding: 10px;
  background: gainsboro;
  font-size: 14px;
  line-height: 14px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  white-space: nowrap;
  min-width: 160px;
  border-radius: 4px;
  margin-right: 10px;
}
/deep/.pub_wrap {
  margin-left: 125px;
  display: flex;
}
</style>
