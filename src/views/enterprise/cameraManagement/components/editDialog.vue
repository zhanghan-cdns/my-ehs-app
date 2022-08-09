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
              <el-form-item label="摄像头名称" prop="camName">
                <el-input placeholder="摄像头名称" clearable v-model="form.camName" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="摄像头类型">
                <el-input placeholder="摄像头类型" clearable v-model="form.camType" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="摄像头编码" prop="camCode">
                <el-input placeholder="摄像头编码" clearable v-model="form.camCode" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="设备编码" prop="equipCode">
                <el-input placeholder="设备编码" clearable v-model="form.equipCode" :style="`width:${width}` "
                                 :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="所属部门" prop="affiliateFunction">
                <el-select placeholder="所属部门" clearable v-model="form.affiliateFunction" :style="`width:${width}`"
                           :size="size">
                  <el-option label="测试部门" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="是否为重大危险源" prop="isHazardSourceArea">
                <el-radio-group v-model="form.isHazardSourceArea">
                  <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                    {{ item.dictValueName }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="重大危险源名称" prop="majorHazardSource">
                <el-select placeholder="重大危险源名称" clearable v-model="form.majorHazardSource" :style="`width:${width}`"
                           :size="size">
                  <el-option v-for="item in dictConfig.hazardBaseList" :key="item.id" :value="item.id"
                             :label="item.hazardName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="RTSP视频流" prop="videoStream">
                <el-input placeholder="RTSP视频流" clearable v-model="form.videoStream"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="接口请求地址" prop="reqAddress">
                <el-input placeholder="接口请求地址" clearable v-model="form.reqAddress"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="视频播放地址" prop="videoAddress">
                <el-input placeholder="视频播放地址" clearable v-model="form.videoAddress"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="绑定区域" prop="bindArea">
                <el-select
                  @change="handleBindAreaChange"
                  placeholder="绑定区域"
                  clearable
                  v-model="form.bindArea"
                  :style="`width:${width}`"
                  :size="size">
<!--                  <el-option v-for="item in dictConfig.buildingAreaList" :key="item.id" :value="item.id"-->
<!--                             :label="item.hazardName"></el-option>-->
                  <el-option label="测试绑定区域" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="设备IP">
                <el-input placeholder="设备IP" clearable v-model="form.equipIp"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="视频流url" prop="videoStreamUrl">
                <el-input placeholder="视频流url" clearable v-model="form.videoStreamUrl"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="外观类型">
                <el-input placeholder="外观类型" clearable v-model="form.appearanceType"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="布控区域">
                <el-input placeholder="布控区域" clearable v-model="form.contorlArea"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="安装位置">
                <el-input placeholder="安装位置" clearable v-model="form.installPosition"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="经度">
                <el-input placeholder="经度" clearable v-model="form.longitude"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="纬度">
                <el-input placeholder="纬度" clearable v-model="form.latitude"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="通道号">
                <el-input placeholder="通道号" clearable v-model="form.channelNum"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="端口号">
                <el-input placeholder="端口号" clearable v-model="form.portNum"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="摄像头顺序号">
                <el-input placeholder="摄像头顺序号" clearable v-model="form.cameraSequenceNum"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="登录用户">
                <el-input placeholder="登录用户" clearable v-model="form.loginUser"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="登录密码">
                <el-input placeholder="登录密码" clearable v-model="form.loginPassword"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="客户端接入服务器ID">
                <el-input placeholder="客户端接入服务器ID" clearable v-model="form.clientAccessServerId"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="企业负责人">
                <el-select @change="handleEntPersonChange" placeholder="企业负责人" clearable v-model="form.chargeMan" :style="`width:${width}`"
                           :size="size">
                  <el-option v-for="item in dictConfig.entPersonnelList" :key="item.entpersonid" :value="item.entpersonid"
                             :label="item.entpersonname"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="负责人联系电话">
                <el-input placeholder="负责人联系电话" clearable v-model="form.entPersonTel"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="生产厂家">
                <el-input placeholder="生产厂家" clearable v-model="form.manufacturer"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="主要技术参数">
                <el-input placeholder="主要技术参数" clearable v-model="form.mainTechPara"
                          style="width: 98.5%" :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="上传附件">
                <basic-upload
                  key="file"
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
import {cameraManagementCreateAPI, cameraManagementViewAPI,cameraManagementUpdateAPI} from '@/api/enterprise/cameraManagement'

export default {
  name: "editDialog",
  data() {
    return {
      icon: 'icon-bianji',
      title: '摄像头',
      openEdit: false,
      width: "260px",
      size: "small",
      form: {},
      rules: {
        // 摄像头名称
        camName: [
          {required: true, message: "请输入摄像头名称", trigger: "blur"},
        ],
        equipCode:[
          {required: true, message: "请输入设备编码", trigger: "blur"},
        ],
        camCode:[
          {required: true, message: "请输入摄像头编码", trigger: "blur"},
        ],
        isHazardSourceArea:[
          {required: true, message: "请输入是否为重大危险源区", trigger: "change"},
        ],
        majorHazardSource:[
          {required: true, message: "请输入重大危险源名称", trigger: "change"},
        ],
        videoStream:[
          {required: true, message: "请输入RTSP视频流", trigger: "blur"},
        ],
        reqAddress:[
          {required: true, message: "请输入接口请求地址", trigger: "blur"},
        ],
        videoAddress:[
          {required: true, message: "请输入视频播放地址", trigger: "blur"},
        ],
        bindArea:[
          {required: true, message: "请输入绑定区域", trigger: "change"},
        ],
        videoStreamUrl:[
          {required: true, message: "请输入视频流url", trigger: "blur"},
        ],
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
    handleEntPersonChange(val) {
      this.form.entPersonTel = this.dictConfig.entPersonnelList.find(item => item.entpersonid === val).entpersontel
    },
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
      if(this.form.chargeMan){
        this.form.chargeMan=this.dictConfig.entPersonnelList.find(item=>item.entpersonid===this.form.chargeMan)
      }
      if(this.form.majorHazardSource){
        this.form.majorHazardSource=this.dictConfig.hazardBaseList.find(item=>item.id===this.form.majorHazardSource)
      }
      if(this.form.bindArea){
        let bindArea = [{id:"1",name:"测试绑定区域"}]
        this.form.bindArea=bindArea.find(item=>item.id===this.form.bindArea)
      }
      try {
        const res = await cameraManagementCreateAPI(this.form);
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
        const res = await cameraManagementUpdateAPI({...this.form, id: this.rowData.id});
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
        const res = await cameraManagementViewAPI({id})
        if (res.code === 200) {
          this.form ={... res.data,
            isHazardSourceArea:res.data.isHazardSourceArea?res.data.isHazardSourceArea.key:""}
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
