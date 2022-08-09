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
        <el-form label-width="120px" label-position="right" :model="form" disabled :rules="rules" ref="formRef">
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
                <show-file :data="form.relevantAttachment"></show-file>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>
<script>
import { certificateViewAPI} from '@/api/enterprise/certificate'
import showFile from "@/components/show-file/index";

export default {
  name: "editDialog",
  components:{
    showFile
  },
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
