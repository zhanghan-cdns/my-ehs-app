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
              <el-form-item label="车间名称" prop="workshopName">
                <el-input placeholder="车间名称" clearable v-model="form.workshopName" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="所属部门">
                <el-select placeholder="所属部门" clearable v-model="form.affiliatedFunction" :style="`width:${width}`"
                           :size="size">
                  <el-option label="测试部门" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="占地面积（㎡）">
                <el-input-number placeholder="占地面积（㎡）" clearable v-model="form.coverArea" :style="`width:${width}` "
                          :size="size">
                </el-input-number>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="建筑面积（㎡）">
                <el-input-number placeholder="建筑面积（㎡）" clearable v-model="form.buildingArea" :style="`width:${width}` "
                                 :size="size"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="层数">
                <el-input-number placeholder="层数" clearable  v-model="form.pliesNum" :style="`width:${width}` "
                                 :size="size"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="建筑结构">
                <el-select placeholder="建筑结构" clearable v-model="form.buildingStructure" :style="`width:${width}`"
                           :size="size">
                  <el-option v-for="item in dictConfig.entBuildingStructure" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="火灾危险等级">
                <el-select placeholder="火灾危险等级" clearable v-model="form.fireHazardLevel" :style="`width:${width}`"
                           :size="size">
                  <el-option v-for="item in dictConfig.entFireHazardLevel" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="耐火等级">
                <el-select placeholder="耐火等级" clearable v-model="form.fireResistanceRating" :style="`width:${width}`"
                           :size="size">
                  <el-option v-for="item in dictConfig.entFireResistanceRating" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="企业位置（经度）">
                <el-input placeholder="企业位置（经度）" clearable v-model="form.facilitiesSatety"
                          :style="`width:${width}`" :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="企业位置（纬度）">
                <el-input placeholder="企业位置（纬度）" clearable v-model="form.facilitiesSatety"
                          :style="`width:${width}`" :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="图片">
                <basic-upload
                  key="scenePhoto"
                  @onSuccess="(fileList)=>onSuccess(fileList,'scenePhoto')"
                  @onRemove="(fileList)=>onRemove(fileList,'scenePhoto')"
                  :photos="form.scenePhoto"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="上传附件">
                <basic-upload
                  key="attachment"
                  :model="true"
                  @onSuccess="(fileList)=>onSuccess(fileList,'attachment')"
                  @onRemove="(fileList)=>onRemove(fileList,'attachment')"
                  :photos="form.attachment"
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
import {workshopCreateAPI, workshopViewAPI,workshopUpdateAPI} from '@/api/enterprise/workshop/index.js'

export default {
  name: "editDialog",
  data() {
    return {
      icon: 'icon-bianji',
      title: '新增车间信息',
      openEdit: false,
      width: "260px",
      size: "small",
      form: {},
      rules: {
        // 车间名称
        workshopName: [
          {required: true, message: "请输入车间", trigger: "blur"},
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
        const res = await workshopCreateAPI(this.form);
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
        const res = await workshopUpdateAPI({...this.form, id: this.rowData.id});
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
        const res = await workshopViewAPI({id})
        if (res.code === 200) {
          this.form ={... res.data}
          // 为图片添加名字
          this.form.file=res.data.file.map(item=>{
            return{
              ...item,
              name:item.originalFilename
            }
          })
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
