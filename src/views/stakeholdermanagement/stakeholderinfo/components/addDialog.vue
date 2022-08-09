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
        <el-form ref="formRef" :model="form" label-width="108px" :inline="true">
          <el-form-item label="单位名称">
            <el-input
              v-model="form.unitName"
              placeholder="请输入单位名称"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group
              v-model="form.status"
              :style="width"
              :disabled="disabled"
            >
              <el-radio label="有效" key="1" value="1">有效</el-radio>
              <el-radio label="无效" key="0" value="0">无效</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="相关方类别"
            prop="relatedInfoRelatedPartyCategory"
          >
            <el-select
              v-model="form.relatedInfoRelatedPartyCategory"
              placeholder="请选择相关方类别"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-option
                v-for="item in dict.relatedInfoRelatedPartyCategory"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行业类型" prop="relatedInfoIndustryType">
            <el-select
              v-model="form.relatedInfoIndustryType"
              placeholder="请选择行业类型"
              style="width: 320px"
              :disabled="disabled"
            >
              <el-option
                v-for="item in dict.relatedInfoIndustryType"
                :label="item.dictValueName"
                :key="item.id"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="法人代表">
            <el-input
              v-model="form.legalRepresentative"
              placeholder="请输入法人代表"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="法人电话">
            <el-input
              v-model="form.legalRepresentativeContactNumber"
              placeholder="请输入法人电话"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input
              v-model="form.contactPerson"
              placeholder="请输入联系人"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人电话">
            <el-input
              v-model="form.contactPhone"
              placeholder="请输入联系人电话"
              :style="width"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="经营范围">
            <el-input
              v-model="form.businessScope"
              placeholder="请输入经营范围"
              :style="width2"
              :disabled="disabled"
              type="textarea"
              resize="none"
            ></el-input>
          </el-form-item>
          <el-form-item label="营业执照" :style="width2" :disabled="disabled">
            <basic-upload
              key="file"
              @onSuccess="(fileList) => onSuccess(fileList, 'businessLicense')"
              @handleRemove="(fileList) => onRemove(fileList, 'businessLicense')"
              :photos="form.businessLicense"
              :limit="2"
              :disabled="disabled"
            ></basic-upload>
          </el-form-item>
          <el-form-item label="附件" :style="width2" :disabled="disabled">
            <render-upload
             :fileList="form.theAttachment"
              @uploadSuccess="(fileList) => onSuccess(fileList, 'theAttachment')"
              @onRemove="(fileList) => onRemove(index, 'theAttachment')"
              :openOff="disabled"
            ></render-upload>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="form.remark"
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
import { getDetailAPI,createAPI,updateAPI} from "@/api/stakeholdermanagement/stakeholderinfo";
export default {
  props: {
    dict: Object,
  },
  data() {
    return {
      openFlag: false,
      isEditId: "",
      width: "width:320px",
      width2: "width:760px",
      disabled: false,
      form: {
        unitName: "",
        status:1,
        relatedInfoRelatedPartyCategory: "",
        relatedInfoIndustryType: "",
        legalRepresentative: "",
        legalRepresentativeContactNumber: "",
        contactPerson: "",
        contactPhone: "",
        businessScope: "",
        businessLicense: "",
        theAttachment: "",
        remark: "",
      },
      rules: {
        unitName: [
          { required: true, message: "请输入单位名称", trigger: "change" },
        ],
        latelyTime: [
          { required: true, message: "请选择最近培训时间", trigger: "change" },
        ],
        official: [
          { required: true, message: "请选择发证机关", trigger: "change" },
        ],
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
        this.title = "新增相关方信息";
      } else if (type == "bianji") {
        this.getDetail(row.id);
        this.isEditId = row.id;
        this.icon = "icon-fujiaxinxi";
        this.title = "编辑相关方信息";
      } else if (type == "chakan") {
        // this.getDetail(row.id);
        this.icon = "icon-chakan2";
        this.title = "查看相关方信息";
        this.disabled = true;
      }
      this.openFlag = true;
    },
      // 保存
    async submitForm() {
      this.$refs.formRef.validate((valid) => {
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
    reset() {
      this.disabled = false;
      this.$refs.formRef.resetFields();
      this.form = {
        unitName: "",
        status: "",
        relatedInfoRelatedPartyCategory: "",
        relatedInfoIndustryType: "",
        legalRepresentative: "",
        legalRepresentativeContactNumber: "",
        contactPerson: "",
        contactPhone: "",
        businessScope: "",
        businessLicense: "",
        theAttachment: "",
        remark: "",
      };
    },
    close() {
      this.openFlag = false;
      this.reset();
    },
    async getDetail(id) {
      const res = await getDetailAPI({ id });
      if (res.code === 200) {
      }
    },
        // 上传课件成功
    onSuccess(fileList, params) {
      this.form[params].push(fileList);
    },
    // 删除课件
    onRemove(index) {
            
    },
  },
};
</script>
<style scoped lang="scss">
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
