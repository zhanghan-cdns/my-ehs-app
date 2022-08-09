<template>
  <div>
    <basic-dialog
      :icon="icon"
      :openFlag="openEdit"
      :title="title"
      height="45%"
      v-bind="$attrs"
      width="850px"
      @close="close"
    >
      <template #content>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="140px">
          <el-row>
            <el-col span="12">
              <el-form-item label="风险四色图名称" prop="mapName">
                <el-input v-model="form.mapName" :size="size" :style="`width:${width}` " clearable
                          placeholder="风险四色图名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="风险级别" prop="riskLevel">
                <el-select v-model="form.riskLevel" :size="size" :style="`width:${width}`" clearable
                           placeholder="请选择风险级别">
                  <el-option v-for="item in dictConfig.doublePreventionRiskLevel" :key="item.id" :label="item.dictValueName"
                             :value="item.dictValue"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="上传风险四色图">
                <basic-upload
                  key="picture"
                  :photos="form.mapUrl"
                  @onRemove="(fileList)=>onRemove(fileList,'mapUrl')"
                  @onSuccess="(fileList)=>onSuccess(fileList,'mapUrl')"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="备注">
                <el-input v-model="form.remark" :row="5" :size="size" clearable placeholder="备注" style="width: 98.5%"
                          type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #bottom>
        <div>
          <el-button type="primary" @click="submitForm"
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
import {mapInfoCreateAPI, mapInfoUpdateAPI, mapInfoViewAPI} from '@/api/doubleprevention/riskmap'

export default {
  name: "editDialog",
  data() {
    return {
      icon: 'icon-bianji',
      title: '风险四色图',
      openEdit: false,
      width: "260px",
      size: "small",
      form: {},
      rules: {
        // 有限空间名称
        mapName: [
          {required: true, message: "请输入风险四色图名称", trigger: "blur"},
        ],
        // 易导致事故类型
        riskLevel: [
          {required: false, message: "请选择风险级别", trigger: "change"},
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
      console.log("保存", this.rowData.id)
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
        const res = await mapInfoCreateAPI(this.form);
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
        const res = await mapInfoUpdateAPI({...this.form, id: this.rowData.id});
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
        const res = await mapInfoViewAPI({id})
        if (res.code === 200) {
          this.form = {...res.data, riskLevel: res.data.riskLevel ? res.data.riskLevel.key : ""}
        }
      } catch (e) {
        this.$message.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}
</style>
