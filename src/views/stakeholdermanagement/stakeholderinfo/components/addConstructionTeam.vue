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
          <el-form-item label="所属相关方">
            <el-select
              v-model="form.trainCategory"
              placeholder="关联承包商信息"
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
          <el-form-item label="施工队伍营业等级">
            <el-select
              v-model="form.trainCategory"
              placeholder="施工队伍营业等级"
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
          <el-form-item label="责任书签订日期">
            <el-date-picker
              v-model="form.courseName"
              placeholder="请选择日期"
              :style="width"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="责任书到期日期">
            <el-date-picker
              v-model="form.courseName"
              placeholder="请选择日期"
              :style="width"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="统一社会信用代码">
            <el-input
              v-model="form.courseName"
              placeholder="请输入统一社会信用代码"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="营业执照编号">
            <el-input
              v-model="form.courseName"
              placeholder="请输入营业执照编号"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="施工队伍负责人">
            <el-input
              v-model="form.courseName"
              placeholder="请输入施工队伍负责人"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="安全负责人">
            <el-input
              v-model="form.courseName"
              placeholder="请输入安全负责人"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="施工队伍负责人电话">
            <el-input
              v-model="form.courseName"
              placeholder="请输入施工队伍负责人电话"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="安全负责人电话">
            <el-input
              v-model="form.courseName"
              placeholder="请输入安全负责人电话"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="施工队伍负责人身份证">
            <el-input
              v-model="form.courseName"
              placeholder="请输入施工队伍负责人身份证"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="安全负责人身份证">
            <el-input
              v-model="form.courseName"
              placeholder="请输入安全负责人身份证"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="进厂日期">
            <el-date-picker
              v-model="form.courseName"
              placeholder="请选择到期日期"
              :style="width"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="考核日期">
            <el-date-picker
              v-model="form.courseName"
              placeholder="请选择考核日期"
              :style="width"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="施工单位简介">
            <el-input
              v-model="form.courseName"
              placeholder="请输入备注"
              :style="width2"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否在黑名单中" :style="width2">
            <el-radio-group
              v-model="form.isExamBindHours"
              :style="width"
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
            label="特种设备安装许可证"
            style="width: 380px"
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
          <el-form-item
            label="安全协议附件"
            style="width: 380px"
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
          <el-form-item label="进厂日期">
            <el-date-picker
              v-model="form.courseName"
              placeholder="请选择到期日期"
              :style="width"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="form.courseName"
              placeholder="请输入备注"
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
  },
  methods: {
    open(type, row) {
      if (type == "xinzeng") {
        this.icon = "icon-xinzeng";
        this.title = "新增施工队伍";
        this.disabled = false;
      } else if (type == "bianji") {
        this.getDetail(row.id);
        this.isEditId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑施工队伍";
        this.disabled = false;
      } else if (type == "chakan") {
        // this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看施工队伍";
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
