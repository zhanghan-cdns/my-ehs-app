<template>
  <div>
    <basic-dialog
      :icon="
        isDisabled
          ? 'icon-chakan2'
          : form.id
          ? 'icon-bianji'
          : 'icon-xinzengfabu'
      "
      :title="(isDisabled ? '查看' : form.id ? '编辑' : '新增') + title"
      width="850px"
      height="90%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form
          label-width="140px"
          label-position="right"
          :model="form"
          :rules="rules"
          ref="formRef"
        >
          <el-row>
            <el-form-item label="活动标题" prop="targetTitle">
              <el-input
                v-model="form.targetTitle"
                :size="size"
                :isDisabled="isDisabled"
              ></el-input>
            </el-form-item>
            <el-row>
            <el-col :span="12">
              <el-form-item label="活动时间">
                  <el-date-picker
                  style="width:100%"
                    v-model="value1"
                    type="date"
                  >
                  </el-date-picker>
              </el-form-item>
            </el-col>
              <el-col :span="12">
                <el-form-item label="活动地点" prop="targetPlace">
                  <el-input :size="size" v-model="form.targetPlace" :isDisabled="isDisabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="主办部门">
                  <el-select
                    clearable
                    v-model="form.year"
                    style="width: 100%"
                    :size="size"
                    :isDisabled="isDisabled"
                  >
                    <el-option
                      v-for="item in dictConfig.entAccidentType"
                      :key="item.id"
                      :value="item.dictValue"
                      :label="item.dictValueName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            <el-col :span="12">
              <el-form-item label="协同部门" prop="targetSynergy">
                <el-input :size="size" :isDisabled="isDisabled" v-model="form.targetSynergy"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参加部门">
                <el-select
                  clearable
                  v-model="form.year"
                  style="width: 100%"
                  :size="size"
                  :isDisabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.entAccidentType"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="活动级别">
                <el-select
                  clearable
                  v-model="form.year"
                  style="width: 100%"
                  :size="size"
                  :isDisabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.entAccidentType"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="活动主持人" prop="targetHost">
                <el-select
                  clearable
                  v-model="form.targetHost"
                  style="width: 100%"
                  :size="size"
                  :isDisabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.entAccidentType"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="记录人" prop="targetRecord">
                <el-select
                  clearable
                  v-model="form.targetRecord"
                  style="width: 100%"
                  :size="size"
                  :isDisabled="isDisabled"
                >
                  <el-option
                    v-for="item in dictConfig.entAccidentType"
                    :key="item.id"
                    :value="item.dictValue"
                    :label="item.dictValueName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否发布">
                <el-radio-group v-model="radio">
                  <el-radio v-model="radio" label="1">是</el-radio>
                  <el-radio v-model="radio" label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态">
                <el-radio-group v-model="status">
                  <el-radio label="1" >待开始</el-radio>
                  <el-radio label="2">推迟</el-radio>
                  <el-radio label="3">结束</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            </el-row>

            <el-form-item label="活动内容">
              <el-input
                type="textarea"
                :size="size"
                v-model="form.targetActive"
                :isDisabled="isDisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="活动情况与总结" prop="targetContent">
              <el-input
                type="textarea"
                :size="size"
                v-model="form.targetContent"
                :isDisabled="isDisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="活动照片">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="附件上传">
              <basic-upload
                key="file"
                :model="true"
                @onSuccess="(fileList) => onSuccess(fileList, 'file')"
                @onRemove="(fileList) => onRemove(fileList, 'file')"
                :photos="form.file"
              ></basic-upload>
            </el-form-item>
            <el-form-item label="主要参与人员" prop="targetParticipants">
              <el-input :size="size" :isDisabled="isDisabled" v-model="form.targetParticipants" style="width:80%"></el-input>
              <el-button type="primary" style="width:18%;float:right;padding:8px;height:40px">选择人员</el-button>
            </el-form-item>
            <el-form-item label="备注" prop="targetNote">
              <el-input :size="size" :isDisabled="isDisabled" v-model="form.targetNote"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')"
            >保存
          </el-button>
          <el-button type="success" @click="reset('form')">重置 </el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import {
  sdpInfoCreateAPI,
  sdpInfoViewAPI,
  sdpInfoUpdateAPI,
} from "@/api/duty/duty_standard_provide";

export default {
  name: "editDialog",
  data() {
    return {
      openEdit: false,
      isDisabled: "",
      width: "260px",
      size: "small",
      form: {
        id: "",
        file: "",
      },
      rowData: {},
      value1: "",
      radio: "1",
      status: "1",
      form:{
        targetTitle:'',
        targetHost:'',
        targetRecord:''
      },
      rules:{
        targetTitle:[ { required: true, message: "此项为必填项", trigger: "blur" },],
         targetHost:[ { required: true, message: "此项为必填项", trigger: "blur" },],
         targetRecord:[ { required: true, message: "此项为必填项", trigger: "blur" },]

      }
    };
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: String,
      default: "安全活动信息",
    },
    icon: {
      type: String,
      default: "icon-xinzengfabu",
    },
  },
  methods: {
    
    // 打开
    open(row, type) {
      this.openEdit = true;
      // this.form.id = row.id;
      this.isDisabled = type === "chakan" ? true : false;
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id);
      } else {
        this.form = {};
      }
    },
    // 关闭
    close() {
      this.openEdit = false;
      this.reset();
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields();
      this.form = {};
    },
    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList;
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList;
    },
    // 提交接口
    submitForm(){
      this.$refs.formRef.validate((valid) => {
        if (valid) {
        //   if (this.rowData.id) this.modify();
        //   else this.add();
        alert('success')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增
    async add() {
      try {
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 修改
    async modify() {
      try {
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 获取详情
    async getDetail(id) {
      try {
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .el-input--small .el-input__inner{
  height: 40px;
  line-height: 40px;
}
/deep/ .el-col{
  margin-bottom: 0;
}
/deep/ .el-form-item__error {
  line-height: 2px;
}

</style>
