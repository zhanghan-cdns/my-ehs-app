<template>
  <div class="view-dialog">
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
        <el-form label-width="140px" label-position="right" :model="form" :rules="rules" ref="formRef" :disabled="true">
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
                <el-image
                  v-for="item in form.picture"
                  :key="item.url"
                  style="width: 100px; height: 100px"
                  :src="imgUrl+ item.url"
                  :preview-src-list="[imgUrl+item.url]"
                 ></el-image>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="上传附件">
                <show-file :data="form.file"></show-file>
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
          <el-button type="warning" @click="close">取消</el-button>
        </div>
      </template>
    </basic-dialog>
  </div>
</template>

<script>
import {finiteSpaceViewAPI} from "@/api/enterprise/finite-space";
import {imgUrl} from "@/router/axios";
import showFile from "@/components/show-file/index";
export default {
  components:{
    showFile
  },
  data() {
    return {
      imgUrl,
      icon: 'icon-bianji',
      title: '有限空间信息',
      openEdit: false,
      width: "260px",
      size: "small",
      form: {},
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
    // 获取详情
    async getDetail(id) {
      try {
        const res = await finiteSpaceViewAPI({id})
        if (res.code === 200) {
          this.form ={... res.data,accidentType:res.data.accidentType.value}
        }
      } catch (e) {
        this.$message.error(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.view-dialog {
  /deep/ .el-input__inner {
    color: #606266
  }
  /deep/ .el-textarea__inner{
    color: #606266
  }
}
</style>
