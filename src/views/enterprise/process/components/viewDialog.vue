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
        <el-form label-width="160px" label-position="right" :model="form" :rules="rules" ref="formRef">
          <el-row>
            <el-col span="12">
              <el-form-item label="企业编码" prop="enterpriseCode">
                <el-input placeholder="企业编码" clearable v-model="form.enterpriseCode" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="工艺编码" prop="processCode">
                <el-input placeholder="工艺编码" clearable v-model="form.processCode" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="是否重点监管化工工艺" prop="isImportantProcess">
                <el-radio-group v-model="form.isImportantProcess">
                  <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                    {{ item.dictValueName }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="生产工艺名称">
                <el-select placeholder="生产工艺名称" clearable v-model="form.productionProcessName" :style="`width:${width}`"
                           :size="size">
                  <el-option v-for="item in dictConfig.entProductionProcessName" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="反应类型">
                <el-input placeholder="反应类型" clearable v-model="form.reactionType" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="最终产品">
                <el-input placeholder="最终产品" clearable v-model="form.finalProduct" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="最终产品物质形态">
                <el-input placeholder="最终产品物质形态" clearable v-model="form.finalProductForm" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="中间产品">
                <el-input placeholder="中间产品" clearable v-model="form.inProduct" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="中间产品物质形态">
                <el-select placeholder="中间产品物质形态" clearable v-model="form.intermediateProductsForm" :style="`width:${width}`"
                           :size="size">
                  <el-option v-for="item in dictConfig.entIntermediateProductsForm" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="重点监控单元">
                <el-input placeholder="重点监控单元" clearable v-model="form.keyMonitorUnit" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="工艺危险特点">
                <el-input placeholder="工艺危险特点" clearable v-model="form.processRisk" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="重点监控工艺参数">
                <el-input placeholder="重点监控工艺参数" clearable v-model="form.monitorProcessPara" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="控制方式">
                <el-input placeholder="控制方式" clearable v-model="form.controlMode" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="自动控制措施">
                <el-input placeholder="自动控制措施" clearable v-model="form.autoControlMeasures" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="岗位操作人数">
                <el-input-number placeholder="岗位操作人数" clearable v-model="form.postOperatorNum" :style="`width:${width}` "
                                 :size="size"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="持证人数">
                <el-input-number placeholder="持证人数" clearable v-model="form.holderNum" :style="`width:${width}` "
                                 :size="size"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="技术来源" prop="techSource">
                <el-select placeholder="技术来源" clearable v-model="form.techSource" :style="`width:${width}`"
                           :size="size">
                  <el-option v-for="item in dictConfig.entTechSource" :key="item.id" :value="item.dictValue"
                             :label="item.dictValueName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="设计单位资质等级">
                <el-input placeholder="设计单位资质等级" v-model="form.locate" :style="`width:${width}` " :size="size"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="是否满足国家规定的要求">
                <el-radio-group v-model="form.isStipulated">
                  <el-radio :label="item.dictValue" v-for="item in dictConfig.commonJudge" :key="item.id">
                    {{ item.dictValueName }}
                  </el-radio>
                </el-radio-group>
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
import {imgUrl} from "@/router/axios";
import showFile from "@/components/show-file/index";
import {processViewAPI} from "@/api/enterprise/process";
export default {
  components:{
    showFile
  },
  data() {
    return {
      imgUrl,
      icon: 'icon-bianji',
      title: '生产工艺信息',
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
    // 获取详情
    async getDetail(id) {
      try {
        const res = await processViewAPI({id})
        if (res.code === 200) {
          this.form = {
            ...res.data,
            isImportantProcess: res.data.isImportantProcess?res.data.isImportantProcess.key:"",
            intermediateProductsForm: res.data.intermediateProductsForm?res.data.intermediateProductsForm.key:"",
            techSource: res.data.techSource?res.data.techSource.key:"",
            isStipulated: res.data.isStipulated?res.data.isStipulated.key:"",
            productionProcessName: res.data.productionProcessName?res.data.productionProcessName.key:"",
          }
          // 为图片添加名字
          this.form.file = res.data.file.map(item => {
            return {
              ...item,
              name: item.originalFilename
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
.view-dialog {
  /deep/ .el-input__inner {
    color: #606266
  }
  /deep/ .el-textarea__inner{
    color: #606266
  }
}
</style>
