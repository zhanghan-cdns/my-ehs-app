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
              <el-form-item label="装置位号" prop="tagNumber">
                <el-input placeholder="装置位号" clearable v-model="form.tagNumber" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="装置名称" prop="name">
                <el-input placeholder="装置名称" clearable v-model="form.name" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="装置型号">
                <el-input placeholder="装置型号" clearable v-model="form.model" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="是否关键装置">
                <el-radio-group v-model="form.keyDevices">
                  <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                    {{ item.dictValueName }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="装置位置">
            <el-input placeholder="装置位置" clearable v-model="form.position" style="width:100%;"
                      :size="size"></el-input>
          </el-form-item>
          <el-row>
            <el-col span="12">
              <el-form-item label="所属危险工艺" prop="hazardousProcessId">
                <el-input placeholder="所属危险工艺" clearable v-model="form.hazardousProcessId" style="width:100%;"
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="涉及主要危化品">
                <el-input placeholder="涉及主要危化品" v-model="form.involvedMajChe" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="装置周围环境" prop="surEnvironment">
                <el-input placeholder="装置周围环境" clearable v-model="form.surEnvironment" style="width:100%;"
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="装置功能">
                <el-input placeholder="装置功能" v-model="form.func" :style="`width:${width}` " :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="所属重大危险源单元名称" prop="majHazUnitName">
                <el-input placeholder="所属重大危险源单元名称" clearable v-model="form.majHazUnitName" style="width:100%;"
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="所属重大危险源单元编号">
                <el-input placeholder="所属重大危险源单元编号" v-model="form.majHazUnitCode" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="自动化控制方式" prop="autControlMode">
                <el-input placeholder="自动化控制方式" clearable v-model="form.autControlMode" style="width:100%;"
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="投用日期">
                <el-date-picker
                  v-model="form.comDate"
                  type="date"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="现场图片">
                <basic-upload
                  key="picture"
                  @onSuccess="(fileList)=>onSuccess(fileList,'scenePhotos')"
                  @onRemove="(fileList)=>onRemove(fileList,'scenePhotos')"
                  :photos="form.scenePhotos"
                ></basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="经度（度）">
                <el-input placeholder="经度（度）" clearable v-model="form.longitude" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="纬度（分）">
                <el-input placeholder="纬度（分）" clearable v-model="form.latitude" :style="`width:${width}` "
                          :size="size"></el-input>
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
          <div v-show="form.keyDevices==='COMMON_JUDGE:TRUE'">
            <div class="fujian">
              <div class="fujianOne"></div>
              <div class="fujianTwo">关键装置信息</div>
            </div>
            <el-row>
              <el-col span="12">
                <el-form-item label="装置/部位名称">
                  <el-input placeholder="装置/部位名称" clearable v-model="form.keyProductionUnit.deviceName"
                            :style="`width:${width}` "
                            :size="size"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="所属部门">
                  <el-select placeholder="所属部门" clearable v-model="form.keyProductionUnit.deviceDepartmentId"
                             :style="`width:${width}`"
                             :size="size">
                    <el-option label="测试部门" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="具体位置">
              <el-input placeholder="具体位置" clearable v-model="form.keyProductionUnit.deviceLoc" style="width:100%;"
                        :size="size"></el-input>
            </el-form-item>
            <el-row>
              <el-col span="12">
                <el-form-item label="负责人">
                  <el-select placeholder="负责人" clearable v-model="form.keyProductionUnit.deviceLeadId"
                             :style="`width:${width}`"
                             :size="size">
                    <el-option label="测试部门" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="责任人">
                  <el-select placeholder="责任人" clearable v-model="form.keyProductionUnit.deviceLiablePersonId"
                             :style="`width:${width}`"
                             :size="size">
                    <el-option label="测试部门" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="装置部位分类">
                  <el-radio-group v-model="form.keyProductionUnit.isDeviceOrPart">
                    <el-radio :label="item.dictValue" v-for="item in dictConfig.entIsDeviceOrPart" :key="item.id">
                      {{ item.dictValueName }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="检查周期">
                  <el-input placeholder="检查周期" clearable v-model="form.keyProductionUnit.deviceCheckCycle"
                            :style="`width:${width}` "
                            :size="size"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="相关应急预案">
                  <el-input placeholder="相关应急预案" clearable v-model="form.keyProductionUnit.crashProgramme"
                            :style="`width:${width}` "
                            :size="size"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="主要危险有害因素">
                  <el-input placeholder="主要危险有害因素" clearable v-model="form.keyProductionUnit.mainRiskElement"
                            :style="`width:${width}` "
                            :size="size"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="易导致风险">
                  <el-input placeholder="易导致风险" clearable v-model="form.keyProductionUnit.easyCauseRisk"
                            :style="`width:${width}` "
                            :size="size"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="应急处置措施">
                  <el-input placeholder="应急处置措施" clearable v-model="form.keyProductionUnit.emergencyMeasure"
                            :style="`width:${width}` "
                            :size="size"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="现场照片">
                  <basic-upload
                    key="picture1"
                    @onSuccess="(fileList)=>form.keyProductionUnit.photos=fileList"
                    @onRemove="(fileList)=>form.keyProductionUnit.photos=fileList"
                    :photos="form.keyProductionUnit.photos"
                  ></basic-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
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
import {prodUnitCreateAPI, prodUnitViewAPI, prodUnitUpdateAPI} from '@/api/enterprise/prod-unit/index';

export default {
  name: "editDialog",
  data() {
    return {
      icon: 'icon-bianji',
      title: '新增生产装置',
      openEdit: false,
      width: "260px",
      size: "small",
      form: {
        keyProductionUnit: {
          photos: [],
        }
      },
      rules: {
        // 装置位号
        tagNumber: [
          {required: true, message: "请输入有限空间", trigger: "blur"},
        ],
        // 装置名称
        name: [
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
      this.form = {
        keyProductionUnit: {
          photos: [],
        }
      }
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
        const res = await prodUnitCreateAPI(this.form);
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
        const res = await prodUnitUpdateAPI({...this.form, id: this.rowData.id});
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
        const res = await prodUnitViewAPI({id})
        if (res.code === 200) {
          this.form = {
            ...res.data,
            keyDevices: res.data.keyDevices ? res.data.keyDevices.key : '',
          }
          this.form.keyProductionUnit.isDeviceOrPart = res.data.keyProductionUnit.isDeviceOrPart ? res.data.keyProductionUnit.isDeviceOrPart.key : ''
          console.log(this.form,'this.form')
          console.log(this.form.keyProductionUnit.photos,'photos')
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

.fujian {
  display: flex;
  border-bottom: 1px solid #4A80FC;
  margin: 8px;
  margin-bottom: 18px;

  .fujianOne {
    width: 2px;
    height: 20px;
    margin-top: 3px;
    background: #4A80FC;
    border-radius: 1px 1px 1px 1px;
    opacity: 1;
  }

  .fujianTwo {
    margin-left: 7px;
    font-size: 16px;
    margin-bottom: 3px;
  }
}

</style>
