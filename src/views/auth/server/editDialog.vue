<template>
  <div id="">
    <basicDialog
      :icon="icon"
      :title="title"
      width="60%"
      height="70%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
      showFooter
    >
      <template #content>
        <div class="container">
          <el-form :model="form" label-width="200px" class="demo-ruleForm" ref="ruleForm" :rules="formRules">
            <el-row>
              <el-col span="12">
                <el-form-item label="客户端ID" prop="clientId" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.clientId"
                    placeholder="请输入客户端ID"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="客户端密码" prop="clientSecret" class="is-required">
                  <el-input
                    type="password"
                    style="width: 330px"
                    clearable
                    v-model="form.clientSecret"
                    placeholder="请输入客户端密码"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="资源ID" prop="resourceIds">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.resourceIds"
                    placeholder="请输入资源ID"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="范围" prop="scope" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.scope"
                    placeholder="请输入范围"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="验证模式" prop="authorizedGrantTypes" class="is-required">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.authorizedGrantTypes"
                    placeholder="验证模式"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="重定向地址" prop="webServerRedirectUri">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.webServerRedirectUri"
                    placeholder="重定向地址"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="权限" prop="authorities">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.authorities"
                    placeholder="请输入权限"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="accessToken有效时长" prop="accessTokenValidity">
                  <el-input
                    type="number"
                    style="width: 330px"
                    clearable
                    v-model="form.accessTokenValidity"
                    placeholder="请输入accessToken有效时长"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="refreshToken有效时长" prop="refreshTokenValidity">
                  <el-input
                    type="number"
                    style="width: 330px"
                    clearable
                    v-model="form.refreshTokenValidity"
                    placeholder="请输入refreshToken有效时长"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="自动批准" prop="autoapprove">
                  <el-input
                    style="width: 330px"
                    clearable
                    v-model="form.autoapprove"
                    placeholder=""
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="24">
                <el-form-item label="附加信息" prop="additionalInformation">
                  <el-input
                    type="textarea"
                    style="width: 100%"
                    :autosize="{ minRows: 5}"
                    clearable
                    v-model="form.additionalInformation"
                    placeholder="请输入附加信息"
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

import {serverCreateAPI, serverGetAPI, serverUpdateAPI} from "@/api/auth/server/entity";

export default {
  data() {
    return {
      type: 'add',
      openEdit: false,
      form: {
        clientId: '',
        clientSecret: '',
        resourceIds: '',
        scope: '',
        authorizedGrantTypes: '',
        webServerRedirectUri: '',
        authorities: '',
        accessTokenValidity: '',
        refreshTokenValidity: '',
        additionalInformation: '',
        autoapprove: '',
      },
      formRules: {
        clientId: [
          { required: true, message: "请输入客户端ID", trigger: "blur" },
        ],
        clientSecret: [
          { required: true, message: "请输入客户端密码", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    title: {
      type: String,
      default: "验证客户端编辑面板",
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
          clientId: '',
          clientSecret: '',
          resourceIds: '',
          scope: '',
          authorizedGrantTypes: '',
          webServerRedirectUri: '',
          authorities: '',
          accessTokenValidity: '',
          refreshTokenValidity: '',
          additionalInformation: '',
          autoapprove: '',
        }
        if(row && row.clientId != ''){
          this.type = 'edit'
          this.getRetuenForm(row.clientId)
        }
    },
    close() {
      this.openEdit = false;
    },
    // 数据回填
    async getRetuenForm(id){
      const res = await serverGetAPI({clientId: id});
      if(res.code == 200){
        this.form = {
          clientId: res.data.clientId,
          clientSecret: res.data.clientSecret,
          resourceIds: res.data.resourceIds,
          scope: res.data.scope,
          authorizedGrantTypes: res.data.authorizedGrantTypes,
          webServerRedirectUri: res.data.webServerRedirectUri,
          authorities: res.data.authorities,
          accessTokenValidity: res.data.accessTokenValidity,
          refreshTokenValidity: res.data.refreshTokenValidity,
          additionalInformation: res.data.additionalInformation,
          autoapprove: res.data.autoapprove,
        }
      }
    },
    // 保存
    submitForm(formName) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 编辑保存
          if(this.type == 'edit'){
            serverUpdateAPI(this.form).then((res)=>{
              this.$message.success('编辑成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          }else{
            serverCreateAPI(this.form).then((res)=>{
              this.$message.success('新增成功!')
              this.$emit("refreshDataList");
              this.close()
            })
          }
        }
      })
    },
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
