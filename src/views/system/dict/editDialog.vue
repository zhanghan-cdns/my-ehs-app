<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="750"
      height="60%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content>
        <div class="container">
          <el-form :model="form" label-width="200px" class="demo-ruleForm" ref="ruleForm" :rules="formRules">
            <el-row>
              <el-col span="24">
                <el-form-item label="字典键名称" prop="dictKeyName" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.dictKeyName"
                    placeholder="请输入字典键名称"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="字典键" prop="dictKey" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.dictKey"
                    placeholder="请输入字典键"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="字典键类型" prop="dictKeyType" class="is-required">
                  <el-select style="width: 330px" disabled v-model="form.dictKeyType">
                    <el-option
                      v-for="item in index.commonDataorigin"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="是否为子字典" prop="isChildren">
                <el-select style="width: 330px" disabled v-model="form.isChildren">
                  <el-option
                    v-for="item in index.commonJudge"
                    :key="item.id"
                    :label="item.dictValueName"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="备注">
                  <el-input v-model="form.remark"
                            style="width: 330px"
                            type="textarea"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button type="success" @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basicDialog>
  </div>
</template>
<script>
import {createDictKeyDataAPI, updataDictKeyDataAPI, returnDictKeyDataAPI} from "@/api/system/dictionary";

export default {
  inject: ["index"],
  data() {
    return {
      type: 'add',
      openEdit: false,
      form: {
        id: '',
        dictKeyName: '',
        dictKey: '',
        dictKeyType: 'COMMON_DATAORIGIN:USER',
        isChildren: 'COMMON_JUDGE:FALSE',
      },
      formRules: {
        dictKeyName: [
          {required: true, message: "请输入字典键名称", trigger: "blur"},
        ],
        dictKey: [
          {required: true, message: "请输入字典键", trigger: "blur"},
        ],
        dictKeyType: [
          {required: true, message: "请选择字典键类型", trigger: "blur"},
        ],
      }
    };
  },
  props: {
    title: {
      type: String,
      default: "字典键编辑面板",
    },
    icon: {
      type: String,
      default: "icon-bianji",
    },
  },
  created() {

  },
  methods: {
    open(row) {
      this.openEdit = true;
      this.form = {
        id: '',
        dictKeyName: '',
        dictKey: '',
        dictKeyType: 'COMMON_DATAORIGIN:USER',
        isChildren: 'COMMON_JUDGE:FALSE',
      }
      if (row && row.id) {
        this.type = 'edit'
        this.getRetuenForm(row.id)
      }
    },
    close() {
      this.openEdit = false;
    },
    // 数据回填
    async getRetuenForm(id) {
      const res = await returnDictKeyDataAPI({id});
      if (res.code == 200) {
        this.form = {
          version: res.data.version,   // 不传version会是新增
          id: res.data.id,
          dictKeyName: res.data.dictKeyName,
          dictKey: res.data.dictKey,
          dictKeyType: res.data.dictKeyType && res.data.dictKeyType.key,
          isChildren: res.data.isChildren && res.data.isChildren.key,
        }
      }
    },
    // 保存
    submitForm(formName) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 编辑保存
          if (this.type == 'edit') {
            updataDictKeyDataAPI({...this.form,data_origin:"COMMON_DATAORIGIN:USER"}).then((res) => {
              this.$message.success('编辑成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          } else {
            createDictKeyDataAPI({...this.form,data_origin:"COMMON_DATAORIGIN:USER"}).then((res) => {
              this.$message.success('新增成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          }
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
};
</script>

<style scoped lang='scss'>
/deep/ .vxe-modal--content {
  background: #eeeeee;
  padding: 10px;
  padding-bottom: 5px;
}

.container {
  border-radius: 3px;
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 15px;
  padding-top: 20px;
}

/deep/ .el-form-item__error {
  line-height: 5px !important;
}
</style>
