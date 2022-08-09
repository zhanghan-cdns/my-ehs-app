<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      :width="850"
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
                <el-form-item label="字典键名称" prop="dictValueName" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.dictValueName"
                    placeholder="请输入字典键名称"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="提示键名"> {{ dictKey }}
                  <el-button type="primary" @click="form.dictValue=dictKey" size="small">引用</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="字典键" prop="dictValue" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.dictValue"
                    placeholder="请输入字典键"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col span="24">
                <el-form-item label="是否为目录" prop="isCategory" class="is-required">
                  <el-select style="width: 330px" v-model="form.isCategory">
                    <el-option
                      v-for="item in index.commonJudge"
                      :key="item.id"
                      :label="item.dictValueName"
                      :value="item.dictValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="排序" prop="orderNum">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.orderNum"
                    placeholder="请输入排序"
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
import {
  createDictValueDataAPI,
  updataDictValueDataAPI,
  returnDictValueDataAPI,
  returnDictKeyDataAPI
} from "@/api/system/dictionary";

export default {
  data() {
    return {
      type: 'add',
      openEdit: false,
      dictKeyId: '',
      form: {
        id: '',
        dictKeyId: '',
        dictValueName: '',
        dictValue: '',
        orderNum: '',
        isCategory: ''
      },
      formRules: {
        dictValueName: [
          {required: true, message: "请输入字典值名称", trigger: "blur"},
        ],
        dictValue: [
          {required: true, message: "请输入字典值", trigger: "blur"},
        ],
        orderNum: [
          {required: true, message: "请输入排序", trigger: "blur"},
        ],
      }
    };
  },
  inject: ["index"],
  props: {
    title: {
      type: String,
      default: "字典值编辑面板",
    },
    icon: {
      type: String,
      default: "icon-bianji",
    },
    dictKey: {
      type: String,
      default: ""
    }
  },
  created() {

  },
  methods: {
    open(dictKeyId, row) {
      this.openEdit = true;
      this.dictKeyId = dictKeyId
      this.form = {
        id: '',
        dictKeyId: dictKeyId,
        dictValueName: '',
        dictValue: '',
        orderNum: '',
        isCategory: 'COMMON_JUDGE:FALSE'
      }
      if (row && row.id) {
        this.type = 'edit'
        this.getRetuenForm(row.id)
      }
      this.getDictKey()

    },
    close() {
      this.openEdit = false;
    },
    // 查询每一层的字典键
    async getDictKey() {
      const res = await returnDictKeyDataAPI({dictKey: this.dictKey})
      if (res.code === 200) {
        this.form.dictKeyId=res.data.id
      }
    },
    // 数据回填
    async getRetuenForm(id) {
      const res = await returnDictValueDataAPI({id});
      if (res.code == 200) {
        this.form = {
          dictKeyId: this.dictKeyId,
          version: res.data.version,   // 不传version会是新增
          id: res.data.id,
          dictValueName: res.data.dictValueName,
          dictValue: res.data.dictValue,
          orderNum: res.data.orderNum,
        }
      }
    },
    // 保存
    submitForm(formName) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 编辑保存
          if (this.type == 'edit') {
            updataDictValueDataAPI({
              ...this.form,
              data_origin: "COMMON_DATAORIGIN:USER",
              is_default: "COMMON_JUDGE:TRUE",
              status: "COMMON_USE:ENABLE"
            }).then((res) => {
              this.$message.success('编辑成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          } else {
            createDictValueDataAPI({
              ...this.form,
              data_origin: "COMMON_DATAORIGIN:USER",
              is_default: "COMMON_JUDGE:TRUE",
              status: "COMMON_USE:ENABLE"
            }).then((res) => {
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
