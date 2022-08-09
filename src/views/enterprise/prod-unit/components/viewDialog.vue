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
        <el-form label-width="140px" label-position="right" disabled :model="form"  ref="formRef">
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
                  <el-image
                    v-for="item in form.keyProductionUnit.photos"
                    :key="item.url"
                    style="width: 100px; height: 100px"
                    :src="imgUrl+ item.url"
                    :preview-src-list="[imgUrl+item.url]"
                  ></el-image>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
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
import { prodUnitViewAPI} from '@/api/enterprise/prod-unit/index';
import {imgUrl} from "@/router/axios";

export default {
  name: "editDialog",
  data() {
    return {
      imgUrl,
      icon: 'icon-bianji',
      title: '查看应急装备',
      openEdit: false,
      width: "260px",
      size: "small",
      form: {
        keyProductionUnit: {
          photos: [],
        }
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
