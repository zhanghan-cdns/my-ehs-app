<template>
  <div>
    <basic-dialog
      :icon="icon"
      :title="title"
      width="850px"
      height="85%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form label-width="120px" label-position="right" :model="form" :rules="rules" ref="formRef">
          <el-row>
            <el-col span="24">
              <el-form-item label="证书名称" prop="certificateName">
                <el-input placeholder="证书名称" clearable v-model="form.certificateName" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="证书类型" prop="certificateType">
                <el-select placeholder="请选择类型" :size="size" clearable v-model="form.certificateType"
                           :style="`width:${width}` ">
                  <el-option v-for="item in dictConfig.entCertificateType" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="证书编号">
                <el-input placeholder="证书编号" clearable v-model="form.certificateNum" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="有效日期">
                <el-date-picker
                  v-model="form.validTime"
                  type="datetime"
                  :size="size"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :style="`width:${width}` "
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="发证机构">
                <el-input placeholder="发证机构" clearable v-model="form.licenseIssuingAgency" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="证书描述">
                <el-input type="textarea" :rows="4" placeholder="证书描述" clearable v-model="form.certificateDescription"
                          style="width:100%;"
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="备注">
                <el-input type="textarea" :rows="4" placeholder="备注" clearable v-model="form.remark" style="width:100%;"
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="上传附件">
                <basic-upload
                  key="file"
                  :model="true"
                  @onSuccess="(fileList)=>onSuccess(fileList,'relevantAttachment')"
                  @onRemove="(fileList)=>onRemove(fileList,'relevantAttachment')"
                  :photos="form.relevantAttachment"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm('form')"
          >保存
          </el-button
          >
          <el-button type="success" @click="reset('form')"
          >重置
          </el-button
          >
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import {certificateCreateAPI, certificateViewAPI, certificateUpdateAPI} from '@/api/enterprise/certificate'

export default {
  name: "editDialog",
  data() {
    return {
      icon: 'icon-bianji',
      title: '证照信息',
      openEdit: false,
      width: "100%",
      size: "small",
      form: {},
      rules: {
        // 证照信息
        certificateName: [
          {required: true, message: "请输入有限空间", trigger: "blur"},
        ],
        // 证照类型
        certificateType: [
          {required: true, message: "请选择易导致事故类型", trigger: "change"},
        ]
      },
      rowData: {}
    }
  },
  props: {
    dictConfig: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 打开
    open(row) {
      this.openEdit = true
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id)
      }
    },
    // 关闭
    close() {
      this.openEdit = false
      this.reset()
    },
    // 重置
    reset() {
      this.$refs.formRef.resetFields()
      this.form = {}
    },
    // 提交接口
    submitForm() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          if (this.rowData.id) this.modify()
          else this.add()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 新增
    async add() {
      try {
        const res = await certificateCreateAPI(this.form);
        if (res.code === 200) {
          this.close()
          this.$emit('refresh')
        }
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 修改
    async modify() {
      try {
        const res = await certificateUpdateAPI({...this.form, id: this.rowData.id});
        if (res.code === 200) {
          this.close()
          this.$emit('refresh')
        }
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 上传图片成功
    onSuccess(fileList, params) {
      this.form[params] = fileList
    },
    // 删除图片
    onRemove(fileList, params) {
      this.form[params] = fileList
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await certificateViewAPI({id})
        if (res.code === 200) {
          this.form = {...res.data, certificateType:res.data.certificateType? res.data.certificateType.key:""}
          // 为附件添加名字
          if(this.form.relevantAttachment){
            this.form.relevantAttachment=res.data.relevantAttachment.map(item=>{
              return{
                ...item,
                name:item.originalFilename
              }
            })
          }
        }
      } catch (e) {
        this.$message.error(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
</style>
