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
        <el-form label-width="140px" label-position="right" :model="form" :rules="rules" ref="formRef">
          <el-row>
            <el-col span="12">
              <el-form-item label="有限空间名称" prop="restrictSpaceName">
                <el-input placeholder="有限空间名称" clearable v-model="form.restrictSpaceName" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="所属部门">
                <el-select placeholder="所属部门" clearable v-model="form.affiliatedFunctionId" :style="`width:${width}`"
                           :size="size">
                  <el-option label="测试部门" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="主要危险有害物质">
                <el-input placeholder="主要危险有害物质" clearable v-model="form.mainSubstance" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="数量">
                <el-input-number placeholder="数量" clearable v-model="form.num" :style="`width:${width}` "
                                 :size="size"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="易导致事故类型" prop="accidentType">
                <el-select placeholder="易导致事故类型" clearable v-model="form.accidentType" :style="`width:${width}`"
                           :size="size">
                  <el-option v-for="item in dictConfig.entAccidentType" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="位置">
                <el-input placeholder="位置" v-model="form.locate" :style="`width:${width}` " :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="安全设施（预防/应急）">
                <el-input placeholder="安全设施（预防/应急）" clearable v-model="form.facilitiesSatety" type="textarea" :rows="4"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="图片">
                <basic-upload
                  key="picture"
                  @onSuccess="(fileList)=>onSuccess(fileList,'picture')"
                  @onRemove="(fileList)=>onRemove(fileList,'picture')"
                  :photos="form.picture"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="上传附件">
                <basic-upload
                  key="file"
                  :model="true"
                  @onSuccess="(fileList)=>onSuccess(fileList,'file')"
                  @onRemove="(fileList)=>onRemove(fileList,'file')"
                  :photos="form.file"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="备注">
                <el-input placeholder="备注" clearable v-model="form.remark" style="width: 98.5%" :size="size"></el-input>
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
import {finiteSpaceCreateAPI, finiteSpaceViewAPI,finiteSpaceUpdateAPI} from '@/api/enterprise/finite-space'

export default {
  name: "editDialog",
  data() {
    return {
      icon: 'icon-bianji',
      title: '有限空间信息',
      openEdit: false,
      width: "260px",
      size: "small",
      form: {},
      rules: {
        // 有限空间名称
        restrictSpaceName: [
          {required: true, message: "请输入有限空间", trigger: "blur"},
        ],
        // 易导致事故类型
        accidentType: [
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
        const res = await finiteSpaceCreateAPI(this.form);
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
        const res = await finiteSpaceUpdateAPI({...this.form, id: this.rowData.id});
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
        const res = await finiteSpaceViewAPI({id})
        if (res.code === 200) {
          this.form ={... res.data,accidentType:res.data.accidentType?res.data.accidentType.key:""}
          // 为图片添加名字
          this.form.file=res.data.file.map(item=>{
            return{
              ...item,
              name:item.originalFilename
            }
          })
          console.log(this.form)
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
