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
        <el-form label-width="140px" label-position="right" :model="form" :rules="rules" ref="formRef" :disabled="true">
          <el-row>
            <el-col span="12">
              <el-form-item label="物料名称" prop="materialName">
                <el-input placeholder="物料名称" clearable v-model="form.materialName" :style="`width:${width}` "
                          :size="size" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="物料类型">
                <el-select placeholder="物料类型" clearable v-model="form.materialType" :style="`width:${width}`"
                           :size="size">
                  <el-option v-for="item in dictConfig.entMaterialType" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="统一编码">
                <el-input placeholder="统一编码" clearable v-model="form.unifiedCoding" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="CAS号">
                <el-input placeholder="CAS号" clearable v-model="form.casNumber" style="width:100%;"
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="是否为危化品">
                <el-radio-group v-model="form.danChemicals">
                  <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                    {{ item.dictValueName }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="危险化学品目录序号">
                <el-input placeholder="危险化学品目录序号" clearable v-model="form.catalogueNo" style="width:100%;"
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="危化品类别" prop="category">
                <el-select placeholder="危化品类别" clearable v-model="form.category" :style="`width:${width}`"
                           :size="size">
                  <el-option v-for="item in dictConfig.entCategory" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="物质形态">
                <el-select placeholder="物质形态" clearable v-model="form.materialForm" :style="`width:${width}`"
                           :size="size">
                  <el-option v-for="item in dictConfig.entMaterialForm" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="年消耗量（吨）" prop="annualConsumption">
                <el-input placeholder="年消耗量（吨）" clearable v-model="form.annualConsumption" style="width:100%;"
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="最大储量（吨）">
                <el-input placeholder="最大储量（吨）" v-model.number="form.maxStorageCapacity" :style="`width:${width}` " :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="实际储量（吨）" prop="actualReserves">
                <el-input placeholder="实际储量（吨）" clearable v-model.number="form.actualReserves" style="width:100%;"
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="单位">
                <el-select placeholder="单位" clearable v-model="form.measureUnit" :style="`width:${width}`"
                           :size="size">
                  <el-option v-for="item in dictConfig.commonUnit" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="储存位置" prop="storageLocation">
                <el-input placeholder="储存位置" clearable v-model="form.storageLocation" style="width:100%;"
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="储存方式">
                <el-select placeholder="储存方式" clearable v-model="form.storageMode" :style="`width:${width}`"
                           :size="size">
                  <el-option v-for="item in dictConfig.entStorageMode" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="所属工艺流程" prop="processId">
                <el-select placeholder="所属工艺流程" clearable v-model="form.processId" :style="`width:${width}`"
                           :size="size">
                  <el-option v-for="item in dictConfig.processInfo" :key="item.id" :value="item.id"
                             :label="item.productionProcessName.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
                <el-form-item label="是否为剧毒化学品">
                  <el-radio-group v-model="form.highlyToxic">
                    <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                      {{ item.dictValueName }}
                    </el-radio>
                  </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="是否重点监管危险化学品">
                <el-radio-group v-model="form.focus">
                  <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                    {{ item.dictValueName }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col span="12">
                <el-form-item label="是否特别管控危险化学品">
                  <el-radio-group v-model="form.specialControl">
                    <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                      {{ item.dictValueName }}
                    </el-radio>

                  </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="是否易制毒">
                <el-radio-group v-model="form.easyMakeDrugs">
                  <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                    {{ item.dictValueName }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col span="12">
                <el-form-item label="是否易制爆">
                  <el-radio-group v-model="form.easyExplode">
                    <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                      {{ item.dictValueName }}
                    </el-radio>
                  </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="安全措施">
                <el-input placeholder="安全措施" clearable v-model="form.safetyMeasures" type="textarea" :rows="4"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="应急处理措施">
                <el-input placeholder="应急处理措施" clearable v-model="form.emergencyMeasures" type="textarea" :rows="4"
                          style="width: 98.5%" :size="size"></el-input>
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
import {materialsViewAPI} from '@/api/enterprise/materials/index';

export default {
  name: "editDialog",
  data() {
    return {
      icon: 'icon-bianji',
      title: '新增物料信息',
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
    // 获取详情
    async getDetail(id) {
      try {
        const res = await materialsViewAPI({id})
        if (res.code === 200) {
          this.form = {...res.data,
            ...res.data,
            materialType: res.data.materialType?res.data.materialType.key:"",
            danChemicals:res.data.danChemicals? res.data.danChemicals.key:"",
            category: res.data.category?res.data.category.key:"",
            materialForm: res.data.materialForm?res.data.materialForm.key:"",
            measureUnit: res.data.measureUnit?res.data.measureUnit.key:"",
            storageMode:res.data.storageMode? res.data.storageMode.key:"",
            highlyToxic:res.data.highlyToxic? res.data.highlyToxic.key:"",
            focus:res.data.focus? res.data.focus.key:"",
            specialControl:res.data.specialControl? res.data.specialControl.key:"",
            easyMakeDrugs:res.data.easyMakeDrugs? res.data.easyMakeDrugs.key:"",
            easyExplode: res.data.easyExplode?res.data.easyExplode.key:"",
          }
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

.fujian{
  display: flex;
  border-bottom: 1px solid #4A80FC;
      margin: 8px;
    margin-bottom: 18px;
  .fujianOne{
    width: 2px;
        height: 20px;
    margin-top: 3px;
    background: #4A80FC;
    border-radius: 1px 1px 1px 1px;
    opacity: 1;
  }
  .fujianTwo{
        margin-left: 7px;
    font-size: 16px;
    margin-bottom: 3px;
  }
}

</style>
