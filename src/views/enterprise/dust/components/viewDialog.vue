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
            <el-col span="24">
              <el-form-item label="涉及粉尘生产工艺">
                <el-select clearable v-model="form.dustProductionTech" style="width: 98.5%" size="small">
                  <el-option v-for="item in dictConfig.entDustProductionTech" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="粉尘种类">
                <el-select clearable v-model="form.dustType" :style="`width:${width}` " size="small">
                  <el-option v-for="item in dictConfig.entDustType" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="日产尘量 ">
                <el-input-number clearable v-model="form.dailyDustProduction" :style="`width:${width}` "
                                 size="small"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="所属行业">
                <el-select clearable v-model="form.industry" :style="`width:${width}` " size="small">
                  <el-option v-for="item in dictConfig.entIndustry" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="涉及职业病危害因素">
                <el-input clearable v-model="form.isOccupationFactor" :style="`width:${width}` " size="small"></el-input>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="所属部门">
                <el-input clearable v-model="form.affiliatedFunctionId" :style="`width:${width}` " size="small"></el-input>

              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="涉粉作业场所名称">
                <el-input clearable v-model="form.workplaceName" :style="`width:${width}` " size="small"></el-input>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="涉粉作业场所人数">
                <el-input :style="`width:${width}` " size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="涉粉单班作业人数">
                <el-input-number clearable v-model="form.workermillNum" :style="`width:${width}` " size="small"></el-input-number>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="除尘器种类">
                <el-radio-group v-model="form.dustRemoverClass" @change="dustCollectorTypeChange">
                  <el-radio :label="item.dictValue" v-for="item in dustCollectors" :key="item.id">
                    {{ item.dictValueName }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="除尘器类型">
                <el-select clearable v-model="form.dustRemoverType" :style="`width:${width}` " size="small">
                  <el-option v-for="item in dustCollectorTypes" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="除尘器数量">
                <el-input-number clearable v-model="form.quantityDustCollector" :style="`width:${width}` "
                                 size="small"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="是否安装监控">
                <el-radio-group v-model="form.isMonitor">
                  <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                    {{ item.dictValueName }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="是否建立粉尘清扫制度">
                <el-radio-group v-model="form.isDustCleanSystem">
                  <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                    {{ item.dictValueName }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="是否涉爆">
                <el-radio-group v-model="form.isExplosion">
                  <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                    {{ item.dictValueName }}
                  </el-radio>
                </el-radio-group>
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
                <el-input style="width: 98.5%" size="small"></el-input>
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
import {dustViewAPI} from "@/api/enterprise/dust";
import showFile from "@/components/show-file/index";
import {returnDictKeyDataAPI} from "@/api/system/dictionary";
import {imgUrl} from "@/router/axios";

export default {
  name: "editDialog",
  components:{
    showFile
  },
  data() {
    return {
      imgUrl,
      icon: 'icon-bianji',
      title: '查看粉尘信息',
      openEdit: false,
      width: "260px",
      form: {},
      rowData:{},
      dustCollectors:[]
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
    // 获取除尘器层级字典
    async getDictKey(key, list) {
      let res = await returnDictKeyDataAPI({dictKey: key})
      if (res.code === 200) {
        this[list] = res.data.sysDictValue
      }
    },
    open(row) {
      this.openEdit = true
      this.getDictKey("ENT_DUST_REMOVER_TYPE", "dustCollectors")
      if (row && row.id) {
        this.rowData = row;
        this.getDetail(row.id)
      }
    },
    close() {
      this.openEdit = false
    },

    // 获取详情
    async getDetail(id) {
      try {
        const res = await dustViewAPI({id})
        if (res.code === 200) {
          // if( res.data.dustRemoverClass&&res.data.dustRemoverClass.key){
          //   this.getDictKey(res.data.dustRemoverClass.key, "dustCollectorTypes")
          // }
          this.form = {
            ...res.data,
            dustProductionTech: res.data.dustProductionTech.value,
            dustRemoverClass: res.data.dustRemoverClass.key,
            dustType: res.data.dustType.value,
            industry: res.data.industry.value,
            isDustCleanSystem: res.data.isDustCleanSystem.key,
            isMonitor: res.data.isMonitor.key,
            dustRemoverType: res.data.dustRemoverType?res.data.dustRemoverType.key:""
          }
        }
      } catch (e) {
        this.$message.error(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
/deep/.el-select .el-input.is-disabled .el-input__inner{
  color: #000;
}
/deep/.el-input.is-disabled .el-input__inner{
  color: #000;
}
/deep/ .el-form-item {
  margin-bottom: 0 !important;
}
</style>
