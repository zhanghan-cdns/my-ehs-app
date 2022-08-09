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
                      <el-radio :label="1">有</el-radio>
                      <el-radio :label="0">无</el-radio>
                    </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="围堰所谓面积">
                <el-input placeholder="围堰所谓面积" v-model="form.cofMeasure" :style="`width:${width}` " :size="size"></el-input>
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
                           :size="size">
                  <el-option v-for="item in certificateTypeData" :key="item.dictKeyId" :label="item.dictValueName" :value="item.dictValue"></el-option>

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
                      <el-radio :label="1">有</el-radio>
                      <el-radio :label="0">无</el-radio>
                    </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="装卸方式">
                <el-select placeholder="装卸方式" clearable v-model="form.loadingMode" :style="`width:${width}`"
                           :size="size">
                 <el-option v-for="item in licenseIssuingAgencyData" :key="item.dictKeyId" :label="item.dictValueName" :value="item.dictValue"></el-option>

                </el-select>
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
                 <el-option v-for="item in licenseIssuingData" :key="item.dictKeyId" :label="item.dictValueName" :value="item.dictValue"></el-option>

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
            
          <!-- <el-row>
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
          </el-row> -->
          <el-row>
            <el-col>
              <el-form-item label="图片">
                <el-image
                  v-for="item in form.scenePhotos"
                  :key="item.url"
                  style="width: 100px; height: 100px"
                  :src="imgUrl+ item.url"
                  :preview-src-list="[imgUrl+item.url]"
                 ></el-image>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col>
              <el-form-item label="上传附件">
                <file-download :data="form.file"></file-download>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="备注">
                <el-input placeholder="备注" clearable v-model="form.remark" style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
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
import {tankFarmViewAPI} from "@/api/enterprise/tankFarm/index";
import {imgUrl} from "@/router/axios";
import fileDownload from "./file";
export default {
  components:{
    fileDownload
  },
  data() {
    return {
      imgUrl,
      icon: 'icon-bianji',
      title: '222',
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
        const res = await tankFarmViewAPI({id})
        if (res.code === 200) {
           this.form = {...res.data,loadingMode:res.data.loadingMode.value,majHazUnit:res.data.majHazUnit.value}
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
