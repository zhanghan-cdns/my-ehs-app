<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="50%"
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
                <el-form-item label="角色名称" prop="roleName" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.roleName"
                    placeholder="请输入角色名称"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="角色编码" prop="roleCode" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.roleCode"
                    placeholder="请输入角色编码"
                  ></el-input>
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
            <el-row>
              <el-col span="24">
                <el-form-item label="启用状态" prop="isEnable" class="is-required">
                  <dict-select
                    style="width: 330px"
                    :dictKey="'COMMON_USE'"
                    v-model="form.isEnable.key">
                  </dict-select>
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
import {createFormDataAPI, updateFormDataAPI, returnFormDataAPI} from "@/api/system/role";

export default {
  data() {
    return {
      type: 'add',
      openEdit: false,
      form: {
        id: '',
        roleName: '',  //角色名称
        roleCode: '',  //角色编码
        orderNum: '',  //排序
        isEnable: {
          value:"",
          key:""
        },  //启用状态,可用值:0,1
      },
      formRules: {
        roleName: [
          {required: true, message: "请输入角色名称", trigger: "blur"},
        ],
        roleCode: [
          {required: true, message: "请输入角色编码", trigger: "blur"},
        ],
        orderNum: [
          {required: true, message: "请输入排序", trigger: "blur"},
        ],
        isEnable: [
          {required: true, message: "请选择启用状态", trigger: "blur"},
        ],
      }
    };
  },
  props: {
    title: {
      type: String,
      default: "角色编辑面板",
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
        roleName: '',  //角色名称
        roleCode: '',  //角色编码
        orderNum: '',  //排序
        isEnable: {
          value:"",
          key:""
        },  //启用状态,可用值:0,1
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
      const res = await returnFormDataAPI({id});
      if (res.code === 200) {
        this.form = res.data
      }
    },
    // 保存
    submitForm(formName) {
      this.form.orderNum = Number(this.form.orderNum)
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 编辑保存
          if (this.type === 'edit') {
              updateFormDataAPI(this.form).then((res) => {
                this.$message.success('编辑成功!')
                this.$emit("refreshDataList");
                this.close()
              })
          } else {
            createFormDataAPI(this.form).then((res) => {
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
