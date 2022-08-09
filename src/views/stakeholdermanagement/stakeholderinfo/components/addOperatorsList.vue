<template>
  <basic-dialog
    :title="title"
    :icon="icon"
    :width="1000"
    height="85%"
    v-bind="$attrs"
    @close="openFlag = false"
    :openFlag="openFlag"
    show-zoom
    resize
  >
    <template #content>
      <div class="wrap">
        <el-form ref="form" :model="form" label-width="108px">
          <el-form-item label="姓名">
            <el-select
              v-model="form.trainCategory"
              placeholder="关联人员表"
              :disabled="disabled"
              :style="width"
            >
              <!-- <el-option
                v-for="item in dict.commonJudge"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group
              v-model="form.sex"
              :style="width"
              :disabled="disabled"
            >
              <el-radio
                v-for="item in dict.commonGender"
                :label="item.dictValue"
                :key="item.id"
                :value="item.dictValue"
                >{{ item.dictValueName }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="类别">
            <el-select
              v-model="form.trainCategory"
              placeholder="关联人员表"
              :disabled="disabled"
              :style="width"
            >
              <!-- <el-option
                v-for="item in dict.commonJudge"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group
              v-model="form.sex"
              :style="width"
              :disabled="disabled"
            >
              <el-radio
                v-for="item in dict.commonGender"
                :label="item.dictValue"
                :key="item.id"
                :value="item.dictValue"
                >{{ item.dictValueName }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="操作证号">
            <el-input
              v-model="form.courseName"
              placeholder="请输入操作证号"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="户籍所在地">
            <el-input
              v-model="form.courseName"
              placeholder="请输入户籍所在地"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="民族">
            <el-input
              v-model="form.courseName"
              placeholder="请输入民族"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="form.courseName"
              placeholder="请选择日期"
              :style="width"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="最高学历">
            <el-select
              v-model="form.trainCategory"
              placeholder="请选择最高学历"
              :disabled="disabled"
              :style="width"
            >
              <!-- <el-option
                v-for="item in dict.commonJudge"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="最高学位">
            <el-select
              v-model="form.trainCategory"
              placeholder="请选择最高学位"
              :disabled="disabled"
              :style="width"
            >
              <!-- <el-option
                v-for="item in dict.commonJudge"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="专业">
            <el-select
              v-model="form.trainCategory"
              placeholder="请选择专业"
              :disabled="disabled"
              :style="width"
            >
              <!-- <el-option
                v-for="item in dict.commonJudge"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="最后毕业院校">
            <el-input
              v-model="form.courseName"
              placeholder="请输入最后毕业院校"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="政治面貌">
            <el-select
              v-model="form.trainCategory"
              placeholder="请选择政治面貌"
              :disabled="disabled"
              :style="width"
            >
              <!-- <el-option
                v-for="item in dict.commonJudge"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="健康状况">
            <el-select
              v-model="form.trainCategory"
              placeholder="请选择政治面貌"
              :disabled="disabled"
              :style="width"
            >
              <!-- <el-option
                v-for="item in dict.commonJudge"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="职务">
            <el-input
              v-model="form.courseName"
              placeholder="请输入职务"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="职称">
            <el-input
              v-model="form.courseName"
              placeholder="请输入职称"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-select
              v-model="form.trainCategory"
              placeholder="请选择部门"
              :disabled="disabled"
              :style="width"
            >
              <!-- <el-option
                v-for="item in dict.commonJudge"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="工作职责">
            <el-input
              v-model="form.courseName"
              placeholder="请输入工作职责"
              :style="width2"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="工作经历">
            <el-input
              v-model="form.courseName"
              placeholder="请输入工作经历"
              :style="width2"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="办公电话">
            <el-input
              v-model="form.courseName"
              placeholder="请输入办公电话"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="移动电话">
            <el-input
              v-model="form.courseName"
              placeholder="请输入移动电话"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input
              v-model="form.courseName"
              placeholder="请输入电子邮箱"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="进入单位时间">
            <el-date-picker
              v-model="form.courseName"
              placeholder="请选择进入单位时间"
              :style="width"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="工龄">
            <el-input
              v-model="form.courseName"
              placeholder="请输入工龄"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input
              v-model="form.courseName"
              placeholder="请输入证件号码"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="作业类型">
            <el-select
              v-model="form.trainCategory"
              placeholder="请选择作业类型"
              :disabled="disabled"
              :style="width"
            >
              <!-- <el-option
                v-for="item in dict.commonJudge"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="到期时间">
            <el-date-picker
              v-model="form.courseName"
              placeholder="请选择到期时间"
              :style="width"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="人员资质" :style="width2" :disabled="disabled">
            <basic-upload
              key="file"
              @onSuccess="(fileList) => onSuccess(fileList, 'courseWare')"
              @onRemove="(fileList) => onRemove(fileList, 'courseWare')"
              :photos="form.courseWare"
              :limit="2"
              :disabled="disabled"
            ></basic-upload>
          </el-form-item>
          <el-form-item
            label="相关培训资料"
            :style="width2"
            :disabled="disabled"
          >
            <basic-upload
              key="file"
              @onSuccess="(fileList) => onSuccess(fileList, 'courseWare')"
              @onRemove="(fileList) => onRemove(fileList, 'courseWare')"
              :photos="form.courseWare"
              :limit="2"
              :disabled="disabled"
            ></basic-upload>
          </el-form-item>
          <el-form-item label="责任书" :style="width2" :disabled="disabled">
            <basic-upload
              key="file"
              @onSuccess="(fileList) => onSuccess(fileList, 'courseWare')"
              @onRemove="(fileList) => onRemove(fileList, 'courseWare')"
              :photos="form.courseWare"
              :limit="2"
              :disabled="disabled"
            ></basic-upload>
          </el-form-item>
           <el-form-item label="证书" :style="width2" :disabled="disabled">
            <basic-upload
              key="file"
              @onSuccess="(fileList) => onSuccess(fileList, 'courseWare')"
              @onRemove="(fileList) => onRemove(fileList, 'courseWare')"
              :photos="form.courseWare"
              :limit="2"
              :disabled="disabled"
            ></basic-upload>
          </el-form-item>
            <el-form-item label="工作经历">
            <el-input
              v-model="form.courseName"
              placeholder="请输入工作经历"
              :style="width2"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #bottom>
      <div>
        <el-button type="primary" @click="submitForm()" v-show="!disabled"
          >保存
        </el-button>
        <el-button type="success" @click="reset()" v-show="!disabled"
          >重置
        </el-button>
        <el-button type="warning" @click="close">取消</el-button>
      </div>
    </template>
  </basic-dialog>
</template>
<script>
export default {
  props: {
    dict: Object,
    default: {},
  },
  data() {
    return {
      openFlag: false,
      isEditId: "",
      width: "width:260px",
      width2: "width:820px",
      disabled: false,
      form: {
        type: [],
      },
    };
  },
  mounted() {
    console.log(this.dict);
  },
  methods: {
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增作业人员信息";
        this.disabled = false;
      } else if (type == "bianji") {
        this.getDetail(row.id);
        this.isEditId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑作业人员信息";
        this.disabled = false;
      } else if (type == "chakan") {
        // this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看作业人员信息";
        this.disabled = true;
      }
      this.openFlag = true;
    },
    submitForm() {},
    reset() {},
    close() {},
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
/deep/.el-form-item__label {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  line-height: 20px;
}
</style>
