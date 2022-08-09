<template>
  <div class="view-dialog">
    <basic-dialog
      :icon="icon"
      :title="title"
      width="850px"
      height="55%"
      v-bind="$attrs"
      @close="close"
      :openFlag="openEdit"
    >
      <template #content>
        <el-form label-width="140px" label-position="right" :model="form" :rules="rules" ref="formRef" :disabled="true">
          <el-row>
            <el-col span="12">
              <el-form-item label="风险四色图名称" prop="mapName">
                <el-input placeholder="风险四色图名称" clearable v-model="form.mapName" :style="`width:${width}` "
                          :size="size"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="风险级别" prop="riskLevel">
                <el-select v-model="form.riskLevel" :size="size" :style="`width:${width}`" clearable
                           placeholder="请选择风险级别">
                  <el-option v-for="item in dictConfig.doublePreventionRiskLevel" :key="item.id" :label="item.dictValueName"
                             :value="item.dictValue"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="图片">
                <el-image
                  v-for="item in form.mapUrl"
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
              <el-form-item label="备注">
                <el-input type="textarea" :rows="4" placeholder="备注" clearable v-model="form.remark" style="width: 98.5%" :size="size"></el-input>
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
import {mapInfoViewAPI} from "@/api/doubleprevention/riskmap";
export default {
  components:{
    showFile
  },
  data() {
    return {
      imgUrl,
      icon: 'icon-bianji',
      title: '风险四色图信息',
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
        const res = await mapInfoViewAPI({id})
        if (res.code === 200) {
          this.form = {...res.data, riskLevel: res.data.riskLevel ? res.data.riskLevel.key : ""}
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
