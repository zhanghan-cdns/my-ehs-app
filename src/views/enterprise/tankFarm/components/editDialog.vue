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
              <el-form-item label="储罐区名称" prop="storageName">
                <el-input placeholder="储罐区名称" clearable v-model="form.storageName" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="在厂区的位置">
                <el-input placeholder="在厂区的位置" clearable v-model="form.factoryPosition" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="所处环境功能区">
                <el-input placeholder="所处环境功能区" clearable v-model="form.envFunArea" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="储罐区面积">
                <el-input placeholder="储罐区面积" clearable v-model="form.measure" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="有无围堰">
                <el-radio-group v-model="form.cofferdam">
                  <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                    {{ item.dictValueName }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="围堰所谓面积">
                <el-input placeholder="围堰所谓面积" v-model="form.cofMeasure" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col span="12">
              <el-form-item label="储罐个数">
                <el-input placeholder="储罐个数" clearable v-model="form.tanksNumber" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="储存介质">
                <el-select placeholder="储存介质" clearable v-model="form.storageMaterial" :style="`width:${width}`"
                           :size="size" :disabled="true">
                  <el-option v-for="item in certificateTypeData" :key="item.dictKeyId" :label="item.dictValueName"
                             :value="item.dictValue"></el-option>

                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="储罐区总容积">
                <el-input placeholder="储罐区总容积" clearable v-model="form.totalVolume" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="常规储存量">
                <el-input placeholder="常规储存量" clearable v-model="form.conStorage" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="两罐间最小间距">
                <el-input placeholder="两罐间最小间距" clearable v-model="form.minDistance" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="有无消防通道">
                <el-radio-group v-model="form.fireEngAccess">
                  <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                    {{ item.dictValueName }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="装卸方式">
                <el-input placeholder="两罐间最小间距" clearable v-model="form.loadingMode" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="装卸危化品种类">
                <el-input placeholder="装卸危化品种类" clearable v-model="form.chemicalsType" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="所属危险化学品
              重大危险源单元">
                <el-select placeholder="所属危险化学品,重大危险源单元" clearable v-model="form.majHazUnit" :style="`width:${width}`"
                           :size="size">
                  <el-option v-for="item in licenseIssuingData" :key="item.dictKeyId" :label="item.dictValueName"
                             :value="item.dictValue"></el-option>

                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="备注">
                <el-input placeholder="备注" clearable v-model="form.remark" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="经度">
                <el-input placeholder="经度" clearable v-model="form.longitude" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="纬度">
                <el-input placeholder="纬度" clearable v-model="form.latitude" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="location">
            <el-button type="success" size="mini">定位按钮</el-button>
          </el-form-item>

          <el-row>
            <el-col>
              <el-form-item label="现场照片">
                <basic-upload
                  key="picture"
                  @onSuccess="(fileList)=>onSuccess(fileList,'scenePhotos')"
                  @onRemove="(fileList)=>onRemove(fileList,'scenePhotos')"
                  :photos="form.scenePhotos"
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
import {tankFarmCreateAPI, tankFarmUpdateAPI, tankFarmViewAPI} from '@/api/enterprise/tankFarm/index'
import {fastGetDictAPI} from "@/api/system/dictionary";//字典

export default {
  name: "editDialog",
  data() {
    return {
      icon: 'icon-bianji',
      title: '新增储罐区信息',
      openEdit: false,
      width: "260px",
      size: "small",
      form: {
        storageMaterial: []
      },
      rules: {
        // 有限空间名称
        storageName: [
          {required: true, message: "请输入储罐区名称", trigger: "blur"},
        ],
      },
      rowData: {}
    }
  },
  created() {
    this.initLoadDict()
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
      console.log('open', row)
      this.openEdit = true
      this.form = {}
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
        const res = await tankFarmCreateAPI(this.form);
        console.log('res.data储罐区', res.data)
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
        const res = await tankFarmUpdateAPI({...this.form, id: this.rowData.id});
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
        const res = await tankFarmViewAPI({id})
        console.log('储罐区查看', res.data)
        if (res.code === 200) {
          this.form = {...res.data, loadingMode: res.data.loadingMode.key, majHazUnit: res.data.majHazUnit.key}
        }
      } catch (e) {
        this.$message.error(e)
      }
    },
    //初始化加载字典
    initLoadDict() {
      fastGetDictAPI("ENT_TANK_STORAGE_MATERIAL").then((res) => {//项目性质
        this.certificateTypeData = res.data
      });
      fastGetDictAPI("ENT_TANK_LOADING_MODE").then((res) => {//三同时类别
        this.licenseIssuingAgencyData = res.data
      });
      fastGetDictAPI("ENT_TANK_CHEMICALS_TYPE").then((res) => {//附件类别
        this.licenseIssuingData = res.data
      });
    },
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
