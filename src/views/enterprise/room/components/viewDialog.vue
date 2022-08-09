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
        <el-form label-width="140px" disabled label-position="right" :model="form" :rules="rules" ref="formRef">
          <el-row>
            <el-col span="12">
              <el-form-item label="库房编码" prop="code">
                <el-input placeholder="库房编码" clearable v-model="form.code" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="库房名称" prop="warHouName">
                <el-input placeholder="库房名称" clearable v-model="form.warHouName" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="库区编号">
                <el-input placeholder="库区编号" clearable v-model="form.resAreaNumber" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="库区名称">
                <el-input placeholder="库区名称" clearable v-model="form.resAreaName" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col span="12">
              <el-form-item label="库房序号">
                <el-input placeholder="库房序号" clearable v-model="form.serNumber" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>

            <el-col span="12">
              <el-form-item label="所在位置" prop="hazardousProcessId">
                <el-input placeholder="所在位置" clearable v-model="form.location" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col span="12">
              <el-form-item label="贮存面积">
                <el-input placeholder="贮存面积" v-model="form.storageArea" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="有无防火墙">
                <el-radio-group v-model="form.firewall">
                  <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                    {{ item.dictValueName }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="库房形式" prop="surEnvironment">
                <el-input placeholder="库房形式" clearable v-model="form.warehouseForm" style="width:100%;"
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="火灾危险性分类">
                <el-select placeholder="火灾危险性分类" clearable v-model="form.fireRiskCla" :style="`width:${width}` "
                           size="small">
                  <el-option v-for="item in dictConfig.entFireRiskCla" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="设计储量">
                <el-input-number placeholder="设计储量" clearable v-model="form.designReserves" :style="`width:${width}`"
                                 :size="size"></el-input-number>
              </el-form-item>

            </el-col>
            <el-col span="12">
              <el-form-item label="贮存物质名称" prop="stoSto">
                <el-select
                  @change="putMajhazList"
                  multiple
                  placeholder="贮存物质名称"
                  clearable
                  :size="size"
                  v-model="form.stoSto"
                  style="width:100%;">
                  <el-option
                    v-for="item in dictConfig.materialNames"
                    :key="item.id"
                    :label="item.materialName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="是否剧毒化学品仓库" prop="autControlMode">
                <el-radio-group v-model="form.highlyToxic">
                  <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                    {{ item.dictValueName }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="投产日期">
                <el-date-picker
                  v-model="form.comDate"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%"
                  :size="size"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="所属重大危险源单元名称" prop="autControlMode">
                <el-select
                  @change="hazardChange"
                  placeholder="所属重大危险源单元名称"
                  clearable
                  :size="size"
                  v-model="form.majHazUniId"
                  style="width:100%;">
                  <el-option
                    v-for="item in dictConfig.hazardbaseList"
                    :key="item.id"
                    :label="item.hazardName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="所属重大危险源单元编号">
                <el-input placeholder="所属重大危险源单元编号" clearable v-model="form.majHazUniCode" style="width:100%;"
                          :size="size"></el-input>
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
              <el-form-item label="纬度（度）">
                <el-input placeholder="纬度（度）" clearable v-model="form.latitude" :style="`width:${width}` "
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
          <dom-size-listen style="flex:1" v-model="sizeCon">
            <render-table
              :height="sizeCon.height"
              :data="tableData"
              :columns="columns"
            />
          </dom-size-listen>
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
import {roomViewAPI} from '@/api/enterprise/room/index';
import tableMixins from '@/mixins/table';
import {imgUrl} from "@/router/axios";

export default {
  mixins: [
    tableMixins,
  ],
  name: "editDialog",
  data() {
    return {
      imgUrl,
      icon: 'icon-bianji',
      title: '仓库',
      openEdit: false,
      width: "260px",
      size: "small",
      form: {
        keyProductionUnit: {
          photos: [],
        }
      },
      rules: {
        // 库房编码
        code: [
          {required: true, message: "请输入有限空间", trigger: "blur"},
        ],
        // 库房名称
        warHouName: [
          {required: true, message: "请选择易导致事故类型", trigger: "change"},
        ]
      },
      rowData: {},
      columns: [
        {
          type: "seq",
          title: "序号",
          width: 50,
          fixed: "left",
          align: "center"
        },

        {
          field: "materialForm.value",
          title: "物品状态",
          align: "center"
        },
        {
          field: "category.value",
          title: "物质危险类别",
          align: "center"
        },
        {
          field: "catalogueNo",
          title: "危险货物编号",
          align: "center"
        },
        {
          field: "casNumber",
          title: "CAS号",
          align: "center"
        },
      ]
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
  created() {
  },
  methods: {
    hazardChange(val) {
      this.dictConfig.hazardbaseList.forEach(item => {
        if (item.id === val) {
          this.form.majHazUniCode = item.hazardCode;
        }
      })
    },
    // 获取危险货物列表
    putMajhazList(val) {
      let tempData = []
      val.forEach(item => {
        this.dictConfig.materialNames.forEach(materialItem => {
          if (item === materialItem.id) {
            tempData.push(materialItem)
          }
        })
      });
      this.tableData = tempData
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
      this.tableData = []
    },
    // 获取详情
    async getDetail(id) {
      try {
        const res = await roomViewAPI({id})
        if (res.code === 200) {
          this.form = {
            ...res.data,
            firewall: res.data.firewall ? res.data.firewall.key : "",
            fireRiskCla: res.data.fireRiskCla ? res.data.fireRiskCla.key : "",
            highlyToxic: res.data.highlyToxic ? res.data.highlyToxic.key : "",
          }
          if (Array.isArray(res.data.stoSto) && res.data.stoSto.length > 0) {
            this.form.stoSto = res.data.stoSto.map(item => item.id)
            this.putMajhazList(this.form.stoSto)
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
/deep/ .el-form-item {
  margin-bottom: 8px !important;
}

/deep/ .el-form-item__error {
  line-height: 2px;
}


</style>
